import userRegisterSchema from "../schemas/userRegisterSchema";
import { UsersModel } from "../models/models";
import { hashPassword } from "../utils/bcrypt";
import { registraionService } from "./reg.service";

export const registerUser = async (req, res) => {
  const { name, DOB, email, password, city } = req.body;
  try {
    const result = await registraionService.register(email, password);

    if (!result) {
      return res
        .status(400)
        .json({ message: "User with this email is already exists" });
    }

    const newUser = new UsersModel({
      name,
      DOB: new Date(DOB),
      email,
      result,
      city: {
        cityName: city.cityName,
      },
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name?.firstName,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    res.status(501).json({ message: "Server error", error: error.message });
  }
};

// middleware to check if username and password are provided

export const checkRegistrationInput = (req, res, next) => {
  const userParsed = userRegisterSchema.safeParse(req.body);
  if (!userParsed.success) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }
  next()
}