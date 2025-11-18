import { useState, createContext } from "react";

export const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [logout, setLogout] = useState(false);
  const [currentToken, setCurrentToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  const [isLogin, setIsLogin] = useState(currentUrl.includes("/?sso=esc2902931876") || false);
  const [isAddEvent, setAddEvent] = useState(false);

  const handleCurrentToken = (token) => {
    setCurrentToken(token);
  };

  const handleCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const handleCurrentUrl = (url) => {
    setCurrentUrl(url);
  };
  const handleIsLogin = (status) => {
    setIsLogin(status);
  };
  const handleIsAddEvent = (status) => {
    setAddEvent(status);
  };

  const handleLogout = (status) => {
    setLogout(status);
  };
  return (
    <Context.Provider
      value={{
        logout,
        handleLogout,
        currentToken,
        handleCurrentToken,
        currentUser,
        handleCurrentUser,
        isLogin,
        handleIsLogin,
        isAddEvent,
        handleIsAddEvent,
        currentUrl,
        handleCurrentUrl,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
