/** @format */

import React from "react";
import Skeleton from "react-loading-skeleton";

const FilmListSkeleton = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
    <tr key={item}>
      <td>
        <div className="main__table-text">
          <Skeleton width={20} height={16} />
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <Skeleton width={200} height={16} />
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <Skeleton width={130} height={16} />
        </div>
      </td>
      <td>
        <div className="main__table-text">
          <Skeleton width={90} height={16} />
        </div>
      </td>
      <td>
        <div className="main__table-btns">
          <Skeleton width={90} height={16} />
        </div>
      </td>
    </tr>
  ));
};

export default FilmListSkeleton;
