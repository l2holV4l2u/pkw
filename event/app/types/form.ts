export type BaseFormType = {
  id: string;
  type: string;
  header: string;
};

export type FormSectionType = BaseFormType & {
  description: string;
};

// Multiple Choice - includes check box & radio button
export type FormMCType = BaseFormType & {
  choices: string[];
};

export type FormType = BaseFormType | FormSectionType | FormMCType;
