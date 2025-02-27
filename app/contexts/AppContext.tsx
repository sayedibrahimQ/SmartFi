"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  age: string;
  occupation: string;
  phone: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  existingSavings: string;
  monthlyInvestmentCapacity: string;
  primaryGoal: string;
  riskTolerance: string;
  // ... other user fields
}

interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on initial load
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export const useUserContext = () => useContext(AppContext);
