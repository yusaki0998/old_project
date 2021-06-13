import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import logo from "../../template/styles/main/img/logo.svg";
import userImg from "../../template/styles/main/img/user.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="/" className="sidebar__logo">
        <img src={logo} alt="" />
      </a>
      <div className="sidebar__user">
        <div className="sidebar__user-img">
          <img src={userImg} alt="" />
        </div>

        <div className="sidebar__user-title">
          <span>Admin</span>
          <p>John Doe</p>
        </div>

        <button className="sidebar__user-btn" type="button">
          <i className="icon ion-ios-log-out"></i>
        </button>
      </div>
      <div className="sidebar__nav-wrap">
        <ul className="sidebar__nav">
          <li className="sidebar__nav-item">
            <Link
              to="/admin"
              className="sidebar__nav-link sidebar__nav-link--active"
            >
              <i className="icon ion-ios-keypad"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <Link to="/admin/catalog" className="sidebar__nav-link">
              <i className="icon ion-ios-film"></i> <span>Catalog</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <a
              className="sidebar__nav-link"
              data-toggle="collapse"
              href="#collapseMenu"
              role="button"
              aria-expanded="false"
              aria-controls="collapseMenu"
            >
              <i className="icon ion-ios-copy"></i> <span>Pages</span>{" "}
              <i className="icon ion-md-arrow-dropdown"></i>
            </a>

            <ul className="collapse sidebar__menu" id="collapseMenu">
              <li>
                <Link to="/admin/add-item">Add item</Link>
              </li>
              <li>
                <Link to="/edit-user/:uId">Edit user</Link>
              </li>
            </ul>
          </li>

          <li className="sidebar__nav-item">
            <Link to="/admin/users" className="sidebar__nav-link">
              <i className="icon ion-ios-contacts"></i> <span>Users</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <a href="comments.html" className="sidebar__nav-link">
              <i className="icon ion-ios-chatbubbles"></i>
              <span>Comments</span>
            </a>
          </li>

          <li className="sidebar__nav-item">
            <a href="reviews.html" className="sidebar__nav-link">
              <i className="icon ion-ios-star-half"></i>
              <span>Reviews</span>
            </a>
          </li>

          <li className="sidebar__nav-item">
            <a href="/" className="sidebar__nav-link">
              <i className="icon ion-ios-arrow-round-back"></i>
              <span>Back to HotFlix</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="sidebar__copyright">
        © HOTFLIX, 2019—2021. <br />
        Create by{" "}
        <a
          href="https://themeforest.net/user/dmitryvolkov/portfolio"
          target="_blank"
          rel="noreferrer"
        >
          Dmitry Volkov
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
