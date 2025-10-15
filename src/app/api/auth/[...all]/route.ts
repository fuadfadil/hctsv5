import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

console.log("[Auth API] Initializing auth handlers")

export const { GET, POST } = toNextJsHandler(auth, {
  errorHandler: (error) => {
    console.error("[Auth API] Handler error:", error)
    return {
      status: 500,
      body: { error: "Internal server error" }
    }
  }
})