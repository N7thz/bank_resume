import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "./toggle-mode"

export const Header = () => {
	return (
		<header className="h-18 flex items-center justify-between py-1.5 px-4 border-b border-primary">
			<Link href="/">
				<Image
					width={32}
					height={32}
					src="/icon.png"
					alt="Spaget Logo"
					className="size-8 rounded-lg"
				/>
			</Link>
			<ModeToggle />
		</header>
	)
}
