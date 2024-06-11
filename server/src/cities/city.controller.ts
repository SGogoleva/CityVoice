import { City } from "../models/models";
import { Request, Response, NextFunction } from "express";

export const getCities = async (req: Request, res: Response) => {
    try {
      const cities = await City.find({}, 'cityId cityName');
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cities' });
    }
  };