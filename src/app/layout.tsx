import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
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
			<body className={fira.className + "antialiased"}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
				>
					<Toaster />
					<div className="h-dvh flex items-center justify-center">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html >
	)
}
