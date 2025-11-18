import React, { useContext } from "react";
import logo from "./images/logo.png";
import "./Header.scss";
import Container from "components/Container/Container";

import ButtonText from "components/Button/ButtonText";

import { useLogout } from "hooks/useLogout";
import { useLogin } from "hooks/useLogin";
import { Context } from "context";
import { admin_calendar_login_link } from "constants";

const Header = () => {
  const { logout, isAddEvent, isLogin, currentUser } = useContext(Context);
  const { onLogout } = useLogout();

  const isUserInfo = isAddEvent && !logout;
  // const isUserInfo = true; // need to test
  useLogin();
  return (
    <header className="header">
      <Container>
        <div className="header-wrapper">
          <div className="header-logo">
            <a href="/">
              <img className="logo" src={logo} alt="logo" />
            </a>
          </div>
          <div className="header-right">
            {/* {isLogin && (
              <button type="button" className="button-header" onClick={() => onToken(token_jeremy)}>
                login
              </button>
            )} */}

            {isLogin && <ButtonText href={admin_calendar_login_link}>Login</ButtonText>}

            {isUserInfo && (
              <div className="header-info">
                <div className="header-user">
                  <p>{currentUser.name}</p>
                </div>
                <div className="header-actions">
                  <ButtonText onClick={onLogout} type="button" className="button-header">
                    Log out
                  </ButtonText>
                  <ButtonText
                    className="button-header"
                    rel="noreferrer"
                    href="https://admin.calendar.sunyempire.edu/node/add/calendar_event"
                  >
                    Add event
                  </ButtonText>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
