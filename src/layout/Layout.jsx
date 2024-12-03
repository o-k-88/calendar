import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="g-layout">
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
