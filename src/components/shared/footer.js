/** @format */

import React from "react";
import "../../template/styles/main/index.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer__content">
              <Link to="/" className="footer__logo">
                <img src={logo} alt="HotFlix logo" />
              </Link>
              <span className="footer__copyright">© HOTFLIX, 2019—2021</span>

              <nav className="footer__nav">
                <Link to="/about">Về chúng tôi</Link>
                <Link to="/contacts">Liên hệ</Link>
                <Link to="/privacy">Chính sách & Điều khoản</Link>
              </nav>

              <button className="footer__back" type="button">
                <i className="icon ion-ios-arrow-round-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
