/** @format */

import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import "./../../template/styles/main/index.css";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import CustomerNavMenu from "../../components/customer/CustomerNavMenu";
import { useDispatch, useSelector } from "react-redux";
import { getUserGeneralInfoRequest } from "../../store/api/user";
import { getUserProfileSuccess } from "../../store/actions/userActions";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import NotFound from "../../pages/global/NotFound";

const EditPassword = lazy(() => import("../../pages/customer/EditPassword"));
const OrderHistory = lazy(() => import("../../pages/customer/OrderHistory"));
const EditProfile = lazy(() => import("../../pages/customer/EditProfile"));
const Profile = lazy(() => import("../../pages/customer/Profile"));

const CustomerLayout = ({ children }) => {
  const router = useRouteMatch();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/signin");
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    getUserGeneralInfoRequest()
      .then(({ data }) => {
        if (data.data) {
          dispatch(getUserProfileSuccess(data.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <>
      <Header />
      <CustomerNavMenu />
      {children}
      <div className="container text-white min-height-80vh">
        <Switch>
          <Route exact path={`${router.path}/info`}>
            <Suspense fallback={<LoadingSpinner />}>
              <Profile />
            </Suspense>
          </Route>
          <Route exact path={`${router.path}/edit-info`}>
            <Suspense fallback={<LoadingSpinner />}>
              <EditProfile />
            </Suspense>
          </Route>
          <Route exact path={`${router.path}/history-transactions`}>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderHistory />
            </Suspense>
          </Route>
          <Route exact path={`${router.path}/edit-password`}>
            <Suspense fallback={<LoadingSpinner />}>
              <EditPassword />
            </Suspense>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;
