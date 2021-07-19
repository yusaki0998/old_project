/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "./../../template/styles/main/index.css";

const UnAuthLayout = ({ children }) => {
  const { isAuthenticated, loginData } = useSelector((state) => state.auth);
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirectUrlField = query.get("redirectUrl");

  useEffect(() => {
    if (isAuthenticated) {
      if (redirectUrlField) {
        history.push(redirectUrlField);
      } else {
        if (loginData?.data?.role === "admin") {
          history.push("/admin/employees");
        }
        if (loginData?.data?.role === "manager") {
          history.push("/manager");
        }
        if (loginData?.data?.role === "staff") {
          history.push("/staff");
        }
        if (loginData?.data?.role === "customer") {
          history.push("/");
        }
      }
    }
  }, [isAuthenticated, history, loginData?.data?.role, redirectUrlField]);

  return <>{children}</>;
};

export default UnAuthLayout;
