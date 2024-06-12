import { authoritiesSchema } from "../models/models";
import { Request, Response, NextFunction } from "express";

export const getAuthorities = async (req: Request, res: Response) => {
    try {
      const authorities = await authoritiesSchema.find();
      res.json(authorities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch authorities' });
    }
  };