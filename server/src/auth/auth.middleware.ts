import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {UsersModel} from '../models/models';
import {AuthRequest} from "../types/authRequest"
import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });

const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies['session-token'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findOne({ _id: (decoded as any)._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'You need to login' });
  }
};
