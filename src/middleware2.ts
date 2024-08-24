import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.pathname;

  if (!token) {
    if (url.startsWith("/api")) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    } else if (!url.startsWith("/login") && !url.startsWith("/register")) {
      return NextResponse.redirect(new URL("/login", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (url.startsWith("/login") || (url.startsWith("/register") && token.role)) {
    return NextResponse.redirect(new URL("/checking", req.url));
  }

  const apiRoles: { [key: string]: string } = {
    "/api/estudiantes": "estudiante",
    "/api/alcaldia": "alcaldia",
    "/api/dependencia": "dependencia",
  };
  const matchedPath = Object.keys(apiRoles).find((path) =>
    url.startsWith(path)
  );
  const requiredRole = matchedPath ? apiRoles[matchedPath] : undefined;

  if (requiredRole && token.role !== requiredRole) {
    return NextResponse.json({ message: "Permiso denegado" }, { status: 403 });
  }

  const urlBasedOnRole = {
    alcaldia: "/alcaldia",
    estudiante: "/estudiante",
    dependencia: "/dependencia",
  };

  const redirectTo = urlBasedOnRole[token.role];

  if (url.startsWith("/checking")) {
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, req.url));
    }
  }

  if (
    token.profile === false &&
    url.startsWith(`${redirectTo}/perfil`) &&
    url.startsWith(`/api${redirectTo}/perfil`)
  ) {
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/alcaldia/:path*",
    "/api/dependencia/:path*",
    "/api/estudiante/:path*",
    "/alcaldia/:path*",
    "/estudiante/:path*",
    "/checking",
    "/dependencia/:path*",
    "/login",
    "/register",
  ],
};