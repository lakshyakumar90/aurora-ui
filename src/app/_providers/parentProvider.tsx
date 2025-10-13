import { Analytics } from "@vercel/analytics/react";

function ParentProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
}

export default ParentProvider;