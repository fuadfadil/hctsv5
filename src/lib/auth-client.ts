import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  fetchOptions: {
    onRequest: (context) => {
      console.log("[AuthClient] Making request:", context.url, "Method:", context.method);
    },
    onResponse: (context) => {
      console.log("[AuthClient] Response received:", context.response?.status);
    },
    onError: (context) => {
      console.error("[AuthClient] Request error:", context.error);
    },
  },
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient