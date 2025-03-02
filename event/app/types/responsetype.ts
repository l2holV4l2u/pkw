export type BaseResponseType = {
  id: string;
  type: string;
};

// Check box type
export type ResponseCBType = BaseResponseType & {
  choices: string[];
};

export type ResponseMCType = BaseResponseType & {
  choices: string[];
};

export type ResponseFileType = BaseResponseType & {
  file: File;
};

export type ResponseDateType = BaseResponseType & {
  date: string;
};

export type ResponseType =
  | BaseResponseType
  | ResponseCBType
  | ResponseMCType
  | ResponseFileType
  | ResponseDateType;
