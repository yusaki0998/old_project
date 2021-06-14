/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import logo from "../../template/styles/main/img/logo.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  convertGenderToVietnamese,
  convertRoleToVietnamese,
} from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import { updateAccountInfo } from "../../store/actions/adminActions";
import { useHistory, useLocation } from "react-router-dom";
import { getAccountDetailRequest } from "../../store/api/admin";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { checkCondition } from "../../utils/helper";

const EditAccountInfo = () => {
  const { search } = useLocation();
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("");
  const [showGender, setShowGender] = useState(false);
  const [role, setRole] = useState("");
  const [showRole, setShowRole] = useState(false);
  const { updateAccount: updateAccountData } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetailData, setUserDetailData] = useState({});

  const query = new URLSearchParams(search);
  const userIdField = query.get("uId");
  const roleField = query.get("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!userIdField || !roleField) {
      history.goBack();
    } else {
      setIsLoading(true);
      getAccountDetailRequest(userIdField, roleField)
        .then(({ data }) => {
          setUserDetailData(data?.data);
          setDob(new Date(data?.data?.dob));
          setGender(data?.data?.gender);
          setRole(data?.data?.role);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
          history.goBack();
        });
    }
  }, [history, userIdField, roleField]);

  const onValid = (data) => {
    dispatch(
      updateAccountInfo(userDetailData?._id, { ...data, role, gender, dob })
    );
  };

  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__create-account__wrapper text-white">
              <img src={logo} alt="Hotflix" className="d-block mx-auto my-4" />
              {isLoading && <LoadingSpinner />}
              {!isLoading && userDetailData?.fullname && (
                <form onSubmit={handleSubmit(onValid)}>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Họ và tên</p>
                    </div>
                    <div className="col-md-8">
                      <div className="sign__group">
                        <input
                          type="text"
                          defaultValue={checkCondition(
                            userDetailData?.fullname,
                            userDetailData?.fullname,
                            ""
                          )}
                          className={`sign__input ${checkCondition(
                            errors.fullname,
                            "input-error",
                            ""
                          )}`}
                          {...register("fullname", {
                            required: {
                              value: true,
                              message: "This is required field",
                            },
                          })}
                        />
                        {errors.fullname && (
                          <p className="input-required">
                            {errors.fullname.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Email</p>
                    </div>
                    <div className="col-md-8">
                      <div className="sign__group">
                        <input
                          type="text"
                          defaultValue={checkCondition(
                            userDetailData?.email,
                            userDetailData?.email,
                            ""
                          )}
                          className={`sign__input ${checkCondition(
                            errors.email,
                            "input-error",
                            ""
                          )}`}
                          {...register("email", {
                            required: {
                              value: true,
                              message: "This is required field",
                            },
                          })}
                        />
                        {errors.email && (
                          <p className="input-required">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Mật khẩu</p>
                    </div>
                    <div className="col-md-8">
                      <div className="sign__group">
                        <input
                          type="password"
                          className="sign__input"
                          {...register("password")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Ngày sinh</p>
                    </div>
                    <div className="col-md-8">
                      <div className="sign__group">
                        <DatePicker
                          selected={dob}
                          onChange={(date) => setDob(date)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Số điện thoại</p>
                    </div>
                    <div className="col-md-8">
                      <div className="sign__group">
                        <input
                          type="text"
                          defaultValue={checkCondition(
                            userDetailData?.phone,
                            userDetailData?.phone,
                            ""
                          )}
                          className={`sign__input ${checkCondition(
                            errors.phone,
                            "input-error",
                            ""
                          )}`}
                          {...register("phone", {
                            required: {
                              value: true,
                              message: "This is required field",
                            },
                          })}
                        />
                        {errors.phone && (
                          <p className="input-required">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-md-4">
                      <p>Giới tính</p>
                    </div>
                    <div className="col-md-8">
                      <div
                        className={`sign-custom__select ${checkCondition(
                          showGender,
                          "show",
                          ""
                        )}`}
                        onClick={() => setShowGender((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {checkCondition(
                            gender,
                            convertGenderToVietnamese(gender),
                            "Vui lòng chọn"
                          )}
                        </li>
                        <ul
                          className={`${checkCondition(
                            showGender,
                            "show",
                            ""
                          )}`}
                        >
                          <li onClick={() => setGender("male")}>Nam</li>
                          <li onClick={() => setGender("female")}>Nữ</li>
                          <li onClick={() => setGender("other")}>Khác</li>
                        </ul>
                        <button className="sign__select-icon">
                          <i
                            className={`fas fa-chevron-${checkCondition(
                              showGender,
                              "up",
                              "down"
                            )}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <p>Chức vụ</p>
                    </div>
                    <div className="col-md-8">
                      <div
                        className={`sign-custom__select ${checkCondition(
                          showRole,
                          "show",
                          ""
                        )}`}
                        onClick={() => setShowRole((prevState) => !prevState)}
                      >
                        <li className="gender__text">
                          {checkCondition(
                            role,
                            convertRoleToVietnamese(role),
                            "Vui lòng chọn"
                          )}
                        </li>
                        <ul
                          className={`${checkCondition(showRole, "show", "")}`}
                        >
                          <li onClick={() => setRole("manager")}>Quản lý</li>
                          <li onClick={() => setRole("staff")}>Nhân viên</li>
                        </ul>
                        <button className="sign__select-icon">
                          <i
                            className={`fas fa-chevron-${checkCondition(
                              showRole,
                              "up",
                              "down"
                            )}`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn__outline-orange mx-auto my-4 ${checkCondition(
                      updateAccountData.isLoading,
                      "divDisable",
                      ""
                    )}`}
                    type="submit"
                  >
                    {checkCondition(
                      updateAccountData.isLoading,
                      "Đang cập nhật",
                      "Cập nhật"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditAccountInfo;
