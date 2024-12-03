import React from "react";

import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <img
          className="footer__logo"
          src="https://sunyempire.edu/media/images/brand-standards/ESC-Logo-Stacked-Orange-White-Letters.png"
          alt=""
        />
        <div className="row">
          <div className="col-sm-12">
            <div className="address">
              <p>
                2 Union Avenue
                <br />
                Saratoga Springs, NY 12866
              </p>
              <span>1-800-847-3000</span>
            </div>
          </div>
        </div>
        <div className="row footer-column">
          <div className="col-lg-6">
            <div>
              <a className="footer-column__link" href="">
                Give
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Safety & Security
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                IT Service Desk
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Facilities & Maintenance
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Title IX
              </a>
            </div>
          </div>
          <div className="col-lg-6 ">
            <div>
              <a className="footer-column__link" href="">
                Give
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Safety & Security
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                IT Service Desk
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Facilities & Maintenance
              </a>
            </div>
            <div>
              <a className="footer-column__link" href="">
                Title IX
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="footer-icon-links">
              <span className="footer-social-icon">
                <a href="https://www.facebook.com/SUNYEmpire">
                  <img
                    src="https://sunyempire.edu/media/images/home/2019/iconmonstr-facebook-6.png"
                    alt="Facebook icon"
                  />
                </a>
              </span>
              <span className="footer-social-icon">
                <a href="https://www.sunyempire.edu/youtube">
                  <img
                    src="https://sunyempire.edu/media/images/home/2019/iconmonstr-youtube-6.png"
                    alt="Youtube Icon"
                  />
                </a>
              </span>
              <span className="footer-social-icon">
                <a href="https://www.sunyempire.edu/linkedin">
                  <img
                    src="https://sunyempire.edu/media/images/home/2019/iconmonstr-linkedin-3.png"
                    alt="LinkedIn Icon"
                    // style="width: 34px; height: 34px;"
                  />
                </a>
              </span>
              <span className="footer-social-icon">
                <a href="https://www.instagram.com/sunyempire/">
                  <img
                    src="https://sunyempire.edu/media/images/home/2019/iconmonstr-instagram-11.png"
                    alt="Instagram Icon"
                  />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="footer__copyright">
              © 2024 Empire State University
              <br />
              The Torch logo is a trademark of Empire State University.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
