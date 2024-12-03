import React from "react";
import "./Header.scss";
const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg  esc-navbar-main">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              className="navbar-brand__logo"
              src="https://sunyempire.edu/media/images/brand-standards/ESC-Logo---Horizontal---Orange---White-Letters.png"
              alt=""
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
