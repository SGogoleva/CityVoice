import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

export type reqFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

export type UploadFile = Pick<reqFile, "buffer" | "originalname">;

export interface CloudinaryUploadResult extends UploadApiResponse {}

export interface CloudinaryUploadError extends UploadApiErrorResponse {}