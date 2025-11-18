"use client";

import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

function ParentProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Analytics />
    </SessionProvider>
  );
}

export default ParentProvider;