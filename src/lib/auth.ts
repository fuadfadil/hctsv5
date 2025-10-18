import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./db"
import { SecurityMonitor } from "./security-monitor"
import { AuditLogger } from "./audit-logger"

// Validate required environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
}

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error(`[Auth Config] Missing required environment variables: ${missingVars.join(', ')}`)
  console.error(`[Auth Config] Please check your .env file and ensure all required variables are set`)
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
}

console.log("[Auth Config] All required environment variables are present")
console.log("[Auth Config] Google Client ID:", process.env.GOOGLE_CLIENT_ID ? "Present" : "Missing")
console.log("[Auth Config] Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET ? "Present" : "Missing")
console.log("[Auth Config] App URL:", process.env.NEXT_PUBLIC_APP_URL)
console.log("[Auth Config] Better Auth Secret:", process.env.BETTER_AUTH_SECRET ? "Present" : "Missing")

// Additional validation for OAuth URLs
const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL!
const expectedRedirectURI = `${baseURL}/api/auth/callback/google`
console.log("[Auth Config] Expected Google OAuth redirect URI:", expectedRedirectURI)
console.log("[Auth Config] Make sure this URI is configured in your Google OAuth app settings")

// Additional OAuth configuration validation
console.log("[Auth Config] OAuth Configuration Details:")
console.log("[Auth Config] - BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL)
console.log("[Auth Config] - NEXT_PUBLIC_APP_URL:", process.env.NEXT_PUBLIC_APP_URL)
console.log("[Auth Config] - Google OAuth URLs:")
console.log("[Auth Config]   - Authorization URL: https://accounts.google.com/o/oauth2/v2/auth")
console.log("[Auth Config]   - Token URL: https://oauth2.googleapis.com/token")
console.log("[Auth Config]   - User Info URL: https://www.googleapis.com/oauth2/v2/userinfo")
console.log("[Auth Config]   - Redirect URI:", expectedRedirectURI)
console.log("[Auth Config] - Environment:", process.env.NODE_ENV)
console.log("[Auth Config] - Secure cookies:", process.env.NODE_ENV === "production")

// Validate redirect URI configuration
if (!expectedRedirectURI.startsWith('http://') && !expectedRedirectURI.startsWith('https://')) {
  console.error("[Auth Config] Invalid redirect URI format:", expectedRedirectURI)
  throw new Error("Redirect URI must be a valid HTTP/HTTPS URL")
}

console.log("[Auth Config] Redirect URI validation passed")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL!,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  session: {
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours
    updateAge: 60 * 60 * 1000, // Update session every hour
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 1000, // Cache for 5 minutes
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${baseURL}/api/auth/callback/google`,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  advanced: {
    cookiePrefix: "hcts",
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    },
    useSecureCookies: process.env.NODE_ENV === "production",
    // Add database connection validation
    generateId: false, // Let database handle ID generation
  },
  logger: {
    level: "debug",
    disabled: false,
  },
})