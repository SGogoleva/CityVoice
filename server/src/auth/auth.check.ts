import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    // const token = req.cookies.access_token
    const token = req.cookies['session-token'];
    if (!token) {
      return res.status(403).json({ message: 'User not authorized' })
    }
    const decodedToken = verifyToken(token)
    ;(req as any).id = decodedToken.id
    ;(req as any).firstName = decodedToken.firstName
    return next()
  } catch (error) {
    console.error(error)
    return res.status(403).json({ message: 'User not authorized' })
  }
}

export default checkAuth

export const checkSessionToken = (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies['session-token'];
  const decodedToken = verifyToken(sessionToken)
  const user = decodedToken
  if (sessionToken) {
    res.locals.isAuthenticated = true;
    res.locals.user = user
  } else {
    res.locals.isAuthenticated = false;
  }

  next();
};
