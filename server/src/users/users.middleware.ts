import { Request, Response, NextFunction } from "express";
import updateUserSchema from "../schemas/updateUserSchema";
const checkUpdateUserInfoInput = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userParsed = updateUserSchema.safeParse(req.body);
    if (!userParsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: userParsed.error.errors });
    }
    next();
  };

export default checkUpdateUserInfoInput