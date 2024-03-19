import { createContext, useState, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<User>(cookies.user || defaultUser);

  useEffect(() => {
    if (user.token) {
      // Set the user cookie with secure flag
      setCookie("user", user, { path: "/", secure: true });
    } else {
      // Remove the user cookie if the user is not logged in
      removeCookie("user");
    }
  }, [user, setCookie, removeCookie]);

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
