import React from "react";
import Paginator from "../../components/shared/Paginator";

const OrderHistory = () => {
  return (
    <div className="customer__order-history__wrapper my-5">
      <div className="col-12">
        <div className="main__table-wrap">
          <table className="main__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Phim</th>
                <th>Ngày Đặt</th>
                <th>Giờ Đặt</th>
                <th>Phòng Chiếu</th>
                <th>Số Ghế</th>
                <th>Loại Ghế</th>
                <th>Giá vé</th>
                <th>Hủy vé</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="main__table-text">23</div>
                </td>
                <td>
                  <div className="main__table-text">
                    <a href="/">I Dream in Another Language</a>
                  </div>
                </td>
                <td>
                  <div className="main__table-text">24-05-2020</div>
                </td>
                <td>
                  <div className="main__table-text">11:21:35</div>
                </td>
                <td>
                  <div className="main__table-text">Rom 5</div>
                </td>
                <td>
                  <div className="main__table-text">C7</div>
                </td>
                <td>
                  <div className="main__table-text">VIP</div>
                </td>
                <td>
                  <div className="main__table-text">50,000đ</div>
                </td>
                <td>
                  <button className="main__table-btn main__table-btn--delete open-modal">
                    <i className="icon ion-ios-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Paginator />
    </div>
  );
};

export default OrderHistory;
