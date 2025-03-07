import { ResType } from "./res";

export type ResSchemaType = {
  name: string | null;
  responseFields: {
    formFieldId: number;
    value: ResType;
  }[];
  submittedAt: Date;
  responseId: number;
}[];

export type UserSchemaType = {
  id: string;
  email: string;
  name: string;
  profilePicture: string | null;
  contactNo: string | null;
  familyNo: string | null;
  school: string | null;
  thaiId: string | null;
  updatedAt: Date;
};
