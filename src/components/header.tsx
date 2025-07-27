import { ModeToggle } from "./toggle-mode"
import { NavBar } from "./nav-bar"

export const Header = () => {
	return (
		<header className="bg-card h-18 w-full flex justify-between items-center border-b border-border px-2">
			<NavBar />
			<ModeToggle />
		</header>
	)
}
