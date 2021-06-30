/** @format */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./../../template/styles/main/index.css";

const UnAuthLayout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  return <>{children}</>;
};

export default UnAuthLayout;
