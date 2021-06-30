import React from "react";
import userImg from "../../../template/styles/main/img/user.svg";

const ProfileNav = () => {
  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="profile__content">
              <div className="profile__user">
                <div className="profile__avatar">
                  <img src={userImg} alt="user name" />
                </div>
                <div className="profile__meta">
                  <h3>John Doe</h3>
                  <span>HOTFLIX ID: 78123</span>
                </div>
              </div>

              <ul
                className="nav nav-tabs content__tabs content__tabs--profile"
                id="content__tabs"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tab-1"
                    role="tab"
                    aria-controls="tab-1"
                    aria-selected="true"
                  >
                    Profile
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-2"
                    role="tab"
                    aria-controls="tab-2"
                    aria-selected="false"
                  >
                    Subscription
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#tab-3"
                    role="tab"
                    aria-controls="tab-3"
                    aria-selected="false"
                  >
                    Settings
                  </a>
                </li>
              </ul>
              <div
                className="content__mobile-tabs content__mobile-tabs--profile"
                id="content__mobile-tabs"
              >
                {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
                <div
                  className="content__mobile-tabs-btn dropdown-toggle"
                  role="navigation"
                  id="mobile-tabs"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <input type="button" value="Profile" />
                  <span></span>
                </div>

                <div
                  className="content__mobile-tabs-menu dropdown-menu"
                  aria-labelledby="mobile-tabs"
                >
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="1-tab"
                        data-toggle="tab"
                        href="#tab-1"
                        role="tab"
                        aria-controls="tab-1"
                        aria-selected="true"
                      >
                        Profile
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="2-tab"
                        data-toggle="tab"
                        href="#tab-2"
                        role="tab"
                        aria-controls="tab-2"
                        aria-selected="false"
                      >
                        Subscription
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="3-tab"
                        data-toggle="tab"
                        href="#tab-3"
                        role="tab"
                        aria-controls="tab-3"
                        aria-selected="false"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <button className="profile__logout" type="button">
                <i className="icon ion-ios-log-out"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
