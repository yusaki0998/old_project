/** @format */

import React from "react";
import Skeleton from "react-loading-skeleton";

const ScheduleSkeleton = () => {
  return (
    <>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
      <td>
        <div className="text-schedule">
          <Skeleton width={80} />
        </div>
      </td>
    </>
  );
};

export default ScheduleSkeleton;
