import { Timestamp } from "firebase/firestore";

export type ApiHookResponse<T = unknown> = {
  status: number | "success" | "error";
  message: string;
  data: T | null;
};

export type PageInfo = {
  totalItems: number;
  totalPages: number;
  remainingPages: number;
  nextPage: number | null;
  prevPage: number | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  pageInfo: PageInfo;
};

export type FirebaseUserProfile = {
  id: string;
  name: string;
  email: string;
  role?: string;
  active?: boolean;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};

export type FirebaseCategory = {
  id: string;
  name: string;
  description: string;
  Project?: FirebaseProject[];
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};

export type FirebasePhoto = {
  id: string;
  projectId: string;
  photoUrl: string;
  photoBase64?: string;
  fileName?: string;
  contentType?: string;
  size?: number;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};

export type FirebaseProject = {
  id: string;
  name: string;
  description: string;
  especificDetails: string;
  projectCategoryId: string;
  userId?: string;
  coverImageUrl?: string;
  coverPhotoId?: string;
  ProjectPhotos: FirebasePhoto[];
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
};
