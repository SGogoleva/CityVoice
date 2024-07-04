import { ObjectId, Types } from "mongoose";

export interface UpdateUserVotes {
    projectId: Types.ObjectId;
    pollPrice: number;
    userId: Types.ObjectId
  }