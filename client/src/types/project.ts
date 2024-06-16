export interface Option {
  // _id: string;
  optionText: string;
  voteCount: number;
}

export interface Question {
  // _id: string;
  questionText: string;
  type: "boolean" | "multiple_choice";
  options: Option[];
}

export type Project = {
  id: string;
  authority: {
    authorityId: string;
    authorityName: string;
  };
  city: {
    cityId: string;
    cityName: string;
  };
  name: string;
  description: string;
  dateCreated: string;
  questionnaire: Question[];
  pollPrice: number;
  dueDate: string,
  imageUrl: string
};

export type ProjectPreview = Pick<Project, "id" | "name" | "description" | "dateCreated" | "pollPrice" | "dueDate" | "imageUrl" | "city">;
