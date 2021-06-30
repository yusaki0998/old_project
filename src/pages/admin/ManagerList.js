/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../components/shared/Paginator";
import UserListSkeleton from "../../skeleton/UserListSkeleton";
import DeleteAccount from "../../components/admin/DeleteAccount";
import { getListManager } from "../../store/actions/adminActions";
import { useHistory } from "react-router-dom";
import { getUserBySearchInputRequest } from "../../store/api/admin";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";

const ManagerList = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { managers } = useSelector((state) => state.admin);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState({});
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const history = useHistory();

  const onOpen = (acc) => {
    setSelectedAcc(acc);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenDelete(false);
    setTimeout(() => {
      setSelectedAcc({});
    }, 1000);
  };

  useEffect(() => {
    dispatch(getListManager());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(managers.list);
  }, [managers.list]);

  const onSearchUser = () => {
    if (isTouched && searchInput.trim()) {
      getUserBySearchInputRequest(searchInput.trim().toLowerCase())
        .then(({ data }) => {
          setFilteredList(
            data?.data?.filter((user) => user?.role === "manager")
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!searchInput.trim()) {
      setFilteredList(managers.list);
    }
  };

  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__manager-list__wrapper text-white mt-5">
              <div className="d-flex justify-content-between mb-4 align-items-center">
                <h3>Danh sách quản lý</h3>
                <form className="table__search">
                  <input
                    className="header__search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setIsTouched(true);
                      if (!e.target.value.trim()) {
                        setFilteredList(managers.list);
                      }
                    }}
                  />
                  <button
                    className="table__search-button"
                    type="button"
                    onClick={onSearchUser}
                  >
                    <i className="icon ion-ios-search"></i>
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
                        <th>Chỉnh sửa / Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managers.isLoading && <UserListSkeleton />}
                      {!managers.isLoading &&
                        filteredList
                          .slice(
                            curPage * MAX_ITEMS_PER_PAGE,
                            (curPage + 1) * MAX_ITEMS_PER_PAGE
                          )
                          .map((manager, index) => (
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
              <Paginator
                maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
                curPage={curPage}
                setCurPage={setCurPage}
                totalItems={filteredList.length}
              />
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
