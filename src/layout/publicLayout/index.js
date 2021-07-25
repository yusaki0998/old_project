/** @format */

import React from "react";
import "./../../template/styles/main/index.css";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="min-height-80vh">{children}</div>
      <Footer />
    </>
  );
};

export default PublicLayout;
