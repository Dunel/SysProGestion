import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  const url = req.nextUrl.pathname;

  const urlBasedOnRole = {
    alcaldia: "/alcaldia",
    estudiante: "/estudiante",
    dependencia: "/dependencia",
  };
  if (url === "/checking") {
    const redirectTo = urlBasedOnRole[token.role as "alcaldia" | "estudiante"];
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  if (url.startsWith("/alcaldia") && token.role !== "alcaldia") {
    return NextResponse.redirect(new URL("/checking", req.url));
  }
  if (url.startsWith("/estudiante") && token.role !== "estudiante") {
    return NextResponse.redirect(new URL("/checking", req.url));
  }
  if (url.startsWith("/dependencia") && token.role !== "dependencia") {
    return NextResponse.redirect(new URL("/checking", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/alcaldia/:path*", "/estudiante/:path*", "/checking", "/dependencia/:path*"],
};
