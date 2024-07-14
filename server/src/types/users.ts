import { Types } from "mongoose";

export interface UpdateUserVotes {
  projectId: Types.ObjectId;
  pollPrice: number;
  userId: Types.ObjectId;
}

interface Name {
  firstName: string;
  lastname: string;
}

interface City {
  cityId: string;
  cityName: string;
}

interface UpdatedFields {
  name: Name;
  phone: string;
  email: string;
  password: string;
  city: City;
}

export interface UpdatedUserInfo {
  userId: UpdateUserVotes["userId"];
  updatedFields: UpdatedFields;
}

export interface UserLogin {
  numberID: string,
  password: string
}

export interface UserRegister {
  firstName: string,
  lastName: string,
  DOB: string,
  phone: string,
  numberID: number,
  email: string,
  password: string,
  city: string,
}