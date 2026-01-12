import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  id: string;
  email: string;
  gemName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // HARDCODED: Set to true to skip onboarding, false to show onboarding
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  // Hardcoded user data
  const user: User | null = isAuthenticated ? {
    id: "1",
    email: "user@example.com",
    gemName: "Sapphire",
  } : null;

  const logout = () => {
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
