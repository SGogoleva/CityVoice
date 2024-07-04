import mongoose, { Types } from "mongoose";

export interface Project {
  projectId: mongoose.Types.ObjectId;
  questionText: string;
  optionText: string;
  userId: mongoose.Types.ObjectId;
}

interface Votes {
  questionText: string;
  optionText: string[];
}

export interface ProjectVotes {
  projectId: mongoose.Types.ObjectId;
  votes: Votes[]
  userId: mongoose.Types.ObjectId;
}