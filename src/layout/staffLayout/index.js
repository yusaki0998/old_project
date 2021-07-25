/** @format */

import React, { lazy, Suspense } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StaffMenu from "../../components/manager/StaffMenu";
import ManagerHeader from "../../components/shared/ManagerHeader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import BookingListFilm from "../../pages/staff/BookingListFilm";
import CustomerTicketInfo from "../../pages/staff/CustomerTicketInfo";
const CustomerTable = lazy(() => import("../../pages/staff/CustomerTable"));

const StaffLayout = () => {
  const router = useRouteMatch();

  return (
    <>
      <ManagerHeader />
      <StaffMenu />
      <div className="main">
        <div className="container-fluid">
          <Switch>
            <Route exact path={`${router.path}/`}>
              <Suspense fallback={<LoadingSpinner />}>
                <CustomerTable />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/customers`}>
              <Suspense fallback={<LoadingSpinner />}>
                <CustomerTable />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/customer-detail/:id`}>
              <Suspense fallback={<LoadingSpinner />}>
                <CustomerTicketInfo />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/booking-ticket`}>
              <Suspense fallback={<LoadingSpinner />}>
                <BookingListFilm />
              </Suspense>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default StaffLayout;
