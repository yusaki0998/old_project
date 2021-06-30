/** @format */

import React from "react";
import { Link, useLocation } from "react-router-dom";

const CustomerNavMenu = () => {
  const { pathname } = useLocation();
  return (
    <div className="container customer__nav-menu">
      <h1 className="text-center text-white">Tài khoản khách hàng</h1>
      <ul>
        <li>
          <Link
            to="/customer/info"
            className={`${pathname.includes("/info") ? "active" : ""}`}
          >
            Thông tin
          </Link>
        </li>
        <li>
          <Link
            to="/customer/edit-info"
            className={`${pathname.includes("/edit-info") ? "active" : ""}`}
          >
            Đổi thông tin
          </Link>
        </li>
        <li>
          <Link
            to="/customer/edit-password"
            className={`${pathname.includes("/edit-password") ? "active" : ""}`}
          >
            Đổi mật khẩu
          </Link>
        </li>
        <li>
          <Link
            to="/customer/history-transactions"
            className={`${
              pathname.includes("/history-transactions") ? "active" : ""
            }`}
          >
            Lịch sử giao dịch
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerNavMenu;
