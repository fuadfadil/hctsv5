import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextRequest } from "next/server"

console.log("[Auth API] Initializing auth handlers")
// Note: auth.baseURL is not directly accessible, using environment variable instead
console.log("[Auth API] Base URL from env:", process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL)
console.log("[Auth API] Available providers:", Object.keys(auth.options?.socialProviders || {}))

// Enhanced error handler with detailed logging
const enhancedErrorHandler = (error: any, request?: NextRequest) => {
  console.error("[Auth API] Handler error occurred:", {
    message: error?.message,
    stack: error?.stack,
    name: error?.name,
    code: error?.code,
    status: error?.status,
    url: request?.url,
    method: request?.method,
    headers: Object.fromEntries(request?.headers.entries() || []),
    timestamp: new Date().toISOString()
  })

  // Log specific error types
  if (error?.message?.includes('database')) {
    console.error("[Auth API] Database connection error detected")
  } else if (error?.message?.includes('oauth')) {
    console.error("[Auth API] OAuth configuration error detected")
  } else if (error?.message?.includes('session')) {
    console.error("[Auth API] Session management error detected")
  }

  return {
    status: 500,
    body: {
      error: "Internal server error",
      timestamp: new Date().toISOString(),
      // Only include error details in development
      ...(process.env.NODE_ENV === 'development' && {
        details: error?.message,
        code: error?.code
      })
    }
  }
}

// Wrap the handlers with enhanced error handling
const createHandler = (method: 'GET' | 'POST') => async (request: NextRequest) => {
  try {
    console.log(`[Auth API] ${method} request received:`, {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      timestamp: new Date().toISOString()
    })

    // Clone the request to avoid consuming the body stream
    const clonedRequest = request.clone()

    // Log request body for debugging (only in development)
    if (process.env.NODE_ENV === 'development' && method === 'POST') {
      try {
        const body = await clonedRequest.text()
        console.log(`[Auth API] ${method} request body:`, body)
      } catch (bodyError: any) {
        console.log(`[Auth API] Could not read request body:`, bodyError?.message || 'Unknown error')
      }
    }

    const handler = method === 'GET' ? toNextJsHandler(auth).GET : toNextJsHandler(auth).POST
    const response = await handler(request)

    console.log(`[Auth API] ${method} request completed successfully:`, {
      status: response.status,
      timestamp: new Date().toISOString()
    })

    return response
  } catch (error: any) {
    console.error(`[Auth API] ${method} request failed:`, {
      error: error?.message,
      stack: error?.stack,
      code: error?.code,
      status: error?.status,
      url: request.url,
      method: request.method,
      timestamp: new Date().toISOString()
    })

    // Log specific OAuth errors
    if (error?.message?.includes('redirect_uri_mismatch')) {
      console.error("[Auth API] Redirect URI mismatch detected. Check Google OAuth configuration.")
      console.error("[Auth API] Expected redirect URI:", `${process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`)
    } else if (error?.message?.includes('invalid_client')) {
      console.error("[Auth API] Invalid OAuth client configuration. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.")
    } else if (error?.message?.includes('access_denied')) {
      console.error("[Auth API] User denied access or invalid OAuth flow.")
    }

    // Return enhanced error response
    return new Response(
      JSON.stringify({
        error: "Authentication error",
        message: process.env.NODE_ENV === 'development' ? error?.message : "An error occurred during authentication",
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && {
          code: error?.code,
          details: error?.stack
        })
      }),
      {
        status: error?.status || 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

export const GET = createHandler('GET')
export const POST = createHandler('POST')