/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo from "../../template/styles/main/img/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../../store/actions/authActions";
import OutsideHandler from "../../components/shared/ClickWrapper";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showGender, setShowGender] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const { signUp } = useSelector((state) => state.auth);
  const history = useHistory();

  const onValid = (data) => {
    dispatch(
      signup(
        {
          ...data,
          dob,
          gender,
        },
        history
      )
    );
  };

  return (
    <div className="sign">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form onSubmit={handleSubmit(onValid)} className="sign__form">
                <Link to="/" className="sign__logo">
                  <img src={logo} alt="Hotflix" />
                </Link>
                <div className="sign__group">
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.fullname ? "input-error" : ""
                    }`}
                    placeholder="Name"
                    {...register("fullname", {
                      required: {
                        value: true,
                        message: "This is required field",
                      },
                    })}
                  />
                  {errors.fullname && (
                    <p className="input-required">{errors.fullname.message}</p>
                  )}
                </div>
                <div className="sign__group">
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.phone ? "input-error" : ""
                    }`}
                    placeholder="Phone number"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "This is required field",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="input-required">{errors.phone.message}</p>
                  )}
                </div>
                <div className="sign__group">
                  <input
                    type="text"
                    className={`sign__input ${
                      errors.email ? "input-error" : ""
                    }`}
                    placeholder="Email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "This is required field",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="input-required">{errors.email.message}</p>
                  )}
                </div>

                <div className="sign__group">
                  <input
                    type="password"
                    className={`sign__input ${
                      errors.password ? "input-error" : ""
                    }`}
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This is required field",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="input-required">{errors.password.message}</p>
                  )}
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className={`sign__input ${
                      errors.retype ? "input-error" : ""
                    }`}
                    placeholder="Confirm Password"
                    {...register("retype", {
                      required: {
                        value: true,
                        message: "This is required field",
                      },
                      validate: (value) =>
                        watch("password") === value ||
                        "Password confirm must matched",
                    })}
                  />
                  {errors.retype && (
                    <p className="input-required">{errors.retype.message}</p>
                  )}
                </div>
                <div className="sign__row mb-3">
                  <div className="sign__col mr-3">
                    <p className="sign__label">Birth Date</p>
                    <DatePicker
                      selected={dob}
                      onChange={(date) => setDob(date)}
                    />
                  </div>
                  <div className="sign__col">
                    <p className="sign__label">Gender</p>
                    <OutsideHandler callback={() => setShowGender(false)}>
                      <div
                        className={`sign-custom__select ${
                          showGender ? "show" : ""
                        }`}
                        onClick={() => setShowGender((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {gender ? gender : "Please choose"}
                        </li>
                        <ul className={`${showGender ? "show" : ""}`}>
                          <li onClick={() => setGender("male")}>Male</li>
                          <li onClick={() => setGender("female")}>Female</li>
                          <li onClick={() => setGender("other")}>Other</li>
                        </ul>
                        <button className="sign__select-icon">
                          <i
                            className={`fas fa-chevron-${
                              showGender ? "up" : "down"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </OutsideHandler>
                  </div>
                </div>

                <button
                  className={`sign__btn ${
                    signUp.isLoading ? "divDisable" : ""
                  }`}
                  type="submit"
                >
                  {signUp.isLoading ? "Signing up" : "Sign up"}
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
