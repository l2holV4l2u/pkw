export type BaseResType = {
  id: string;
  type: string;
};

// Check box type
export type ResCBType = BaseResType & {
  selected: boolean[];
};

export type ResMCType = BaseResType & {
  choice: number;
};

export type ResFileType = BaseResType & {
  file: File;
};

export type ResDateType = BaseResType & {
  date: string;
};

export type ResType =
  | BaseResType
  | ResCBType
  | ResMCType
  | ResFileType
  | ResDateType;

export type MultipleResponseType = ResType[] & {
  id: string;
  submittedBy: string;
  submittedAt: string;
};
