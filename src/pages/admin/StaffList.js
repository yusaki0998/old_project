/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../components/shared/Paginator";
import UserListSkeleton from "../../skeleton/UserListSkeleton";
import { getListStaff } from "../../store/actions/adminActions";
import DeleteAccount from "../../components/admin/DeleteAccount";
import { useHistory } from "react-router-dom";
import { getUserBySearchInputRequest } from "../../store/api/admin";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";
import { convertGenderToVietnamese } from "../../utils/convertGender";
import { Helmet } from "react-helmet";

const StaffList = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { staffs } = useSelector((state) => state.admin);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState({});
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const history = useHistory();
  const [curPage, setCurPage] = useState(0);

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
    dispatch(getListStaff());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(staffs.list);
  }, [staffs.list]);

  const onSearchUser = (e) => {
    e.preventDefault();
    if (isTouched && searchInput.trim()) {
      getUserBySearchInputRequest(searchInput.trim().toLowerCase())
        .then(({ data }) => {
          setFilteredList(data?.data?.filter((user) => user?.role === "staff"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (!searchInput.trim()) {
      setFilteredList(staffs.list);
    }
  };

  return (
    <main className="main">
      <Helmet>
        <title> Danh sách nhân viên </title>
      </Helmet>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="admin__manager-list__wrapper text-white mt-5">
              <div className="d-flex justify-content-between mb-4 align-items-center sm-flex-col">
                <h3>Danh sách nhân viên</h3>
                <form className="table__search mr">
                  <input
                    className="header__search-input"
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      setIsTouched(true);
                      if (!e.target.value.trim()) {
                        setFilteredList(staffs.list);
                      }
                    }}
                  />
                  <button
                    className="table__search-button"
                    type="submit"
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
                        <th>Email</th>
                        <th>Tên nhân viên</th>
                        <th>Số điện thoại</th>
                        <th>Giới tính </th>
                        <th>Ngày sinh </th>
                        <th>Sửa / Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs.isLoading && <UserListSkeleton />}
                      {!staffs.isLoading &&
                        filteredList
                          .slice(
                            curPage * MAX_ITEMS_PER_PAGE,
                            (curPage + 1) * MAX_ITEMS_PER_PAGE
                          )
                          .map((staff) => (
                            <tr key={staff._id}>
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
                                <div className="main__table-text">
                                  {convertGenderToVietnamese(staff.gender)}
                                </div>
                              </td>
                              <td>
                                <div className="main__table-text">
                                  {staff.dob?.toString()?.substr(0, 10)}
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

export default StaffList;
