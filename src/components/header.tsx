import { ModeToggle } from "./toggle-mode"
import { Command } from "./command"

export const Header = () => {
	return (
		<header className="bg-card h-18 w-full flex justify-between items-center border-b border-border px-2 py-1">
			<Command />
			<ModeToggle />
		</header>
	)
}
