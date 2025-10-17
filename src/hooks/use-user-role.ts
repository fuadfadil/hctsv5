import { getSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        console.log("[useUserRole] Starting role fetch process");
        const session = await getSession();
        console.log("[useUserRole] Session data:", {
          hasSession: !!session,
          userId: session?.data?.user?.id,
          userEmail: session?.data?.user?.email
        });

        if (!session?.data?.user?.id) {
          console.log("[useUserRole] No valid session found, clearing state");
          setLoading(false);
          setError(null);
          setRole(null);
          return;
        }

        console.log("[useUserRole] Fetching role from API for user:", session.data.user.id);
        const response = await fetch("/api/user/role");
        console.log("[useUserRole] API response status:", response.status);

        if (!response.ok) {
          console.error("[useUserRole] API request failed:", response.status, response.statusText);
          throw new Error(`Failed to fetch role: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("[useUserRole] API response data:", data);
        console.log("[useUserRole] Setting role to:", data.role || null);
        setRole(data.role || null);
        setError(null);
      } catch (error) {
        console.error("[useUserRole] Error in fetchUserRole:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setRole(null);
      } finally {
        console.log("[useUserRole] Role fetch process completed");
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
}