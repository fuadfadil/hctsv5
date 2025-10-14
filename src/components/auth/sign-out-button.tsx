"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <Button disabled>Loading...</Button>;
  }

  if (!session) {
    return null;
  }

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signOut();
        router.replace("/");
        router.refresh();
      }}
      aria-label="Sign out of your account"
      className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      Sign out
    </Button>
  );
}
