import type { MiddlewareConfig, NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { cookies as Cookies } from "next/headers"

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in"

export const publicRoutes = [
	{ path: "/sign-in", whenAuthenticated: "redirect" },
	{ path: "/create-account", whenAuthenticated: "redirect" },
	{ path: "/home", whenAuthenticated: "next" },
	{ path: "/balance", whenAuthenticated: "next" },
	{ path: "/spents/", whenAuthenticated: "next" },
] as const

export async function middleware(request: NextRequest) {

	const cookies = await Cookies()
	const path = request.nextUrl.pathname
	const publicRoute = publicRoutes.find((route) => route.path === path)
	const authToken = request.cookies.get("token")

	if (path === "/") {

		const redirectUrl = request.nextUrl.clone()

		redirectUrl.pathname = "/home"

		return NextResponse.redirect(redirectUrl)
	}

	if (!authToken && publicRoute) {
		cookies.delete("token")
		return NextResponse.next()
	}

	if (!authToken && !publicRoute) {

		cookies.delete("token")

		const redirectUrl = request.nextUrl.clone()

		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

		return NextResponse.redirect(redirectUrl)
	}

	if (
		authToken &&
		publicRoute &&
		publicRoute.whenAuthenticated === "redirect"
	) {
		const redirectUrl = request.nextUrl.clone()

		redirectUrl.pathname = "/home"

		return NextResponse.redirect(redirectUrl)
	}

	if (authToken && !publicRoute) {

		const redirectUrl = request.nextUrl.clone()

		return NextResponse.redirect(redirectUrl)
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public/).*)"],
}
