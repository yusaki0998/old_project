import React from "react";
import Paginator from "../../components/shared/Paginator";
import UsersTable from "../../components/admin/UsersTable";

const Users = () => {
  return (
    <>
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Users</h2>
                <span className="main__title-stat">3,702 Total</span>
                <div className="main__title-wrap">
                  <div className="filter mt-3" id="filter__sort">
                    <span className="filter__item-label">Sort by:</span>
                    {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
                    <div
                      className="filter__item-btn dropdown-toggle"
                      role="navigation"
                      id="filter-sort"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <input type="button" value="Date created" />
                      <span></span>
                    </div>
                    <ul
                      className="filter__item-menu dropdown-menu scrollbar-dropdown"
                      aria-labelledby="filter-sort"
                    >
                      <li>Date created</li>
                      <li>Pricing plan</li>
                      <li>Status</li>
                    </ul>
                  </div>
                  <form action="#" className="main__title-form">
                    <input type="text" placeholder="Find user.." />
                    <button type="button">
                      <i className="icon ion-ios-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <UsersTable />
            <Paginator />
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;
