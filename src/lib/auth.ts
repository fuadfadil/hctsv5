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
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
}

console.log("[Auth Config] All required environment variables are present")

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
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
  },
  logger: {
    level: "debug",
    disabled: false,
  },
})