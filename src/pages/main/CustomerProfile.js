import React from "react";
import ProfileHeader from "../../components/main/profile/ProfileHeader";
import Partners from "../../components/shared/Partners";
import ProfileNav from "../../components/main/profile/ProfileNav";
import Subcription from "../../components/main/profile/Subcription";
import Settings from "../../components/main/profile/Settings";
import Stats from "../../components/main/profile/Stats";

const CustomerProfile = () => {
  return (
    <>
      <ProfileHeader />
      <div className="content content--profile">
        <ProfileNav />
        <div className="container">
          <div className="tab-content">
            <Stats />
            <Subcription />
            <Settings />
          </div>
        </div>
      </div>
      <Partners />
    </>
  );
};

export default CustomerProfile;
