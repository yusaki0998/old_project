/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { getCustomerInfoRequest } from "../../store/api/user";

const CustomerTicketInfo = () => {
  const { id } = useParams();
  const [customerInfo, setCustomerInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomerInfo = () => {
    setIsLoading(true);
    getCustomerInfoRequest(id)
      .then(({ data }) => {
        setCustomerInfo(data?.data || {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchCustomerInfo();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="text-white tab-pane my-3">
      <h3 className="border-bottom d-inline-block">
        Thông tin vé của khách hàng
      </h3>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className="info">
          <div className="top__info mt-3">
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-3">
                <strong>Tên khách hàng</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.fullname} </span>
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-3">
                <strong>Số điện thoại</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.phone} </span>
              </div>
            </div>
            <div className="row w-100 mb-3">
              <div className="col-5 col-md-3">
                <strong>Email</strong>
              </div>
              <div className="col-7 col-md-9">
                <span>{customerInfo?.email} </span>
              </div>
            </div>
          </div>
          <div className="ticket__list"></div>
        </div>
      )}
    </div>
  );
};

export default CustomerTicketInfo;
