import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import userLoginSchema from "../schemas/userLoginSchema";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  if (!result) {
    return res
      .status(401)
      .clearCookie("session-token")
      .json({ message: "Invalid username or password" });
  }
  if (!result.token)
    return res
      .status(401)
      .clearCookie("session-token")
      .json({ message: "Invalid username or password" });

  res.cookie("session-token", result.token, { httpOnly: true });
  return res.status(200).json(result.user);
};

export const checkAuthToken = (req: Request, res: Response) => {
  return res.status(200).json({ isAuthenticated: res.locals.isAuthenticated, user: res.locals.user });
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("session-token")
  return res.status(200).json({ message: 'Logged out successfully' });
} 

// middleware to check if username and password are provided

export const checkLoginInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const result = userLoginSchema.safeParse({ email, password });
  if (!result.success) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  next();
};
