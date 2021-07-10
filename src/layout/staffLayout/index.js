/** @format */

import React, { lazy, Suspense } from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import StaffMenu from "../../components/manager/StaffMenu";
import ManagerHeader from "../../components/shared/ManagerHeader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
const CurrentFilm = lazy(() => import("../../pages/manager/CurrentFilm"));
const IncomingFilm = lazy(() => import("../../pages/manager/IncomingFilm"));
const NewFilm = lazy(() => import("../../pages/manager/NewFilm"));
const EditFilm = lazy(() => import("../../pages/manager/EditFilm"));
const FilmRoom = lazy(() => import("../../pages/manager/FilmRoom"));
const NewRoom = lazy(() => import("../../pages/manager/NewRoom"));
const ViewSlot = lazy(() => import("../../pages/manager/ViewSlot"));
const EditRoom = lazy(() => import("../../pages/manager/EditRoom"));
const RoomDetail = lazy(() => import("../../pages/manager/RoomDetail"));
const FilmCalendar = lazy(() => import("../../pages/manager/FilmCalendar"));

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
                <CurrentFilm />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/current`}>
              <Suspense fallback={<LoadingSpinner />}>
                <CurrentFilm />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/coming`}>
              <Suspense fallback={<LoadingSpinner />}>
                <IncomingFilm />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/new-film`}>
              <Suspense fallback={<LoadingSpinner />}>
                <NewFilm />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/edit-film`}>
              <Suspense fallback={<LoadingSpinner />}>
                <EditFilm />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/room`}>
              <Suspense fallback={<LoadingSpinner />}>
                <FilmRoom />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/new-room`}>
              <Suspense fallback={<LoadingSpinner />}>
                <NewRoom />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/edit-room`}>
              <Suspense fallback={<LoadingSpinner />}>
                <EditRoom />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/room-detail`}>
              <Suspense fallback={<LoadingSpinner />}>
                <RoomDetail />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/slot`}>
              <Suspense fallback={<LoadingSpinner />}>
                <ViewSlot />
              </Suspense>
            </Route>
            <Route exact path={`${router.path}/calendar`}>
              <Suspense fallback={<LoadingSpinner />}>
                <FilmCalendar />
              </Suspense>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default StaffLayout;
