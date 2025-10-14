"use client";

import { useState } from "react";
import { signIn, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { HealthcareToast } from "@/lib/toast";

export function SignInButton() {
  const { data: session, isPending } = useSession();
  const [isSigningIn, setIsSigningIn] = useState(false);

  if (isPending) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return null;
  }

  const handleSignIn = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    console.log("[SignInButton] Starting Google sign-in process");

    try {
      console.log("[SignInButton] Calling signIn.social with Google provider");
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });

      console.log("[SignInButton] Sign-in result:", result);

      if (result?.error) {
        console.error("[SignInButton] Sign-in returned error:", result.error);
        throw new Error(result.error.message || "Sign-in failed");
      }

      console.log("[SignInButton] Sign-in initiated successfully");
    } catch (error: any) {
      console.error("[SignInButton] Sign-in error:", error);

      // Categorize and handle different error types
      if (error?.message?.includes("network") || error?.code === "NETWORK_ERROR") {
        console.error("[SignInButton] Network error detected");
        HealthcareToast.networkError({
          operation: "Google OAuth sign-in"
        });
      } else if (error?.message?.includes("oauth") || error?.message?.includes("OAuth") ||
                 error?.code === "OAUTH_ERROR" || error?.code === "INVALID_CLIENT") {
        console.error("[SignInButton] OAuth configuration error detected");
        HealthcareToast.error('authentication', {
          title: "Google Sign-In Configuration Error",
          description: "There seems to be an issue with Google OAuth configuration. Please check your Google Console settings and ensure the callback URLs are correctly configured."
        });
      } else if (error?.message?.includes("popup") || error?.message?.includes("blocked")) {
        console.error("[SignInButton] Popup blocked or user cancelled");
        HealthcareToast.error('authentication', {
          title: "Sign-In Cancelled",
          description: "The sign-in popup was blocked or cancelled. Please allow popups and try again."
        });
      } else if (error?.message?.includes("access_denied")) {
        console.error("[SignInButton] User denied access");
        HealthcareToast.error('authentication', {
          title: "Access Denied",
          description: "Google sign-in was denied. Please grant the necessary permissions to continue."
        });
      } else if (error?.message?.includes("redirect_uri_mismatch")) {
        console.error("[SignInButton] Redirect URI mismatch");
        HealthcareToast.error('authentication', {
          title: "Configuration Error",
          description: "The redirect URI doesn't match what's configured in Google Console. Please verify your callback URL settings."
        });
      } else if (error?.message?.includes("invalid_client")) {
        console.error("[SignInButton] Invalid client configuration");
        HealthcareToast.error('authentication', {
          title: "Client Configuration Error",
          description: "Invalid client ID or secret. Please check your Google OAuth credentials."
        });
      } else {
        console.error("[SignInButton] General authentication error");
        HealthcareToast.authError({
          operation: "Google OAuth sign-in"
        });
      }
    } finally {
      setIsSigningIn(false);
      console.log("[SignInButton] Sign-in process completed");
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      disabled={isSigningIn}
      aria-label="Sign in with Google account"
      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {isSigningIn ? "Signing in..." : "Sign in"}
    </Button>
  );
}
