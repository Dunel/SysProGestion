import { withAuth } from "next-auth/middleware";

const rolePaths = {
  alcaldia: ["/alcaldia", "/api/alcaldia"],
  dependencia: ["/dependencia", "/api/dependencia"],
  estudiante: ["/estudiante", "/api/estudiante"],
};

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role;

    if (role) {
      const redirectUrl = rolePaths[role][0];
      if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/checking") {
        return Response.redirect(new URL(redirectUrl, req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if(req.nextUrl.pathname === "/login") return true;
        if (!token) return false;

        const { role } = token;
        const { pathname } = req.nextUrl;

        const allowedPaths = rolePaths[role] || [];
        return allowedPaths.some(path => pathname.startsWith(path));
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