import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";
import Container from "../components/Container/Container";

const Layout = ({ children, isLogin, isAddEvent, currentUser,onToken }) => {
  return (
    <div className="g-layout">
      <Header
          isLogin={isLogin}
          isAddEvent={isAddEvent}
          currentUser={currentUser}
          onToken={onToken}
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
