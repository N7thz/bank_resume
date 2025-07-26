"use client"

import {
	QueryClient,
	QueryClientProvider
} from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import * as React from "react"

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider {...props}>
				{children}
			</NextThemesProvider>
		</QueryClientProvider>
	)
}
