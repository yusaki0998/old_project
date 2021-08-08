/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { convertGenderToVietnamese } from "../../utils/convertGender";

const Profile = () => {
  const { loginData } = useSelector((state) => state.auth);
  return (
    <div className="customer__profile-wrapper my-5">
      <Helmet>
        <title> Thông tin cá nhân </title>
      </Helmet>
      <div className="col-md-8 col-lg-6 mx-auto col-sm-10 col-12">
        <div className="d-flex align-items-center">
          <div>
            <strong>Xin chào {loginData?.data?.fullname} </strong>
            <p>
              Với trang này, bạn sẽ quản lý được tất cả thông tin cá nhân của
              mình
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
    </div>
  );
};

export default Profile;
