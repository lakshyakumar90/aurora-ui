import { srcUrl } from "@/lib/data";
import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import OpenInV0 from "./open-in-v0";

type ComponentPreviewProps = {
  component: React.ReactElement;
  className?: string;
  filePath: string;
  disable?: boolean;
};

// TODO: hasReTrigger tobe implemented
const FinalPreview = ({ component, className, filePath }: ComponentPreviewProps) => {
  const componentName = filePath.split("/").pop()?.split(".")[0];
  // Prefer folder slug for registry (e.g., /components/button/...) -> button.json
  const getComponentSlug = (filePath: string): string | null => {
    const match = filePath.match(/\/components\/([^\/]+)\//);
    return match ? match[1] : null;
  };
  const componentSlugForRegistry = getComponentSlug(filePath) || componentName;
  const registeryURL = `${srcUrl}/e/${componentSlugForRegistry}.json`;
  
  // Extract component slug from filePath for playground
  const componentSlug = getComponentSlug(filePath);

  return (
    <div
      className={cn(
        "group/preview flex min-h-[350px] w-full items-center justify-center rounded-md py-10",
        className
      )}
    >
      <div className="absolute top-1 right-2 z-[10] md:top-14">
        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3 opacity-100 md:transition-opacity md:group-hover/preview:opacity-100">
          {/* Re trigger */}
          <></>
          {componentSlug && (
            <Link href={`/playground?component=${componentSlug}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">Open in Playground</span>
                <span className="sm:hidden">Playground</span>
              </Button>
            </Link>
          )}
          <OpenInV0 url={registeryURL} disable={!componentSlugForRegistry} />
        </div>
      </div>

      {component}
    </div>
  );
};

export default FinalPreview;