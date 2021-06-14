/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../components/shared/Paginator";
import UserListSkeleton from "../../skeleton/UserListSkeleton";
import DeleteAccount from "../../components/admin/DeleteAccount";
import { getListManager } from "../../store/actions/adminActions";
import { useHistory } from "react-router-dom";

const ManagerList = () => {
  const dispatch = useDispatch();
  const { managers } = useSelector((state) => state.admin);
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
    dispatch(getListManager());
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
                        <th>Mã quản lý</th>
                        <th>Tên tài khoản</th>
                        <th>Tên quản lý</th>
                        <th>Số điện thoại</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {managers.isLoading && <UserListSkeleton />}
                      {!managers.isLoading &&
                        managers.list.map((manager, index) => (
                          <tr key={manager._id}>
                            <td>
                              <div className="main__table-text">
                                {index + 1}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                <a href="/"> {manager._id} </a>
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {manager.email}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {manager.fullname}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-text">
                                {manager.phone}
                              </div>
                            </td>
                            <td>
                              <div className="main__table-btns">
                                <button
                                  className="main__table-btn main__table-btn--edit"
                                  onClick={() =>
                                    history.push(
                                      `/admin/edit-account?uId=${manager._id}&role=manager`
                                    )
                                  }
                                >
                                  <i className="icon ion-ios-create"></i>
                                </button>
                                <button
                                  className="main__table-btn main__table-btn--delete"
                                  onClick={() => onOpen(manager)}
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

export default ManagerList;
