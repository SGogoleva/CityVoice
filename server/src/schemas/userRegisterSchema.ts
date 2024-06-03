import { z } from "zod";

const userRegisterSchema = z.object({
  name: z.object({
    firstName: z.string().min(3, { message: "First name is required" }),
    lastName: z.string().min(3, { message: "Last name is required" }),
  }),
  DOB: z.string({ required_error: "Date of Birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password is required" }),
  city: z.object({
    cityName: z.string().min(3, { message: "City Name is required" }),
  }),
});

export default userRegisterSchema;
