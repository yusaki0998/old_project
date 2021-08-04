/** @format */

import React, { lazy, Suspense } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StaffMenu from "../../components/manager/StaffMenu";
import ManagerHeader from "../../components/shared/ManagerHeader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import NotFound from "../../pages/global/NotFound";

const MovieDetail = lazy(() => import("../../pages/global/MovieDetail"));
const BookingListFilm = lazy(() => import("../../pages/staff/BookingListFilm"));
const CustomerTicketInfo = lazy(() =>
  import("../../pages/staff/CustomerTicketInfo")
);
const CustomerTable = lazy(() => import("../../pages/staff/CustomerTable"));
const OrderHistory = lazy(() => import("../../pages/customer/OrderHistory"));
const SelectSeat = lazy(() => import("../../pages/global/SelectSeat"));

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
            <Route exact path={`${router.path}/view-movie/:id`}>
              <Suspense fallback={<LoadingSpinner />}>
                <MovieDetail hideSuggestion />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/select-seat/:id`}>
              <Suspense fallback={<LoadingSpinner />}>
                <SelectSeat isStaff />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/ticket-history`}>
              <Suspense fallback={<LoadingSpinner />}>
                <OrderHistory hideCancelTicket />
              </Suspense>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default StaffLayout;
