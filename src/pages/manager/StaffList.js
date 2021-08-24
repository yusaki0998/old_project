/** @format */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paginator from "../../components/shared/Paginator";
import StaffListSkeleton from "../../skeleton/StaffListSkeleton";
import { getListStaff } from "../../store/actions/adminActions";
import { useHistory } from "react-router-dom";
import { getUserBySearchInputRequest } from "../../store/api/admin";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";
import { Helmet } from "react-helmet";

const StaffList = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { staffs } = useSelector((state) => state.admin);
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const history = useHistory();
  const [curPage, setCurPage] = useState(0);

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
    <div className="">
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
                        <th>STT</th>
                        <th>Tên tài khoản</th>
                        <th>Tên nhân viên</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffs.isLoading && <StaffListSkeleton />}
                      {!staffs.isLoading &&
                        filteredList
                          .slice(
                            curPage * MAX_ITEMS_PER_PAGE,
                            (curPage + 1) * MAX_ITEMS_PER_PAGE
                          )
                          .map((staff, index) => (
                            <tr key={staff._id}>
                              <td>
                                <div className="main__table-text">
                                  {index + 1}
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
                                <div className="main__table-btns">
                                  <button
                                    className="main__table-btn main__table-btn--edit"
                                    onClick={() =>
                                      history.push(
                                        `/manager/staff-info/${staff._id}`
                                      )
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
              <Paginator
                maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
                curPage={curPage}
                setCurPage={setCurPage}
                totalItems={filteredList.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffList;
