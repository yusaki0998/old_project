/** @format */

import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Header from "../../components/shared/header";
import Menu from "../../components/manager/Menu";
import CurrentFilm from "../../pages/manager/CurrentFilm";
import IncomingFilm from "../../pages/manager/IncomingFilm";
import NewFilm from "../../pages/manager/NewFilm";
import EditFilm from "../../pages/manager/EditFilm";
import FilmRoom from "../../pages/manager/FilmRoom";
import NewRoom from "../../pages/manager/NewRoom";
import EditRoom from "../../pages/manager/EditRoom";
import ViewSlot from "../../pages/manager/ViewSlot";

const ManagerLayout = () => {
  const router = useRouteMatch();

  return (
    <>
      <Header hideCenterDiv isActive />
      <div className="mt-5 pt-5"></div>
      <div className="container">
        <Menu />
        <Switch>
          <Route exact path={`${router.path}/`}>
            <CurrentFilm />
          </Route>
          <Route exact path={`${router.path}/current`}>
            <CurrentFilm />
          </Route>
          <Route exact path={`${router.path}/coming`}>
            <IncomingFilm />
          </Route>
          <Route exact path={`${router.path}/new-film`}>
            <NewFilm />
          </Route>
          <Route exact path={`${router.path}/edit-film`}>
            <EditFilm />
          </Route>
          <Route exact path={`${router.path}/room`}>
            <FilmRoom />
          </Route>
          <Route exact path={`${router.path}/new-room`}>
            <NewRoom />
          </Route>
          <Route exact path={`${router.path}/edit-room`}>
            <EditRoom />
          </Route>
          <Route exact path={`${router.path}/slot`}>
            <ViewSlot />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default ManagerLayout;
