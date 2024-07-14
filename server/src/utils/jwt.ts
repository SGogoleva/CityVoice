import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development.local" });

const secret = process.env.JWT_SECRET;

const generateToken = ({
  id,
  username,
}: {
  id: string;
  username: string;
}): string => {
  const payload = { id, username };
  const token = jwt.sign(payload, secret!, { expiresIn: "24h" });
  return token;
};

const verifyToken = (token: string): JwtPayload => {
  const decodedToken = jwt.verify(token, secret!) as JwtPayload;
  return decodedToken;
};

export { generateToken, verifyToken };
