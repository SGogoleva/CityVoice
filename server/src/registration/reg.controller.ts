import { Request, Response, NextFunction } from "express";
import userRegisterSchema from "../schemas/userRegisterSchema";
import { UsersModel } from "../models/models";
import { registraionService } from "./reg.service";
import { UserRegister } from "../types/users";

export const registerUser = async (req: Request, res: Response) => {
  const userRegisterInfo = req.body as UserRegister;
  const { firstName, lastName, DOB, phone, numberID, email, password, city } =
    userRegisterInfo;
  try {
    const isUserAlready = await registraionService.isUserExists(numberID);
    if (isUserAlready) {
      return res
        .status(400)
        .json({ message: "User with this username is already exists" });
    }
    const passwordHash = await registraionService.getHashedPassword(password);

    const newUser = new UsersModel({
      name: {
        firstName,
        lastName,
      },
      DOB: new Date(DOB),
      phone,
      numberID,
      email,
      passwordHash,
      city,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser.id,
        name: savedUser.name?.firstName,
      },
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(501).json({ message: "Server error", error: error.message });
  }
};

// middleware to check reqistration input

export const checkRegistrationInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userParsed = userRegisterSchema.safeParse(req.body);
  if (!userParsed.success) {
    const errorMessages = userParsed.error.errors.map((err) => err.message);
    return res
      .status(400)
      .json({ message: "Invalid input", errors: errorMessages });
  }
  next();
};
