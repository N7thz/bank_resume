import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import { Background } from "@/components/background"
import { Toaster } from "sonner"

const fira = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Bank Resume",
	description: "A simple bank resume application",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	const year = new Date().getFullYear()

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={cn(
				fira.className,
				"antialiased h-dvh overflow-hidden flex flex-col"
			)}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
				>
					<Background />
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
