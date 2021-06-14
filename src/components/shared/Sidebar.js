import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import logo from "../../template/styles/main/img/logo.svg";
import userImg from "../../template/styles/main/img/user.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Sidebar = ({ userInfo }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className="sidebar">
      <a href="/" className="sidebar__logo">
        <img src={logo} alt="Hotflix logo" />
      </a>
      <div className="sidebar__user">
        <div className="sidebar__user-img">
          <img src={userImg} alt={userInfo?.fullname} />
        </div>

        <div className="sidebar__user-title">
          <span>Admin</span>
          <p>{userInfo?.fullname}</p>
        </div>

        <button
          className="sidebar__user-btn"
          type="button"
          onClick={() => {
            dispatch(logout());
            history.push("/");
          }}
        >
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
              <i className="icon ion-ios-copy"></i> <span>Pages</span>
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
            <Link
              to="/admin/users"
              className={`sidebar__nav-link ${
                pathname.includes("/users") ? "sidebar__nav-link--active" : ""
              }`}
            >
              <i className="icon ion-ios-contacts"></i> <span>Users</span>
            </Link>
          </li>

          <li className="sidebar__nav-item">
            <a href="/admin/comments" className="sidebar__nav-link">
              <i className="icon ion-ios-chatbubbles"></i>
              <span>Comments</span>
            </a>
          </li>

          <li className="sidebar__nav-item">
            <a href="/admin/reviews" className="sidebar__nav-link">
              <i className="icon ion-ios-star-half"></i>
              <span>Reviews</span>
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
