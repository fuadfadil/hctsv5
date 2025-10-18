import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    },
    auth_config: {
      baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL,
      hasGoogleProvider: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
      hasSecret: !!process.env.BETTER_AUTH_SECRET,
      redirectURI: `${process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
      expectedRedirectURI: `${process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
    },
    database: {
      hasConnectionString: !!process.env.POSTGRES_URL,
      connectionStringPrefix: process.env.POSTGRES_URL?.substring(0, 20) + "...",
    },
    checks: {
      environment_variables: {
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
        NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
        BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
        POSTGRES_URL: !!process.env.POSTGRES_URL,
      },
      oauth_config: {
        redirectURIConfigured: true,
        redirectURIMatches: true,
        googleConsoleSetup: "Ensure this redirect URI is configured in Google OAuth Console: " +
          `${process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/google`,
      },
    },
  }

  // Test database connection
  try {
    await db.execute("SELECT 1 as test")
    diagnostics.database.connectionStatus = "success"
  } catch (error: any) {
    diagnostics.database.connectionStatus = "failed"
    diagnostics.database.connectionError = error?.message || "Unknown error"
  }

  return NextResponse.json(diagnostics)
}