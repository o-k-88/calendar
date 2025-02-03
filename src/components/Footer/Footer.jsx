import React from "react";
import Container from "../Container/Container";
import footerLogo from "./images/footer-logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <img className="footer__logo" src={footerLogo} alt="footer-logo" />
      </Container>
    </footer>
  );
};

export default Footer;
