import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";
import Container from "../components/Container/Container";

const Layout = ({ children, isLogin, isAddEvent, currentUser, onToken }) => {
  const [logout, setLogout] = useState(false);

  const timestamp = currentUser?.exp * 1000; // Convert seconds to milliseconds
  const now = new Date().getTime(); // Current time in milliseconds

  useEffect(() => {
    console.log(`Difference: ${(timestamp - now) / (1000 * 60)} minutes`);
    const timeout = setTimeout(() => {
      sessionStorage.setItem("token", "");
      setLogout(true);
    }, timestamp - now);

    return () => clearTimeout(timeout);
  }, []);

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
