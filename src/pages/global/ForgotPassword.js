import React from "react";
import { Link } from "react-router-dom";
import logo from "../../template/styles/main/img/logo.svg";
import section from "../../template/styles/main/img/section/section.jpg";

const ForgotPassword = () => {
  return (
    <div className="sign section--bg" data-bg={section}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form action="#" className="sign__form">
                <a href="/" className="sign__logo">
                  <img src={logo} alt="" />
                </a>

                <div className="sign__group">
                  <input
                    type="text"
                    className="sign__input"
                    placeholder="Email"
                  />
                </div>

                <div className="sign__group sign__group--checkbox">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    // checked="checked"
                  />
                  <label htmlFor="remember">
                    I agree to the <Link to="/privacy">Privacy Policy</Link>
                  </label>
                </div>

                <button className="sign__btn" type="button">
                  Send
                </button>

                <span className="sign__text">
                  We will send a password to your Email
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
