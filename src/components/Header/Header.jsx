import React from "react";
import logo from "./images/logo.png";
import "./Header.scss";
import Container from "../Container/Container";

const Header = ({isLogin = false, isAddEvent = false, currentUser}) => {


    const token_oleg = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImltaTBZMnowZFlLeEJ0dEFxS19UdDVoWUJUayJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQwNjcyMDM2LCJuYmYiOjE3NDA2NzIwMzYsImV4cCI6MTc0MDY3NTkzNiwiYWlvIjoiQVpRQWFcLzhaQUFBQXFkcGdBMm1EXC80VmpaOVdOYlRENHNObUxnTFRnaDdaWHUwemN4OVRjS0NUeEpuK2FsYXZHZForM0JZaW1vNTZBTDBHVXpra01DYzNyeVk5T2xpYXBWMnNZUnV0dk9jRUJrRDNqRU1IY0t1dUlsQTdKUHdFSmNHOUxVMk5FbTVvNGpVZkNuV1NZVTBhRzlZckg0dWk4RUpCbG93dHRnc0p3OUJpTWhIK2lYQnlNV2NjVWZTOXpPN2R3d29MSHNXWWsiLCJjX2hhc2giOiJKX2FXVnI2Ui12Q3I5ZEZhenhkQkV3IiwiZW1haWwiOiJvbGVoLmt5cnlsZW5rb0BzdW55ZW1waXJlLmVkdSIsIm5hbWUiOiJPbGVoIEt5cnlsZW5rbyIsIm5vbmNlIjoiNjc4OTEwIiwib2lkIjoiOWM2ODgwYWUtNGZiMi00MmMxLTk2NzEtYjNlMmJkYTUxNDYzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoib2xlaC5reXJ5bGVua29Ac3VueWVtcGlyZS5lZHUiLCJyaCI6IjEuQVRnQU1oRUpVR1JVYVUtWXh0Q0o2bDZIWE9WZnFaVV9tS1JGa0tnMmx6NG1ZQUgwQUxVNEFBLiIsInNpZCI6IjAwMjJhYjE5LTY5ZDgtNTQ5MC03ZTdiLTNmMGY1YzVhMGI0NCIsInN1YiI6InNwbURvUnJ3emhFbjQzQWI0WjhvdzdiN0ZIUGx1NHQtVUVzZWdMQ0tSTzQiLCJ0aWQiOiI1MDA5MTEzMi01NDY0LTRmNjktOThjNi1kMDg5ZWE1ZTg3NWMiLCJ1dGkiOiJrTEdsZEJqdnFreTR3NlNyOVprLUFBIiwidmVyIjoiMi4wIiwidWlkIjoiMiJ9.Szi2kaloOMVUqxI9okqNc0thVM1nBFjWkyrNS8xrUggIsmrGN6LYbLMUKTwtbdLgdNEAttNY9vYc21_Y8DQVIwdqvj-h7sKCQKOtXfz6OtPlZTzBfGDWKKLwlzzplPKZgtA0ASitoXi8zlaqVsC25heVXsJCbQsaRxRTc67vZX4IOJWUXj1id_o4BedOZbmMD7gEztZEM7FzcQcoHSue7DKeXUY_7qoyc2WBN8QT1TvvkjsC56rY7v2iU8jfuYKX7Qv7mBN70szGjcbxVTxyMNU2gvBtYHfvJr2SByGbX_bAW-lG1cXV5FMqBxtPi6_f9AEbJ5Suv1QIMLu3kkp41Q"
    const token_jeremy = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImltaTBZMnowZFlLeEJ0dEFxS19UdDVoWUJUayJ9.eyJhdWQiOiI5NWE5NWZlNS05ODNmLTQ1YTQtOTBhOC0zNjk3M2UyNjYwMDEiLCJpc3MiOiJodHRwczpcL1wvbG9naW4ubWljcm9zb2Z0b25saW5lLmNvbVwvNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjXC92Mi4wIiwiaWF0IjoxNzQwNTkyOTM2LCJuYmYiOjE3NDA1OTI5MzYsImV4cCI6MTc0MDU5NjgzNiwiYWlvIjoiQVdRQW1cLzhaQUFBQWFoMEhuVmtQVDNjU1lPXC9kN0NmUFJhaHJCUmd2NGVNdGQxaVJcLzlVNk1YSzRPbHBzQVNiaWRnXC81UEFSbWkwUVIyRUlmRFZiWDY1dzJZRVRyVUNQVGQ1N2pFcXRHSjErRzFlNFAwSW4ycWhTZU9mOEJQRklBSjdjZkJESEtHcGxUIiwiY19oYXNoIjoiMklmU1ktMGFmbFgyM0VSNjcxSF9jdyIsImVtYWlsIjoiamVyZW15LnN0b25lQHN1bnllbXBpcmUuZWR1IiwibmFtZSI6IkplcmVteSBTdG9uZSIsIm5vbmNlIjoiNjc4OTEwIiwib2lkIjoiNmJjMzkzZmEtMjRhNS00ZGVlLWE2MGEtNTdlMjhmYjQzYWFkIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiamVyZW15LnN0b25lQHN1bnllbXBpcmUuZWR1IiwicmgiOiIxLkFUZ0FNaEVKVUdSVWFVLVl4dENKNmw2SFhPVmZxWlVfbUtSRmtLZzJsejRtWUFIMEFKVTRBQS4iLCJzaWQiOiIwMDIyNWNmOS1hZGU3LTM2ODgtOGYyNy03NmE3YTBmZTEwY2EiLCJzdWIiOiJNYUsxalFVTVVzdmgxYVRGWTJfUlktQnAzVnltQUZ3aENLR2tQazNRWTJNIiwidGlkIjoiNTAwOTExMzItNTQ2NC00ZjY5LTk4YzYtZDA4OWVhNWU4NzVjIiwidXRpIjoiRWVRSDVYNDJFRW02Ui1kMGszWmNBQSIsInZlciI6IjIuMCIsInVpZCI6IjEifQ==.qzVi90XiLkCSiw00n58VLAnkdwSswxD2Se-Z5XR-UgA9m6-FVqxiaMORICN9G7yFkRAuk0gaOFcURG6CQFP7EvfFVx5KsyIs4iC_BwQ0iplQ8dmOTSbTWmGL-wetDm2VFfi3xGTvHtdWmDpn0VcHt91Zx-f1vTiKOJ-ysxKhwCDjm4ImHd2Yp7fquZ8bnkb69YG4L6ccUc0Xsz10-bVlfmV2eGcVIP6h90sYznaWeFyjWUxrCN6Ku5WP6OlcHQkAPYvXlM9vzYHLwIEoQI99gLT9Q5L6YM27zijv8maMIRyUFxGOY1S4Rz6Eb2Tzl6zGIlHciHiMRgzOwyTgcwENSA"


    return (
        <header className="header">
            <Container>
                <div className="header-wrapper">
                    <div className="header-logo">
                        <a href="/">
                            <img className="logo" src={logo} alt="logo"/>
                        </a>
                    </div>
                    <div className="header-right">
                        {isLogin && (
                            <a className="button-header" href={`/?token=${token_oleg}`}>
                                login
                            </a>
                        )}
                        {isAddEvent && (
                            <div className="header-info">
                                <div className="header-user">
                                    <p>{currentUser.name}</p>
                                </div>
                                <div className="header-actions">
                                    <button className="button-header">Log out</button>
                                    <a className="button-header" target="_blank" rel="noreferrer"
                                       href="https://hybridcal.dev.sunyempire.edu/node/add/calendar_event">Add event</a>
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
