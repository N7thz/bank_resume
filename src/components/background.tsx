import { cn } from "@/lib/utils"
import { AnimatedGridPattern } from "./magicui/animated-grid-pattern"

export const Background = () => {
    return (
        <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-10",
            )}
        />
    )
}
