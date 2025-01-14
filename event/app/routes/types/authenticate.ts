export type LoginProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLogin: (email: string, password: string) => Promise<void>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
};

export type RegisterProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
};
