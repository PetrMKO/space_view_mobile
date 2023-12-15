import { createContext } from "react";

import { User } from "../API/userApi";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  setUser: () => null,
  user: null,
});
