import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";
import Container from "../components/Container/Container";

const Layout = ({ children, isLogin, isAddEvent, currentUser, onToken }) => {
  const [logout, setLogout] = useState(false);
  const [timeoutTime, setTimeoutTime] = useState(60000);

  useEffect(() => {
    if (currentUser.exp) {
      setTimeoutTime(currentUser.exp * 1000 - new Date().getTime());
      console.log(`Difference: ${timeoutTime / (1000 * 60)} minutes`);
      const timeout = setTimeout(() => {
        sessionStorage.setItem("token", "");
        setLogout(true);
      }, timeoutTime);

      return () => clearTimeout(timeout);
    }
  }, [timeoutTime, currentUser]);

  return (
    <div className="g-layout">
      <Header
        isLogin={isLogin}
        isAddEvent={isAddEvent}
        currentUser={currentUser}
        onToken={onToken}
        logout={logout}
        setLogout={setLogout}
      />
      <main className="main">
        <Container>
          <div className="main-content-wrapper">{children}</div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
