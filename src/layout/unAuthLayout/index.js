/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./../../template/styles/main/index.css";

const UnAuthLayout = ({ children }) => {
  const { isAuthenticated, loginData } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
      if (loginData?.data?.role === "admin") {
        history.push("/admin");
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
  }, [isAuthenticated, history, loginData?.data?.role]);

  return <>{children}</>;
};

export default UnAuthLayout;
