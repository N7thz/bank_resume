import { ModeToggle } from "./toggle-mode"
import { Command } from "./command"

export const Header = () => {
	return (
		<header className="bg-card h-18 w-full flex justify-end items-center border-b border-border px-2">
			<div className="flex gap-2">
				<Command />
				<ModeToggle />
			</div>
		</header>
	)
}
