import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string; // initials or color indicator
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("workflow_user");
    return stored ? JSON.parse(stored) : null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("workflow_user");
    localStorage.removeItem("workflow_token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
