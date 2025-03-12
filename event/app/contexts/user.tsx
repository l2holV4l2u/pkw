import { UserSchemaType } from "@types";
import { createContext, ReactNode } from "react";

export const UserContext = createContext<{
  user: UserSchemaType;
}>({
  user: {
    id: "0",
    email: "johndoe@gmail.com",
    name: "John Doe",
    profilePicture: null,
    contactNo: null,
    familyNo: null,
    school: null,
    thaiId: null,
    updatedAt: new Date(),
  },
});

export function UserProvider({
  user,
  children,
}: {
  user: UserSchemaType;
  children: ReactNode;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
