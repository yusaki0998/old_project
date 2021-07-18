/** @format */

import React, { useState } from "react";
import { getUserBySearchInputRequest } from "../../store/api/admin";
import { Helmet } from "react-helmet";
import CustomerList from "../../components/staff/CustomerList";

const CustomerTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearchCustomer = () => {
    if (isTouched && searchInput.trim()) {
      setIsLoading(true);
      getUserBySearchInputRequest(searchInput.trim().toLowerCase())
        .then(({ data }) => {
          setFilteredList(data?.data || []);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
    if (!searchInput.trim()) {
      setFilteredList([]);
    }
  };

  return (
    <div className="tab-pane">
      <Helmet>
        <title> Danh sách khách hàng </title>
      </Helmet>
      <div className="d-flex justify-content-between align-items-center my-4">
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
                setFilteredList([]);
              }
            }}
          />
          <button
            className="table__search-button"
            type="button"
            onClick={onSearchCustomer}
          >
            <i className="icon ion-ios-search"></i>
          </button>
        </form>
      </div>
      <div className="d-flex justify-content-center align-items-center my-4">
        {!isLoading && filteredList.length === 0 && (
          <p className="text-center text-white">Vui lòng nhập vào ô tìm kiếm</p>
        )}
      </div>
      <CustomerList isLoading={isLoading} list={filteredList} from="current" />
    </div>
  );
};

export default CustomerTable;
