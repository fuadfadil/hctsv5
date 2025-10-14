import { getSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        console.log("useUserRole: Fetching session and role");
        const session = await getSession();
        console.log("useUserRole: Session:", session?.data?.user?.id);

        if (!session?.data?.user?.id) {
          setLoading(false);
          setError(null);
          return;
        }

        const response = await fetch("/api/user/role");
        if (!response.ok) {
          throw new Error(`Failed to fetch role: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("useUserRole: API response, role:", data.role);
        setRole(data.role || null);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError(error instanceof Error ? error.message : "Unknown error");
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading, error };
}