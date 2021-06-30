/** @format */

import React, { useEffect, lazy, Suspense } from "react";
import "./index.css";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/shared/Sidebar";
import AdminHeader from "../../components/shared/AdminHeader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
const Catalog = lazy(() => import("../../pages/admin/Catalog"));
const Users = lazy(() => import("../../pages/admin/Users"));
const CreateAccount = lazy(() => import("../../pages/admin/CreateAccount"));
const ManagerList = lazy(() => import("../../pages/admin/ManagerList"));
const StaffList = lazy(() => import("../../pages/admin/StaffList"));
const EditAccountInfo = lazy(() => import("../../pages/admin/EditAccount"));
const Dashboard = lazy(() => import("../../pages/admin/Dashboard.js"));

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
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/catalog`}>
          <Suspense fallback={<LoadingSpinner />}>
            <Catalog />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/users`}>
          <Suspense fallback={<LoadingSpinner />}>
            <Users />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/create-account`}>
          <Suspense fallback={<LoadingSpinner />}>
            <CreateAccount />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/managers`}>
          <Suspense fallback={<LoadingSpinner />}>
            <ManagerList />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/employees`}>
          <Suspense fallback={<LoadingSpinner />}>
            <StaffList />
          </Suspense>
        </Route>
        <Route exact path={`${router.path}/edit-account`}>
          <Suspense fallback={<LoadingSpinner />}>
            <EditAccountInfo />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
};

export default AdminLayout;
