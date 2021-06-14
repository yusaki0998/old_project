/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../components/shared/Paginator";
import UserListSkeleton from "../../skeleton/UserListSkeleton";
import { getListStaff } from "../../store/actions/adminActions";
import DeleteAccount from "../../components/admin/DeleteAccount";
import { useHistory } from "react-router-dom";

const StaffList = () => {
  const dispatch = useDispatch();
  const { staffs } = useSelector((state) => state.admin);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState({});
  const history = useHistory();

  const onOpen = (acc) => {
    setSelectedAcc(acc);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenDelete(false);
    setSelectedAcc({});
  };

  useEffect(() => {
    dispatch(getListStaff());
  }, [dispatch]);

  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__manager-list__wrapper text-white mt-5">
              <div className="d-flex justify-content-end mb-3">
                <form action="#" className="header__search">
                  <input
                    className="header__search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                  />
                  <button className="header__search-button" type="button">
                    <i className="icon ion-ios-search"></i>
                  </button>
                  <button className="header__search-close" type="button">
                    <i className="icon ion-md-close"></i>
                  </button>
                </form>
              </div>
              <div className="col-12">
                <div className="main__table-wrap">
                  <table className="main__table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Mã nhân viên</th>
                        <th>Tên tài khoản</th>
                        <th>Tên nhân viên</th>
                        <th>Số điện thoại</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs.isLoading && <UserListSkeleton />}
                      {!staffs.isLoading &&
                        staffs.list.map((staff, index) => (
                          <tr key={staff._id}>
                            <td>
                              <div className="main__table-text">
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="/"> {staff._id} </a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {staff.email}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {staff.fullname}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {staff.phone}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <button
                                  className="main__table-btn main__table-btn--edit"
                                  onClick={() =>
                                    history.push(
                                      `/admin/edit-account?uId=${staff._id}&role=staff`
                                    )
                                  }
                                >
                                  <i className="icon ion-ios-create"></i>
                                </button>
                                <button
                                  className="main__table-btn main__table-btn--delete"
                                  onClick={() => onOpen(staff)}
                                >
                                  <i className="icon ion-ios-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Paginator />
              <DeleteAccount
                open={openDelete}
                close={onClose}
                userData={selectedAcc}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StaffList;
