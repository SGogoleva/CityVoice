import { z } from "zod";

const userRegisterSchema = z.object({
  name: z.object({
    firstName: z.string().min(3, { message: "First name is required" }),
    lastName: z.string().min(3, { message: "Last name is required" }),
  }),
  DOB: z.string({ required_error: "Date of Birth is required" }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits long" })
    .regex(/^0\d{9}$/, {
      message: "Phone number must start with 0 and contain only digits",
    })
    .transform((phoneNumber) => `+972${phoneNumber.slice(1)}`),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password is required" }),
  city: z.object({
    cityName: z.string().min(3, { message: "City Name is required" }),
  }),
});

export default userRegisterSchema;
