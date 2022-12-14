/** @format */

import React, { useEffect, lazy, Suspense } from "react";
import "./index.css";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/shared/Sidebar";
import AdminHeader from "../../components/shared/AdminHeader";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import NotFound from "../../pages/global/NotFound";

const CreateAccount = lazy(() => import("../../pages/admin/CreateAccount"));
const ManagerList = lazy(() => import("../../pages/admin/ManagerList"));
const StaffList = lazy(() => import("../../pages/admin/StaffList"));
const EditAccountInfo = lazy(() => import("../../pages/admin/EditAccount"));

const AdminLayout = ({ children }) => {
  const { loginData, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (loginData?.data?.role !== "admin") {
      history.push("/");
    }
    if (!isAuthenticated) {
      history.push("/signin");
    }
  }, [history, loginData?.data?.role, isAuthenticated]);

  return (
    <>
      <AdminHeader />
      <Sidebar userInfo={loginData?.data} />
      {children}
      <Switch>
        <Route exact path={`${router.path}/`}>
          <Suspense fallback={<LoadingSpinner />}>
            <CreateAccount />
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
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default AdminLayout;
