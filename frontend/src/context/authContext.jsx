import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  const updateAccessToken = (token) => {
    setAccessToken(token);
  };

  const clearAccessToken = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, updateAccessToken, clearAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
