export type Users = {
  id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  DOB: string;
  email: string;
  passwordHash: string;
  city: {
    cityId: string;
    cityName: string;
  };
  projectId: string[];
  messageId: string[];
  earnedPoints: number;
};

export type loginUser = Pick<Users, "email" | "passwordHash">;

export type registerUser = Omit<Users, "projectId" | "messageId" | "earnedPoints">;
