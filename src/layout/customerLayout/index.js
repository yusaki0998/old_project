import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import "./../../template/styles/main/index.css";
import Header from "../../components/shared/header";
import Footer from "../../components/shared/footer";
import CustomerNavMenu from "../../components/customer/CustomerNavMenu";
import Profile from "../../pages/customer/Profile";
import EditProfile from "../../pages/customer/EditProfile";
import OrderHistory from "../../pages/customer/OrderHistory";

const CustomerLayout = ({ children }) => {
  const router = useRouteMatch();
  return (
    <>
      <Header />
      <CustomerNavMenu />
      {children}
      <div className="container text-white">
        <Switch>
          <Route exact path={`${router.path}/info`}>
            <Profile />
          </Route>
          <Route exact path={`${router.path}/edit-info`}>
            <EditProfile />
          </Route>
          <Route exact path={`${router.path}/history-transactions`}>
            <OrderHistory />
          </Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default CustomerLayout;
