import React from "react";
import logo from "./images/logo.png";
import "./Header.scss";
import Container from "../Container/Container";
const Header = () => {
  return (
    <header className="header">
      <Container>
        <a href="#">
          <img className="header-logo" src={logo} alt="logo" />
        </a>
      </Container>
    </header>
  );
};

export default Header;
