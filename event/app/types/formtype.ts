export type BaseFormDataElement = {
  id: string;
  type: string;
};

export type Section = BaseFormDataElement & {
  title: string;
  description: string;
};

export type QA = BaseFormDataElement & {
  question: string;
};

export type MultipleChoice = BaseFormDataElement & {
  choices: string[];
};

export type FileUpload = BaseFormDataElement & {
  file: File | null;
};

export type Date = BaseFormDataElement & {
  date: string;
};

export type FormDataElement =
  | BaseFormDataElement
  | Section
  | QA
  | MultipleChoice
  | FileUpload
  | Date;
