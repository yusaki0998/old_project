/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import userImg from "../../template/styles/main/img/user.svg";
import { PROD_REST_API_IMG_URL } from "../../utils/constants";
import { convertGenderToVietnamese } from "../../utils/convertGender";

const Profile = () => {
  const { loginData } = useSelector((state) => state.auth);
  const history = useHistory();
  return (
    <div className="customer__profile-wrapper my-5">
      <div className="d-flex align-items-center">
        <div className="mr-4">
          <div className="">
            <img
              className="d-block my-3 user__img-wrapper"
              src={
                loginData?.data?.avatar
                  ? `${PROD_REST_API_IMG_URL}${loginData?.data?.avatar?.replace(
                      "../uploads",
                      ""
                    )}`
                  : userImg
              }
              alt={loginData?.data?.fullname || ""}
            />
          </div>
          <button
            onClick={() => history.push("/customer/edit-info")}
            className="btn__outline-orange"
          >
            Thay đổi
          </button>
        </div>
        <div>
          <strong>Xin chào {loginData?.data?.fullname} </strong>
          <p>
            Với trang này, bạn sẽ quản lý được tất cả thông tin cá nhân của mình
          </p>
        </div>
      </div>
      <div className="info__detail mt-3">
        <p className="border__bottom-white mt-3 d-inline-block">
          <strong>Thông tin tài khoản</strong>
        </p>
        <div className="info__row">
          <p className="label">Tên</p>
          <p>{loginData?.data?.fullname}</p>
        </div>
        <div className="info__row">
          <p className="label">Ngày sinh</p>
          <p>{loginData?.data?.dob?.substr(0, 10)}</p>
        </div>
        <div className="info__row">
          <p className="label">Email</p>
          <p>{loginData?.data?.email}</p>
        </div>
        <div className="info__row">
          <p className="label">Số điện thoại</p>
          <p>{loginData?.data?.phone}</p>
        </div>
        <div className="info__row">
          <p className="label">Giới tính</p>
          <p>{convertGenderToVietnamese(loginData?.data?.gender)}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
