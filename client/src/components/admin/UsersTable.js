import React from "react";
import { Link } from "react-router-dom";
import userImg from "../../template/styles/main/img/user.svg";

const UsersTable = () => {
  return (
    <>
      <div className="col-12">
        <div className="main__table-wrap">
          <table className="main__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>BASIC INFO</th>
                <th>USERNAME</th>
                <th>PRICING PLAN</th>
                <th>COMMENTS</th>
                <th>REVIEWS</th>
                <th>STATUS</th>
                <th>CRAETED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="main__table-text">23</div>
                </td>
                <td>
                  <div className="main__user">
                    <div className="main__avatar">
                      <img src={userImg} alt="" />
                    </div>
                    <div className="main__meta">
                      <h3>John Doe</h3>
                      <span>email@email.com</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="main__table-text">Username</div>
                </td>
                <td>
                  <div className="main__table-text">Premium</div>
                </td>
                <td>
                  <div className="main__table-text">13</div>
                </td>
                <td>
                  <div className="main__table-text">1</div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--green">
                    Approved
                  </div>
                </td>
                <td>
                  <div className="main__table-text">24 Oct 2021</div>
                </td>
                <td>
                  <div className="main__table-btns">
                    <a
                      href="#modal-status"
                      className="main__table-btn main__table-btn--banned open-modal"
                    >
                      <i className="icon ion-ios-lock"></i>
                    </a>
                    <Link
                      to="/admin/edit-user/:uId"
                      className="main__table-btn main__table-btn--edit"
                    >
                      <i className="icon ion-ios-create"></i>
                    </Link>
                    <a
                      href="#modal-delete"
                      className="main__table-btn main__table-btn--delete open-modal"
                    >
                      <i className="icon ion-ios-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UsersTable;
