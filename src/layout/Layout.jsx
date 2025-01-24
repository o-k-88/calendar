import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="g-layout">
      <Header />
      <main className="main">
        <div className="container-fluid">
          <div className="main-content-wrapper">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
