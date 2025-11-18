import { jwtDecode } from "jwt-decode";
import { useEffect, useContext, useRef } from "react";
import { Context } from "context";
import { getTokenFromCurrentUrl } from "helpers";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const {
    handleCurrentToken,
    handleCurrentUrl,
    handleIsLogin,
    handleIsAddEvent,
    handleCurrentUser,
    currentToken,
    currentUrl,
  } = useContext(Context);

  const ref = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromCurrentUrl();
    if (token) {
      handleCurrentToken(token);
      ref.current = token;
      sessionStorage.setItem("token", token);
      // setCurrentToken(token);
    }
  }, [window.location.href]);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (token) {
  //     onToken(token);
  //   }
  // }, []);

  useEffect(() => {
    // setCurrentToken(sessionStorage.getItem("token"));
    if (!ref.current && sessionStorage.getItem("token")) {
      ref.current = sessionStorage.getItem("token");
    }
    if (ref.current) {
      handleCurrentToken(ref.current);
      navigate("/");
    }
    if (!sessionStorage.getItem("token") && ref.current) {
      sessionStorage.setItem("token", ref.current);
    }
  }, []);

  useEffect(() => {
    handleCurrentUrl(window.location.href);

    if (currentUrl.includes("/?sso=esc2902931876")) {
      handleIsLogin(true);
    }
    if (currentToken) {
      handleIsLogin(false);
      handleIsAddEvent(true);

      handleCurrentUser(jwtDecode(currentToken));
    }
  }, [currentUrl, currentToken]);
};
