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
  questionnaire: string[];
  pollPrice: number;
};

export type ProjectPreview = Pick<Project, "id" | "name" | "description" | "dateCreated" | "pollPrice">;
