import { Request, Response, NextFunction } from "express";
import { userService } from "./users.service";
import mongoose from "mongoose";

export const getUsersPaginated = async (req: Request, res: Response) => {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    if (!page || !limit) {
      return res.status(400).json({ message: "Invalid users page or limit" });
    }
    const users = await userService.getUsersPaginated({
      page: +page,
      limit: +limit,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
    });
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const user = await userService.getUserById(objectId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
