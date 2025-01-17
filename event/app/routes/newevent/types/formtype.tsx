export type BaseFormDataElement = {
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

export type FormDataElement =
  | BaseFormDataElement
  | Section
  | QA
  | MultipleChoice;
