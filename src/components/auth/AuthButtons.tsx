"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

  const initial =
    (session.user?.name || session.user?.email || "?").charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback className="text-xs font-medium">
          {initial}
        </AvatarFallback>
      </Avatar>
      {/* <span className="text-sm text-muted-foreground">
        {session.user?.email}
      </span> */}
      <Button size="sm" variant="outline" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}


