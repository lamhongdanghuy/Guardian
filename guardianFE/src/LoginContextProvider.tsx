import { createContext, useState, ReactNode } from "react";

interface LoginProviderProps {
  children: ReactNode;
}

interface User {
  token: string;
  email: string;
  id: string;
  role: string;
  emailVerification: boolean;
  status: string;
}

interface LoginContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  email: "",
  id: "",
  role: "",
  token: "",
  emailVerification: false,
  status: "",
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
