import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

interface DecodedToken {
  role: string;
  [key: string]: any;
}

const registerMiddleware = (allowedRoles: string[]) => {
  return (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado' });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(401).json({ error: 'Permiso denegado' });
      }

      (req as any).user = decodedToken;
      (req as any).token = token;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
};

export default registerMiddleware;
