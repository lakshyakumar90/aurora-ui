import { srcUrl } from "@/lib/data";
import { cn } from "@/lib/utils";
import React from "react";
import OpenInV0 from "./open-in-v0";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

type ComponentPreviewProps = {
  component: React.ReactElement;
  className?: string;
  filePath: string;
  disable?: boolean;
};

// TODO: hasReTrigger tobe implemented
const FinalPreview = ({ component, className, filePath, disable }: ComponentPreviewProps) => {
  const componentName = filePath.split("/").pop()?.split(".")[0];
  const registeryURL = `${srcUrl}/e/${componentName}.json`;
  
  // Extract component slug from filePath for playground
  const getComponentSlug = (filePath: string): string | null => {
    // Extract component name from paths like: src/app/(docs)/components/button/button-basic.tsx
    const match = filePath.match(/\/components\/([^\/]+)\//);
    return match ? match[1] : null;
  };
  
  const componentSlug = getComponentSlug(filePath);

  return (
    <div
      className={cn(
        "group flex min-h-[350px] w-full items-center justify-center rounded-md",
        className
      )}
    >
      <div className="absolute top-1 right-2 z-[10] md:top-14">
        <div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          {/* Re trigger */}
          <></>
          {componentSlug && (
            <Link href={`/playground?component=${componentSlug}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Open in Playground
              </Button>
            </Link>
          )}
          <OpenInV0 url={registeryURL} disable={disable} />
        </div>
      </div>

      {component}
    </div>
  );
};

export default FinalPreview;