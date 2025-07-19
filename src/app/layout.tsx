import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
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
    <>
      <html lang="pt-BR" suppressHydrationWarning>
        <head />
        <body className={cn(fira.className, "antialiased min-h-dvh flex")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
