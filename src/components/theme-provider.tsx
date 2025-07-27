"use client"

import {
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export const queryClient = new QueryClient()

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider {...props}>
				{children}
			</NextThemesProvider>
		</QueryClientProvider>
	)
}
