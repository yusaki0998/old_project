/** @format */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { checkCondition } from "../../utils/helper";

const Menu = () => {
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);
  const fromField = query.get("from");

  return (
    <ul className="nav nav-tabs content__tabs d-flex">
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/current") ||
              pathname === "/manager" ||
              fromField === "current",
            "active",
            ""
          )}`}
          to="/manager/current"
        >
          Phim đang chiếu
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/coming") || fromField === "coming",
            "active",
            ""
          )}`}
          to="/manager/coming"
        >
          Phim sắp chiếu
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/revenue"),
            "active",
            ""
          )}`}
          to="/manager/revenue"
        >
          Doanh thu
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/room") ||
              pathname.includes("/new-room") ||
              pathname.includes("/edit-room"),
            "active",
            ""
          )}`}
          to="/manager/room"
        >
          Phòng chiếu
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/calendar"),
            "active",
            ""
          )}`}
          to="/manager/calendar"
        >
          Lịch chiếu
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${checkCondition(
            pathname.includes("/slot"),
            "active",
            ""
          )}`}
          to="/manager/slot"
        >
          Slot chiếu
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
