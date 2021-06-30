import React from "react";
import "./../../template/styles/main/index.css";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
