import React from "react";

const Stats = () => {
  return (
    <div
      className="tab-pane fade show active"
      id="tab-1"
      role="tabpanel"
      aria-labelledby="1-tab"
    >
      <div className="row row--grid">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats">
            <span>Premium plan</span>
            <p>$34.99 / month</p>
            <i className="icon ion-ios-card"></i>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats">
            <span>Films watched</span>
            <p>
              <a href="/">1 678</a>
            </p>
            <i className="icon ion-ios-film"></i>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats">
            <span>Your comments</span>
            <p>
              <a href="/">2 573</a>
            </p>
            <i className="icon ion-ios-chatbubbles"></i>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stats">
            <span>Your reviews</span>
            <p>
              <a href="/">1 021</a>
            </p>
            <i className="icon ion-ios-star-half"></i>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="dashbox">
            <div className="dashbox__title">
              <h3>
                <i className="icon ion-ios-film"></i> Movies for you
              </h3>

              <div className="dashbox__wrap">
                <a className="dashbox__refresh" href="/">
                  <i className="icon ion-ios-refresh"></i>
                </a>
                <a className="dashbox__more" href="catalog.html">
                  View All
                </a>
              </div>
            </div>

            <div className="dashbox__table-wrap">
              <table className="main__table main__table--dash">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>CATEGORY</th>
                    <th>RATING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">I Dream in Another Language</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">Movie</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 9.2
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Benched</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">Movie</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 9.1
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Whitney</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">TV Series</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 9.0
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Blindspotting 2</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">TV Series</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 8.9
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Blindspotting</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">TV Series</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 8.9
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="dashbox">
            <div className="dashbox__title">
              <h3>
                <i className="icon ion-ios-star-half"></i> Latest reviews
              </h3>

              <div className="dashbox__wrap">
                <a className="dashbox__refresh" href="/">
                  <i className="icon ion-ios-refresh"></i>
                </a>
                <a className="dashbox__more" href="/">
                  View All
                </a>
              </div>
            </div>

            <div className="dashbox__table-wrap">
              <table className="main__table main__table--dash">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>AUTHOR</th>
                    <th>RATING</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">I Dream in Another Language</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">John Doe</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 7.2
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Benched</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">John Doe</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 6.3
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Whitney</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">John Doe</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 8.4
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">Blindspotting</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">John Doe</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 9.0
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="main__table-text">
                        <a href="/">I Dream in Another Language</a>
                      </div>
                    </td>
                    <td>
                      <div className="main__table-text">John Doe</div>
                    </td>
                    <td>
                      <div className="main__table-text main__table-text--rate">
                        <i className="icon ion-ios-star"></i> 7.7
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
