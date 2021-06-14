import React, { useEffect } from "react";
import "./index.css";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Sidebar from "../../components/shared/Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import AdminHeader from "../../components/shared/AdminHeader";
import Catalog from "../../pages/admin/Catalog";
import Users from "../../pages/admin/Users";
import { useSelector } from "react-redux";

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
      </Switch>
    </>
  );
};

export default AdminLayout;
