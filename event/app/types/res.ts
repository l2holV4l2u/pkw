export type ResBaseType = {
  id: string;
  type: string;
};

export type ResQAType = ResBaseType & {
  answer: string;
};

// Check box type
export type ResCBType = ResBaseType & {
  selected: boolean[];
};

export type ResMCType = ResBaseType & {
  choice: number;
};

export type ResFileType = ResBaseType & {
  file: File | null;
};

export type ResDateType = ResBaseType & {
  date: string;
};

export type ResType =
  | ResBaseType
  | ResCBType
  | ResMCType
  | ResFileType
  | ResDateType;

export type FormResType = {
  responseField: ResType[];
};
