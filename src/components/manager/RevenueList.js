/** @format */
/** @format */

import React from "react";
import { formatter } from "../../pages/customer/OrderHistory";
import RevenueListSkeleton from "../../skeleton/RevenueListSkeleton";

const RevenueList = ({ list, isLoading }) => {
  return (
    <div className="admin__manager-list__wrapper">
      <div className="main__table-wrap">
        <table className="main__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phim</th>
              <th>Phòng chiếu</th>
              <th>Slot</th>
              <th>Nhân viên</th>
              <th>Ngày bán vé</th>
              <th>Giá vé bán ra</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <RevenueListSkeleton />}
            {!isLoading &&
              list.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <div className="main__table-text">{index + 1}</div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {item?.movie?.movieName}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {item?.room?.roomName}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {item?.slot?.slotName}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {item?.user?.fullname}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {item?.paymentDate?.substr(0, 10)}
                    </div>
                  </td>
                  <td>
                    <div className="main__table-text">
                      {formatter.format(item.income)}
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

export default RevenueList;
