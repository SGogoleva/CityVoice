export type Users = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  DOB: string;
  phone: string;
  email: string;
  passwordHash: string;
  city: {
    cityId: string;
    cityName: string;
  };
  dateCreated: string;
  projectId: string[];
  messageId: string[];
  earnedPoints: number;
};

export type UserName = {
  firstName: Pick<Users["name"], "firstName"> | null;
};


export type loginUser = Pick<Users, "email" | "passwordHash"> & UserName;

export type registerUser = Omit<Users, "projectId" | "messageId" | "earnedPoints" | "id" | "dateCreated"> & {
  city: Omit<Users["city"], "cityId">}
;

export type registeredUser = Omit<Users, "projectId" | "messageId" | "earnedPoints">;