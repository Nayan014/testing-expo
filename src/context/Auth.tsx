import React, { Children, createContext, ReactNode, useState } from "react";

interface authContextType {
  auth: boolean;
  setAuth: (a: boolean) => void;
}

interface authProvider {
  children: ReactNode;
}

export const AuthContext = createContext<authContextType | undefined>(
  undefined
);

const AuthProvider: React.FC<authProvider> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(true);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
