type Users = {
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

type loginUser = Pick<Users, "email" | "passwordHash">;

type registerUser = Omit<Users, "projectId" | "messageId" | "earnedPoints">;