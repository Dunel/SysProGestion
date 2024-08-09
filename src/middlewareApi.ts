import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Middleware ejecutado para la ruta:', req.nextUrl.pathname);

if (!token) {
  return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
}

console.log(token);

const url = req.nextUrl.pathname;

const apiRoles: { [key: string]: string } = {
  "/api/estudiantes": "estudiante",
  "/api/alcaldia": "alcaldia",
  "/api/dependencia": "dependencia",
};

const matchedPath = Object.keys(apiRoles).find(path => url.startsWith(path));
const requiredRole = matchedPath ? apiRoles[matchedPath] : undefined;

if (requiredRole && token.role !== requiredRole) {
  return NextResponse.json({ message: 'Permiso denegado' }, { status: 403 });
}

return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/:path*",  // Solo aplica a rutas de la API
  ],
};