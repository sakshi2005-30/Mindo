import React, { useContext, createContext, useState, useEffect } from "react";

import { api } from "../services/api";


interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextTypes {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  checkAuthStatus: () => Promise<void>;
  signin: () => Promise<void>;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/users/me");
      if (response.data &&response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
 
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);


  const signin = async () => {
    await checkAuthStatus();
  };

  const signup = async () => {
    await checkAuthStatus();
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        checkAuthStatus,
        signin,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
