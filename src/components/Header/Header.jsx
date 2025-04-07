import React, { useEffect, useState, useRef } from "react";
import logo from "./images/logo.png";
import "./Header.scss";
import Container from "../Container/Container";
import { getTokenFromCurrentUrl } from "../../helpers";
import ButtonText from "../Button/ButtonText";
import { useNavigate } from "react-router";

const Header = ({
  isLogin = false,
  isAddEvent = false,
  currentUser,
  onToken,
  logout,
  setLogout,
}) => {
  const token_oleg =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImltaTBZMnowZFlLeEJ0dEFxS19UdDVoWUJUayJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQwNjcyMDM2LCJuYmYiOjE3NDA2NzIwMzYsImV4cCI6MTc0MDY3NTkzNiwiYWlvIjoiQVpRQWFcLzhaQUFBQXFkcGdBMm1EXC80VmpaOVdOYlRENHNObUxnTFRnaDdaWHUwemN4OVRjS0NUeEpuK2FsYXZHZForM0JZaW1vNTZBTDBHVXpra01DYzNyeVk5T2xpYXBWMnNZUnV0dk9jRUJrRDNqRU1IY0t1dUlsQTdKUHdFSmNHOUxVMk5FbTVvNGpVZkNuV1NZVTBhRzlZckg0dWk4RUpCbG93dHRnc0p3OUJpTWhIK2lYQnlNV2NjVWZTOXpPN2R3d29MSHNXWWsiLCJjX2hhc2giOiJKX2FXVnI2Ui12Q3I5ZEZhenhkQkV3IiwiZW1haWwiOiJvbGVoLmt5cnlsZW5rb0BzdW55ZW1waXJlLmVkdSIsIm5hbWUiOiJPbGVoIEt5cnlsZW5rbyIsIm5vbmNlIjoiNjc4OTEwIiwib2lkIjoiOWM2ODgwYWUtNGZiMi00MmMxLTk2NzEtYjNlMmJkYTUxNDYzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2xlaC5reXJ5bGVua29Ac3VueWVtcGlyZS5lZHUiLCJyaCI6IjEuQVRnQU1oRUpVR1JVYVUtWXh0Q0o2bDZIWE9WZnFaVV9tS1JGa0tnMmx6NG1ZQUgwQUxVNEFBLiIsInNpZCI6IjAwMjJhYjE5LTY5ZDgtNTQ5MC03ZTdiLTNmMGY1YzVhMGI0NCIsInN1YiI6InNwbURvUnJ3emhFbjQzQWI0WjhvdzdiN0ZIUGx1NHQtVUVzZWdMQ0tSTzQiLCJ0aWQiOiI1MDA5MTEzMi01NDY0LTRmNjktOThjNi1kMDg5ZWE1ZTg3NWMiLCJ1dGkiOiJrTEdsZEJqdnFreTR3NlNyOVprLUFBIiwidmVyIjoiMi4wIiwidWlkIjoiMiJ9.Szi2kaloOMVUqxI9okqNc0thVM1nBFjWkyrNS8xrUggIsmrGN6LYbLMUKTwtbdLgdNEAttNY9vYc21_Y8DQVIwdqvj-h7sKCQKOtXfz6OtPlZTzBfGDWKKLwlzzplPKZgtA0ASitoXi8zlaqVsC25heVXsJCbQsaRxRTc67vZX4IOJWUXj1id_o4BedOZbmMD7gEztZEM7FzcQcoHSue7DKeXUY_7qoyc2WBN8QT1TvvkjsC56rY7v2iU8jfuYKX7Qv7mBN70szGjcbxVTxyMNU2gvBtYHfvJr2SByGbX_bAW-lG1cXV5FMqBxtPi6_f9AEbJ5Suv1QIMLu3kkp41Q";
  const token_jeremy =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImltaTBZMnowZFlLeEJ0dEFxS19UdDVoWUJUayJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQwNTkyOTM2LCJuYmYiOjE3NDA1OTI5MzYsImV4cCI6MTc0MDU5NjgzNiwiYWlvIjoiQVdRQW1cLzhaQUFBQWFoMEhuVmtQVDNjU1lPXC9kN0NmUFJhaHJCUmd2NGVNdGQxaVJcLzlVNk1YSzRPbHBzQVNiaWRnXC81UEFSbWkwUVIyRUlmRFZiWDY1dzJZRVRyVUNQVGQ1N2pFcXRHSjErRzFlNFAwSW4ycWhTZU9mOEJQRklBSjdjZkJESEtHcGxUIiwiY19oYXNoIjoiMklmU1ktMGFmbFgyM0VSNjcxSF9jdyIsImVtYWlsIjoiamVyZW15LnN0b25lQHN1bnllbXBpcmUuZWR1IiwibmFtZSI6IkplcmVteSBTdG9uZSIsIm5vbmNlIjoiNjc4OTEwIiwib2lkIjoiNmJjMzkzZmEtMjRhNS00ZGVlLWE2MGEtNTdlMjhmYjQzYWFkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamVyZW15LnN0b25lQHN1bnllbXBpcmUuZWR1IiwicmgiOiIxLkFUZ0FNaEVKVUdSVWFVLVl4dENKNmw2SFhPVmZxWlVfbUtSRmtLZzJsejRtWUFIMEFKVTRBQS4iLCJzaWQiOiIwMDIyNWNmOS1hZGU3LTM2ODgtOGYyNy03NmE3YTBmZTEwY2EiLCJzdWIiOiJNYUsxalFVTVVzdmgxYVRGWTJfUlktQnAzVnltQUZ3aENLR2tQazNRWTJNIiwidGlkIjoiNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjIiwidXRpIjoiRWVRSDVYNDJFRW02Ui1kMGszWmNBQSIsInZlciI6IjIuMCIsInVpZCI6IjEifQ==.qzVi90XiLkCSiw00n58VLAnkdwSswxD2Se-Z5XR-UgA9m6-FVqxiaMORICN9G7yFkRAuk0gaOFcURG6CQFP7EvfFVx5KsyIs4iC_BwQ0iplQ8dmOTSbTWmGL-wetDm2VFfi3xGTvHtdWmDpn0VcHt91Zx-f1vTiKOJ-ysxKhwCDjm4ImHd2Yp7fquZ8bnkb69YG4L6ccUc0Xsz10-bVlfmV2eGcVIP6h90sYznaWeFyjWUxrCN6Ku5WP6OlcHQkAPYvXlM9vzYHLwIEoQI99gLT9Q5L6YM27zijv8maMIRyUFxGOY1S4Rz6Eb2Tzl6zGIlHciHiMRgzOwyTgcwENSA";

  const base_login_url =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=95a95fe5-983f-45a4-90a8-36973e266001&response_type=code+id_token&redirect_uri=https://hybridcal.dev.sunyempire.edu/azure&scope=user.read+openid+profile+email&response_mode=form_post&state=12345&nonce=678910";

  const admin_calendar_login_link =
    " https://login.microsoftonline.com/50091132-5464-4f69-98c6-d089ea5e875c/oauth2/v2.0/authorize?client_id=70d8f531-ea37-4163-9a6c-c9993e9b741c&response_type=code+id_token&redirect_uri=https://admin.calendar.sunyempire.edu/azure&response_mode=form_post&scope=user.read+openid+profile+email&state=&nonce=678910";

  const base_login_url_oleg =
    "http://localhost:5173/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImltaTBZMnowZFlLeEJ0dEFxS19UdDVoWUJUayJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQxMDE2ODUzLCJuYmYiOjE3NDEwMTY4NTMsImV4cCI6MTc0MTAyMDc1MywiYWlvIjoiQVpRQWFcLzhaQUFBQWFTVXcyY2RnS2lFXC9LaEtsWDB6K2NYWWRFc1NYdjJsa0ZnNUhKVVY2UW5KU0VcL2pJeTNCajVBbDdORWc0XC9yOGRVKytlY2RiZXdxTXVRUDI1OGo4a0lTTUh5SDRudGdrdnpFWFNReVFMZWwzVWdMdURSUzQ4bkZXN0UrZHRTOStDVmJZU1wvQkR0QlJGdTJaVnF2enV4cmpOVjFxTTR0VW9OV1k1OHBhMXNzUjRqelNDVWJsZUtzOXc1VU1uXC8xU25LIiwiY19oYXNoIjoiS1ptZVllRWxNQU9pUTlPX2E4eC1oQSIsImVtYWlsIjoib2xlaC5reXJ5bGVua29Ac3VueWVtcGlyZS5lZHUiLCJuYW1lIjoiT2xlaCBLeXJ5bGVua28iLCJub25jZSI6IjY3ODkxMCIsIm9pZCI6IjljNjg4MGFlLTRmYjItNDJjMS05NjcxLWIzZTJiZGE1MTQ2MyIsInByZWZlcnJlZF91c2VybmFtZSI6Im9sZWgua3lyeWxlbmtvQHN1bnllbXBpcmUuZWR1IiwicmgiOiIxLkFUZ0FNaEVKVUdSVWFVLVl4dENKNmw2SFhPVmZxWlVfbUtSRmtLZzJsejRtWUFIMEFMVTRBQS4iLCJzaWQiOiIwMDJlNDNkOS0zM2ZiLTI1MTQtMGJlYi1hNjk5NWU4ZTkxYmMiLCJzdWIiOiJzcG1Eb1Jyd3poRW40M0FiNFo4b3c3YjdGSFBsdTR0LVVFc2VnTENLUk80IiwidGlkIjoiNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjIiwidXRpIjoia1FCWVBfeHI0RVdjR2g5QXZMOUdBQSIsInZlciI6IjIuMCIsInVpZCI6IjIifQ==.WeyqRSQohSfkffAlR-So0SDfqHLX6vFlfMbY5WviA8FVGUuOdYQRkGD5h_VKFxqAx15bvNGedOoVCJP8ZCF-cEok6jOEL8xrWkvrzGnT29wBZ9i3nP9qFOS2ZeH8t7rJhEtFtm-nf5CTUnGrwHXF8tDVQDoGhELCMdHZZ0L5rSyZmejI7Ge3IJJ6hYhwEW74GPcgcti8LnBkAyNsUC6eTz2MU28CeiQDfCucVZZnys03i1aJe4pMBomLKkGBEzyXAzKdaPIFIeCvV9cVNVhSzsSbumfiKFC4k67tK_RYpZGyrNy7pmT-8__XXGZzRYIajcpfj2dlReFUNvAkjKwplA";

  // href={
  //     "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=95a95fe5-983f-45a4-90a8-36973e266001&response_type=code+id_token&redirect_uri=https://hybridcal.dev.sunyempire.edu/azure&scope=user.read+openid+profile+email&response_mode=form_post&state=12345&nonce=678910"
  // }

  // const [currentToken, setCurrentToken] = useState("");

  // sessionStorage.setItem(
  //   "token",
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQxMzcyNjM5LCJuYmYiOjE3NDEzNzI2MzksImV4cCI6MTc0MTM3NjUzOSwiYWlvIjoiQVpRQWFcLzhaQUFBQWVSZUdmQ09DQWF4VWhoaWs0elN0aUY1bFhxaG85MkJsd0R2alwvRlZRSENmUERvWFRxTGw2YWpDV0NLejRFWXkyb1RjbmRXSGIwRDR3V281RWNcL3E2aDh4WU1VV0Q3SkU0d3ZQUXJsSHNcLzYyMXJcL29TcXRWdzlJMXFIMDNrMk9cL1daXC9LSkJ3YW1HaFBod01RWDBOalhLc3BOYmV6UTVENVlVeFl5cFQzT0pQMmlmU0piZkxjTzBXK0JKdmkra1puTiIsImNfaGFzaCI6IjdSaG1VSXVUdm9Tc2NnWGZPZzlNdmciLCJlbWFpbCI6Im9sZWgua3lyeWxlbmtvQHN1bnllbXBpcmUuZWR1IiwibmFtZSI6Ik9sZWggS3lyeWxlbmtvIiwibm9uY2UiOiI2Nzg5MTAiLCJvaWQiOiI5YzY4ODBhZS00ZmIyLTQyYzEtOTY3MS1iM2UyYmRhNTE0NjMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJvbGVoLmt5cnlsZW5rb0BzdW55ZW1waXJlLmVkdSIsInJoIjoiMS5BVGdBTWhFSlVHUlVhVS1ZeHRDSjZsNkhYT1ZmcVpVX21LUkZrS2cybHo0bVlBSDBBTFU0QUEuIiwic2lkIjoiMDAyZWUwMTktOWE0ZS02MDQzLTg0MTUtNzk4MjIxMGQxZjVmIiwic3ViIjoic3BtRG9Scnd6aEVuNDNBYjRaOG93N2I3RkhQbHU0dC1VRXNlZ0xDS1JPNCIsInRpZCI6IjUwMDkxMTMyLTU0NjQtNGY2OS05OGM2LWQwODllYTVlODc1YyIsInV0aSI6IjZfd2otdkRLcFUtcmhnVDgtQ0JCQUEiLCJ2ZXIiOiIyLjAiLCJ1aWQiOiIyIn0=.WUQTJJpxisiq13XQLvnQrtDbl0MVuhrMvjocgVtNnYn5Zwf-NkOfFkaTcI19EsUyNOdKdPi1vt4FDD9b1ADmet0tXoGp3DmULCmNIzxskf7Tvf54w7phk_wOQL9XlnQD4Gj7BkRIk-cdWoNZn_N1cWvOKsZfueq0eiefrFlspQNA1Q8CUfB0i_t-Ik3RkkdSe3hPRhB45KpjhQbRy76fu-oJu1farJjIXBfLbBOOZcrdBgSIXm-TfmX3EKJoaATKxxhDvDMVOp6PhQkZrRRJ4VL990V7n-jvDgDmawnaAfVEISTq-axnD_s0SBWrRR8gwjj17hX3wgkZmrkYGbybsg"
  // );

  const navigate = useNavigate();
  const ref = useRef(null);

  const handlerLogout = () => {
    sessionStorage.setItem("token", "");
    ref.current = "";
    setLogout(true);
  };

  useEffect(() => {
    const token = getTokenFromCurrentUrl();
    if (token) {
      onToken(token);
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
      onToken(ref.current);
      navigate("/");
    }
    if (!sessionStorage.getItem("token") && ref.current) {
      sessionStorage.setItem("token", ref.current);
    }
  }, []);

  const isUserInfo = isAddEvent && !logout;
  // const isUserInfo = true;

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
                  <button onClick={handlerLogout} type="button" className="button-header">
                    Log out
                  </button>
                  <a
                    className="button-header"
                    rel="noreferrer"
                    href="https://admin.calendar.sunyempire.edu/node/add/calendar_event"
                  >
                    Add event
                  </a>
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
