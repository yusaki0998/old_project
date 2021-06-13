import React from "react";
import "./index.css";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Sidebar from "../../components/shared/Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import AdminHeader from "../../components/shared/AdminHeader";
import Catalog from "../../pages/admin/Catalog";
import Users from "../../pages/admin/Users";

const AdminLayout = ({ children }) => {
  const router = useRouteMatch();
  return (
    <>
      <AdminHeader />
      <Sidebar />
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
