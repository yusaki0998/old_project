/** @format */

import React, { useState, useEffect } from "react";
import { getUserBySearchInputRequest } from "../../store/api/admin";
import { Helmet } from "react-helmet";
import CustomerList from "../../components/staff/CustomerList";
import { getCustomerListRequest } from "../../store/api/user";
import Paginator from "../../components/shared/Paginator";
import { MAX_ITEMS_PER_PAGE } from "../manager/FilmRoom";

const CustomerTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [curPage, setCurPage] = useState(0);

  const fetchListCustomer = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCustomerListRequest();
      setFilteredList(data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListCustomer();
  }, []);

  const onSearchCustomer = (e) => {
    e.preventDefault();
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
            type="submit"
            onClick={onSearchCustomer}
          >
            <i className="icon ion-ios-search"></i>
          </button>
        </form>
      </div>
      <CustomerList
        isLoading={isLoading}
        list={filteredList.slice(
          curPage * MAX_ITEMS_PER_PAGE,
          (curPage + 1) * MAX_ITEMS_PER_PAGE
        )}
        from="current"
      />
      <Paginator
        curPage={curPage}
        maxPage={Math.ceil(filteredList.length / MAX_ITEMS_PER_PAGE)}
        setCurPage={setCurPage}
        totalItems={filteredList.length}
        scrollAfterClicking
      />
    </div>
  );
};

export default CustomerTable;
