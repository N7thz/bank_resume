import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
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
			<body className={fira.className + "antialiased"}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
				>
					<Toaster />
					<div className="flex flex-col h-dvh">
						<Header />
						<div className="flex items-center justify-center p-8 size-full">
							{children}
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html >
	)
}
