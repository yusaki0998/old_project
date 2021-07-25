/** @format */

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  convertGenderToVietnamese,
  convertRoleToVietnamese,
} from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUpdateAccountState,
  updateAccountInfo,
} from "../../store/actions/adminActions";
import { useHistory, useLocation } from "react-router-dom";
import { getAccountDetailRequest } from "../../store/api/admin";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { checkCondition, getBirhDate } from "../../utils/helper";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { Helmet } from "react-helmet";

const EditAccountInfo = () => {
  const { search } = useLocation();
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

  useEffect(() => {
    if (updateAccountData.success) {
      history.push(
        `/admin/${roleField === "manager" ? "managers" : "employees"}`
      );
      dispatch(resetUpdateAccountState());
    }
  }, [history, updateAccountData.success, roleField, dispatch]);

  const optionListMarkup = (startNum, endNum) => {
    const options = [];
    // eslint-disable-next-line no-plusplus
    for (let i = startNum; i <= endNum; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const onValid = (data) => {
    const dob = `${data.birthMonth}/${data.birthDay}/${data.birthYear}`;
    delete data.birthMonth;
    delete data.birthDay;
    delete data.birthYear;
    dispatch(
      updateAccountInfo(userDetailData?._id, { ...data, role, gender, dob })
    );
  };

  return (
    <main className="main">
      <Helmet>
        <title> Chỉnh sửa tài khoản </title>
      </Helmet>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__create-account__wrapper text-white">
              <h2 className="text-center my-4">Thay đổi thông tin</h2>
              {isLoading && <LoadingSpinner />}
              {!isLoading && userDetailData?.fullname && (
                <form onSubmit={handleSubmit(onValid)}>
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <p>Họ và tên</p>
                    </div>
                    <div className="col-md-10">
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
                              message: "Đây là mục bắt buộc",
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
                    <div className="col-md-2">
                      <p>Email</p>
                    </div>
                    <div className="col-md-10">
                      <div className="sign__group divDisable">
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
                              message: "Đây là mục bắt buộc",
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
                    <div className="col-md-2">
                      <p>Ngày sinh</p>
                    </div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-4">
                          <label htmlFor="birthYear">Năm</label>
                          <div className="sign__group">
                            <select
                              className="sign__input"
                              {...register("birthYear", {
                                required: {
                                  value: true,
                                  message: "Đây là mục bắt buộc",
                                },
                              })}
                              defaultValue={checkCondition(
                                userDetailData?.dob,
                                getBirhDate(userDetailData?.dob)[0],
                                ""
                              )}
                            >
                              {optionListMarkup(1910, 2025)}
                            </select>
                          </div>
                        </div>
                        <div className="col-4">
                          <label htmlFor="birthMonth">Tháng</label>
                          <div className="sign__group">
                            <select
                              className="sign__input"
                              {...register("birthMonth", {
                                required: {
                                  value: true,
                                  message: "Đây là mục bắt buộc",
                                },
                              })}
                              defaultValue={checkCondition(
                                userDetailData?.dob,
                                getBirhDate(userDetailData?.dob)[1],
                                ""
                              )}
                            >
                              {optionListMarkup(1, 12)}
                            </select>
                          </div>
                        </div>
                        <div className="col-4">
                          <label htmlFor="birthDay">Ngày</label>
                          <div className="sign__group">
                            <select
                              className="sign__input"
                              {...register("birthDay", {
                                required: {
                                  value: true,
                                  message: "Đây là mục bắt buộc",
                                },
                              })}
                              defaultValue={checkCondition(
                                userDetailData?.dob,
                                getBirhDate(userDetailData?.dob)[2],
                                ""
                              )}
                            >
                              {optionListMarkup(1, 31)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <p>Số điện thoại</p>
                    </div>
                    <div className="col-md-10">
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
                              message: "Đây là mục bắt buộc",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "Vui lòng nhập chữ số",
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
                    <div className="col-md-2">
                      <p>Giới tính</p>
                    </div>
                    <div className="col-md-10">
                      <OutsideHandler callback={() => setShowGender(false)}>
                        <div
                          className={`mw-50 sign-custom__select ${checkCondition(
                            showGender,
                            "show",
                            ""
                          )}`}
                          onClick={() =>
                            setShowGender((prevState) => !prevState)
                          }
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
                      </OutsideHandler>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <p>Chức vụ</p>
                    </div>
                    <div className="col-md-10">
                      <OutsideHandler callback={() => setShowRole(false)}>
                        <div
                          className={`mw-50 sign-custom__select ${checkCondition(
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
                            className={`${checkCondition(
                              showRole,
                              "show",
                              ""
                            )}`}
                            style={{
                              height: 95,
                            }}
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
                      </OutsideHandler>
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
              <div className="back__btn">
                {!isLoading && (
                  <button
                    className={`btn__outline-orange mb-4`}
                    onClick={() =>
                      history.push(
                        `/admin/${
                          roleField === "manager" ? "managers" : "employees"
                        }`
                      )
                    }
                  >
                    <i className="fas fa-chevron-left mr-2"></i> Quay lại danh
                    sách
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditAccountInfo;
