import { Types } from "mongoose";

export interface UpdateUserVotes {
  projectId: Types.ObjectId;
  pollPrice: number;
  userId: Types.ObjectId;
}

interface Name {
  firstName?: string;
  lastName?: string;
}
export interface UpdatedFields {
  name?: Name;
  phone?: string;
  email?: string;
  password?: string;
  city?: string;
  passwordHash?: string;
  "name.firstName": string;
  "name.lastName": string;
}

export interface UpdatedUserInfo {
  userId: UpdateUserVotes["userId"];
  updatedFields: UpdatedFields;
}

export interface UserLogin {
  numberID: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  DOB: string;
  phone: string;
  numberID: number;
  email: string;
  password: string;
  city: string;
}
