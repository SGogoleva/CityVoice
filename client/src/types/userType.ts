export type Users = {
  id: string;
  numberID: string;
  name: {
    firstName: string;
    lastName: string;  
  }
  DOB: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  dateCreated: string;
  projectId: string[];
  messageId: string[];
  earnedPoints: number;
  avatarUrl: string;
};

export interface UserName {
  firstName: string | null;
}

export type registerUser = {
  numberID: string;
  firstName: string;
  lastName: string;  
  DOB: string;
  phone: string;
  email: string;
  password: string;
  city: string;
};

export type loginUser = Pick<Users, "numberID" | "password">

export type registeredUser = Omit<registerUser, "password">;

export type loggedUser = Omit<Users, 'password'>

export type authenticatedUser = Pick<Users, 'id' | "numberID">
