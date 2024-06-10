export type Users = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  DOB: string;
  phone: string;
  email: string;
  password: string;
  city: {
    cityId: string;
    cityName: string;
  };
  dateCreated: string;
  projectId: string[];
  messageId: string[];
  earnedPoints: number;
};

export interface UserName {
  firstName: string | null;
}

export type loginUser = Pick<Users, "email" | "password">

export type registerUser = Omit<Users, "projectId" | "messageId" | "earnedPoints" | "id" | "dateCreated">

export type registeredUser = Omit<registerUser, "password">;

export type loggedUser = Omit<Users, 'password'>
