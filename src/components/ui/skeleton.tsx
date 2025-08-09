import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent h-10 w-full animate-pulse rounded-md duration-700", className
      )}
      {...props}
    />
  )
}

export { Skeleton }
