import { createContext, useState, useEffect } from "react";
import { getUserDetails } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getUserDetails(token);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        logout();
      }
    };

    fetchUser();

    return () => setUser(null);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
