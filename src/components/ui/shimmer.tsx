import { cn } from "@/lib/utils"

function shimmer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="shimmer"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { shimmer }
