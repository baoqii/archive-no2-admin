import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setJWT = useCallback(
    (newToken) => {
      setToken(newToken);
    },
    [setToken]
  );

  const logout = useCallback(() => {
    // Clear the token and user data from context
    setJWT(null);
    setUser(null);
    setIsAuth(false);
    navigate("/login", { replace: true });
    // Remove the token from local storage
    localStorage.removeItem("token");
  }, [setJWT, setUser, setIsAuth, navigate]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (token) {
          const baseURL = import.meta.env.VITE_BASE_URL;
          const response = await fetch(
            `${baseURL}/api/authentication/check-token`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            if (response.status === 401) {
              // Token is expired, log the user out
              logout();
              throw new Error("Unauthorized: Token is expired");
            } else {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`
              );
            }
          } else {
            const data = await response.json();
            setUser(data.user);
            setIsAuth(true);
          }
        } else {
          setUser(null);
          setIsAuth(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuth(false);
      }
    };

    checkToken();
  }, [logout, token]);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuth, setJWT, setUser, setIsAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
