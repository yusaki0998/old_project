/** @format */

import React from "react";
import { useHistory } from "react-router";
import CustomerListSkeleton from "../../skeleton/CustomerListSkeleton";

const CustomerList = ({ list, isLoading, from }) => {
  const history = useHistory();

  return (
    <div className="admin__manager-list__wrapper">
      <div className="main__table-wrap">
        <table className="main__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Ngày sinh</th>
              <th>Email</th>
              <th>Thông tin</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <CustomerListSkeleton />}
            {!isLoading &&
              list.map((customer, index) => (
                <tr key={customer._id}>
                  <td>
                    <div className="main__table-text">{index + 1}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{customer.fullname}</div>
                  </td>
                  <td>
                    <div className="main__table-text">{customer.phone}</div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {customer.dob?.substr(0, 10)}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">{customer.email}</div>
                  </td>
                  <td>
                    <div className="main__table-btns">
                      <button
                        className="main__table-btn main__table-btn--edit"
                        onClick={() =>
                          history.push(`/staff/customer-detail/${customer._id}`)
                        }
                      >
                        <i className="icon ion-ios-search"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
