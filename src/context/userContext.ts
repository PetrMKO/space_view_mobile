import { User } from "API/userApi";
import { createContext } from "react";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType>({
  setUser: () => null,
  user: undefined,
});
