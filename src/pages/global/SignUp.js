import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../template/styles/main/img/logo.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showGender, setShowGender] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="sign section--bg" data-bg="img/section/section.jpg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form action="#" className="sign__form">
                <Link to="/" className="sign__logo">
                  <img src={logo} alt="" />
                </Link>
                <div className="sign__group">
                  <input
                    type="text"
                    className="sign__input"
                    placeholder="Name"
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="text"
                    className="sign__input"
                    placeholder="Phone number"
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="text"
                    className="sign__input"
                    placeholder="Email"
                  />
                </div>

                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Password"
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="sign__row">
                  <div className="sign__col mr-3">
                    <p className="sign__label">Birth Date</p>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                  <div className="sign__col">
                    <p className="sign__label">Gender</p>
                    <div
                      className={`sign-custom__select ${
                        showGender ? "show" : ""
                      }`}
                      onClick={() => setShowGender((prevState) => !prevState)}
                    >
                      <li>Please choose</li>
                      <ul className={`${showGender ? "show" : ""}`}>
                        <li>Male</li>
                        <li>Female</li>
                        <li>Others</li>
                      </ul>
                      <button className="sign__select-icon">
                        <i
                          className={`fas fa-chevron-${
                            showGender ? "up" : "down"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>

                <button className="sign__btn" type="button">
                  Sign up
                </button>

                <span className="sign__text">
                  Already have an account? <Link to="/signin">Sign in!</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
