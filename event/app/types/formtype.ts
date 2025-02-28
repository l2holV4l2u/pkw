export type Base = {
  id: string;
  type: string;
  header: string;
};

export type Section = Base & {
  description: string;
};

export type MultipleChoice = Base & {
  choices: string[];
};

export type FileUpload = Base & {
  file: File | null;
};

export type Date = Base & {
  date: string;
};

export type FormDataElement =
  | Base
  | Section
  | MultipleChoice
  | FileUpload
  | Date;
