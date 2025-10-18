import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  fetchOptions: {
    onRequest: (context) => {
      console.log("[AuthClient] Making request:", context.url, "Method:", context.method);
      console.log("[AuthClient] Request headers:", Object.fromEntries(context.headers.entries()));
      console.log("[AuthClient] Request body:", context.body);
    },
    onResponse: (context) => {
      console.log("[AuthClient] Response received:", context.response?.status);
      console.log("[AuthClient] Response headers:", Object.fromEntries(context.response?.headers.entries() || []));
      if (context.response?.status && context.response.status >= 400) {
        console.error("[AuthClient] Error response body:", context.response.body);
      }
    },
    onError: (context) => {
      console.error("[AuthClient] Request error occurred");
      console.error("[AuthClient] Error message:", context.error?.message);
      console.error("[AuthClient] Error stack:", context.error?.stack);
      console.error("[AuthClient] Error response status:", context.error?.response?.status);
      console.error("[AuthClient] Error response data:", context.error?.response?.data);
      console.error("[AuthClient] Full error context:", context);
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