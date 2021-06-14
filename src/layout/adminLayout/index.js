/** @format */

import React, { useEffect } from "react";
import "./index.css";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Sidebar from "../../components/shared/Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import AdminHeader from "../../components/shared/AdminHeader";
import Catalog from "../../pages/admin/Catalog";
import Users from "../../pages/admin/Users";
import CreateAccount from "../../pages/admin/CreateAccount";
import { useSelector } from "react-redux";
import ManagerList from "../../pages/admin/ManagerList";
import StaffList from "../../pages/admin/StaffList";
import EditAccountInfo from "../../pages/admin/EditAccount";

const AdminLayout = ({ children }) => {
  const { loginData } = useSelector((state) => state.auth);
  const router = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (loginData?.data?.role !== "admin") {
      history.push("/");
    }
  }, [history, loginData?.data?.role]);

  return (
    <>
      <AdminHeader />
      <Sidebar userInfo={loginData?.data} />
      {children}
      <Switch>
        <Route exact path={`${router.path}/`}>
          <Dashboard />
        </Route>
        <Route exact path={`${router.path}/catalog`}>
          <Catalog />
        </Route>
        <Route exact path={`${router.path}/users`}>
          <Users />
        </Route>
        <Route exact path={`${router.path}/create-account`}>
          <CreateAccount />
        </Route>
        <Route exact path={`${router.path}/managers`}>
          <ManagerList />
        </Route>
        <Route exact path={`${router.path}/employees`}>
          <StaffList />
        </Route>
        <Route exact path={`${router.path}/edit-account`}>
          <EditAccountInfo />
        </Route>
      </Switch>
    </>
  );
};

export default AdminLayout;
