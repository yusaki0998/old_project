/** @format */

import React from "react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <main className="main">
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <div className="container-fluid">
        <div className="row row--grid">
          <div className="col-12">
            <div className="main__title">
              <h2>Dashboard</h2>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>Unique views this month</span>
              <p>5 678</p>
              <i className="icon ion-ios-stats"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>Items added this month</span>
              <p>172</p>
              <i className="icon ion-ios-film"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>New comments</span>
              <p>2 573</p>
              <i className="icon ion-ios-chatbubbles"></i>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="stats">
              <span>New reviews</span>
              <p>1 021</p>
              <i className="icon ion-ios-star-half"></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
