import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <section
      className="section section--first section--bg"
      data-bg="img/section/section.jpg"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__wrap">
              <h2 className="section__title">My HotFlix</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb__item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb__item breadcrumb__item--active">
                  Profile
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
