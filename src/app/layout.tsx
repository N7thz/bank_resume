import { Background } from "@/components/background"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import "./globals.css"

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
