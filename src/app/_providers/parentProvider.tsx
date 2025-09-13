import { Analytics } from "@vercel/analytics/react";
import { SidebarProvider } from "@/components/layout/sidebar-toggle";

function ParentProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
        <SidebarProvider defaultOpen={true}>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
            {children}
            <Analytics />
          {/* </ThemeProvider> */}
        </SidebarProvider>
    </>
  );
}

export default ParentProvider;