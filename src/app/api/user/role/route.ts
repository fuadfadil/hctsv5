import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    console.log("[User Role API] Starting role fetch request");

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    console.log("[User Role API] Session check result:", {
      hasSession: !!session,
      userId: session?.user?.id,
      userEmail: session?.user?.email
    });

    if (!session?.user?.id) {
      console.log("[User Role API] No valid session, returning 401");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("[User Role API] Querying database for user role, userId:", session.user.id);
    const user = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.user_id, session.user.id))
      .limit(1);

    console.log("[User Role API] Database query result:", {
      found: user.length > 0,
      role: user[0]?.role
    });

    const role = user[0]?.role || null;
    console.log("[User Role API] Returning role:", role);

    return NextResponse.json({ role });
  } catch (error) {
    console.error("[User Role API] Error fetching user role:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}