"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignIn = () => {
    signIn(undefined, { callbackUrl: pathname || "/templates" });
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  if (status === "loading") {
    return null;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={handleSignUp}>
          Sign up
        </Button>
        <Button size="sm" onClick={handleSignIn}>
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground hidden sm:inline">
        {session.user?.email}
      </span>
      <Button size="sm" variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}


