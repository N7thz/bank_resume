import { Ellipsis } from "lucide-react"
import { ModeToggle } from "./toggle-mode"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const Header = () => {
	return (
		<header className="bg-card h-18 w-full flex justify-between items-center border-b border-border px-2 py-1">
			<Avatar>
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>
					<Ellipsis />
				</AvatarFallback>
			</Avatar>
			<ModeToggle />
		</header>
	)
}
