import { withAuth } from "next-auth/middleware";

const rolePaths = {
  alcaldia: ["/alcaldia", "/api/alcaldia"],
  dependencia: ["/dependencia", "/api/dependencia"],
  estudiante: ["/estudiante", "/api/estudiante"],
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const url = req.nextUrl.pathname;

    if (token?.role) {
      const redirectUrl = rolePaths[token.role][0];
      if (
        url.startsWith("/login") ||
        url.startsWith("/register") ||
        url.startsWith("/checking")
      ) {
        return Response.redirect(new URL(redirectUrl, req.url));
      }
      if (
        !token.profile &&
        !url.startsWith(`${redirectUrl}/perfil`) &&
        !url.startsWith(`/api${redirectUrl}/perfil`)
      ) {
        return Response.redirect(new URL(redirectUrl + "/perfil", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/login") return true;
        if (!token) return false;

        const { role } = token;
        const { pathname } = req.nextUrl;

        const allowedPaths = rolePaths[role] || [];
        return allowedPaths.some((path) => pathname.startsWith(path));
      },
    },
  }
);

export const config = {
  matcher: [
    "/estudiante/:path*",
    "/alcaldia/:path*",
    "/dependencia/:path*",
    "/api/estudiante/:path*",
    "/api/alcaldia/:path*",
    "/api/dependencia/:path*",
    "/login",
    "/checking",
  ],
};
