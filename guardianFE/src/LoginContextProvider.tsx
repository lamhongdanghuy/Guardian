import { createContext, useState, ReactNode } from "react";

interface LoginProviderProps {
  children: ReactNode;
}

interface User {
  userId: string | null;
  email: string | null;
}

interface LoginContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  userId: null,
  email: null,
};

const defaultContext: LoginContextProps = {
  user: defaultUser,
  setUser: () => {},
};

export const LoginContext = createContext(defaultContext);

export function LoginProvider({ children }: LoginProviderProps) {
  const [user, setUser] = useState(defaultUser);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
