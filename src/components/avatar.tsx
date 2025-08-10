import {
    AvatarFallback,
    AvatarImage,
    Avatar as AvatarRoot
} from "@/components/ui/avatar"
import { Ellipsis } from "lucide-react"
import { ComponentProps } from "react"

type AvatarProps = ComponentProps<typeof AvatarRoot> & {
    src?: string
}

export const Avatar = ({
    src = "/image.png",
    ...props
}: AvatarProps) => {
    return (
        <AvatarRoot {...props}>
            <AvatarImage src={src} />
            <AvatarFallback>
                <Ellipsis />
            </AvatarFallback>
        </AvatarRoot>
    )
}
