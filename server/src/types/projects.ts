export interface Project {
  authority: {
    authorityId: string;
    authorityName: string;
  };
  name: string;
  describtion: string;
  dateCreated: string;
  questionnaire: string[];
  pollPrice: number;
}
