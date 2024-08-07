export interface Option {
  optionText: string;
  voteCount: number;
}

export interface Question {
  questionText: string;
  type: "boolean" | "multiple_choice";
  options: Option[];
}

export interface Address {
  houseNumber: string,
  street: string,
  postcode: string,
  city: string,
  suburb: string,
};

export interface Location {
  latitude: number,
  longitude: number,
  address: Address,
}

export type Project = {
  id: string;
  authority: {
    authorityId: string;
    authorityName: string;
  };
  name: string;
  description: string;
  dateCreated: string;
  questionnaire: Question[];
  pollPrice: number;
  dueDate: string,
  imageUrl: string,
  location: Location
};

export type ProjectPreview = Pick<Project, "id" | "name" | "description" | "dateCreated" | "pollPrice" | "dueDate" | "imageUrl" | "location">;

interface Vote {
  questionText: string;
  optionText: string[];
}

export interface ProjectVotes {
  projectId: string;
  votes: Vote[];
  userId: string;
}