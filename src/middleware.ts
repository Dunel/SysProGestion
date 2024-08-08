import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const url = req.nextUrl.pathname;

  const urlBasedOnRole = {
    alcaldia: "/alcaldia",
    estudiante: "/estudiante",
    dependencia: "/dependencia",
  };
  const redirectTo = urlBasedOnRole[token.role as "alcaldia" | "estudiante" | "dependencia"];

  if (url === "/checking") {
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  if (token.profile === false && url != `${redirectTo}/perfil`) {
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo + "/perfil", req.url));
    }
  }

  if (
    (url.startsWith("/alcaldia") && token.role !== "alcaldia") ||
    (url.startsWith("/estudiante") && token.role !== "estudiante") ||
    (url.startsWith("/dependencia") && token.role !== "dependencia")
  ) {
    return NextResponse.redirect(new URL("/checking", req.url));
  }
}

export const config = {
  matcher: [
    "/alcaldia/:path*",
    "/estudiante/:path*",
    "/checking",
    "/dependencia/:path*",
  ],
};
