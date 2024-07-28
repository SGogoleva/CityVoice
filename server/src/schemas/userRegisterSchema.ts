import moment from "moment";
import { z } from "zod";
import { SCHEMAS_CONSTANTS } from "../config/const";

const userRegisterSchema = z.object({
  firstName: z.string().min(3, { message: "First name is required" }),
  lastName: z.string().min(3, { message: "Last name is required" }),
  DOB: z
    .string()
    .min(1, { message: "Date of Birth is required" })
    .refine(
      (dob) => {
        const birthDate = moment(dob, "YYYY-MM-DD");
        const minDate = moment().subtract(SCHEMAS_CONSTANTS.MIN_AGE, "years");
        return birthDate.isBefore(minDate);
      },
      {
        message: `User must be at least ${SCHEMAS_CONSTANTS.MIN_AGE} years old`,
      }
    ),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits long" })
    .regex(SCHEMAS_CONSTANTS.PHONE_REGEX, {
      message: "Phone number must start with 05 and contain only digits",
    }),
  numberID: z
    .string()
    .regex(/^\d+$/, "Must contain only digits")
    .length(9, "Must be 9 digits long"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(SCHEMAS_CONSTANTS.PASSORD_REGEX, {
      message:
        "Password must include at least one digit and one special character",
    }),
  city: z.string().min(1, { message: "City is required" }),
});

export default userRegisterSchema;
