import React from "react";

const MovieTable = () => {
  return (
    <>
      <div className="col-12">
        <div className="main__table-wrap">
          <table className="main__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>RATING</th>
                <th>CATEGORY</th>
                <th>VIEWS</th>
                <th>STATUS</th>
                <th>CRAETED DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="main__table-text">23</div>
                </td>
                <td>
                  <div className="main__table-text">
                    <a href="/">I Dream in Another Language</a>
                  </div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--rate">
                    <i className="icon ion-ios-star"></i> 7.9
                  </div>
                </td>
                <td>
                  <div className="main__table-text">Movie</div>
                </td>
                <td>
                  <div className="main__table-text">1392</div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--green">
                    Visible
                  </div>
                </td>
                <td>
                  <div className="main__table-text">24 Oct 2021</div>
                </td>
                <td>
                  <div className="main__table-btns">
                    <a
                      href="#modal-status"
                      className="main__table-btn main__table-btn--banned open-modal"
                    >
                      <i className="icon ion-ios-lock"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--view"
                    >
                      <i className="icon ion-ios-eye"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--edit"
                    >
                      <i className="icon ion-ios-create"></i>
                    </a>
                    <a
                      href="#modal-delete"
                      className="main__table-btn main__table-btn--delete open-modal"
                    >
                      <i className="icon ion-ios-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="main__table-text">24</div>
                </td>
                <td>
                  <div className="main__table-text">
                    <a href="/">Benched</a>
                  </div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--rate">
                    <i className="icon ion-ios-star"></i> 7.1
                  </div>
                </td>
                <td>
                  <div className="main__table-text">Movie</div>
                </td>
                <td>
                  <div className="main__table-text">1093</div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--red">
                    Hidden
                  </div>
                </td>
                <td>
                  <div className="main__table-text">24 Oct 2021</div>
                </td>
                <td>
                  <div className="main__table-btns">
                    <a
                      href="#modal-status"
                      className="main__table-btn main__table-btn--banned open-modal"
                    >
                      <i className="icon ion-ios-lock"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--view"
                    >
                      <i className="icon ion-ios-eye"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--edit"
                    >
                      <i className="icon ion-ios-create"></i>
                    </a>
                    <a
                      href="#modal-delete"
                      className="main__table-btn main__table-btn--delete open-modal"
                    >
                      <i className="icon ion-ios-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="main__table-text">25</div>
                </td>
                <td>
                  <div className="main__table-text">
                    <a href="/">Whitney</a>
                  </div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--rate">
                    <i className="icon ion-ios-star"></i> 6.3
                  </div>
                </td>
                <td>
                  <div className="main__table-text">TV Show</div>
                </td>
                <td>
                  <div className="main__table-text">723</div>
                </td>
                <td>
                  <div className="main__table-text main__table-text--green">
                    Visible
                  </div>
                </td>
                <td>
                  <div className="main__table-text">24 Oct 2021</div>
                </td>
                <td>
                  <div className="main__table-btns">
                    <a
                      href="#modal-status"
                      className="main__table-btn main__table-btn--banned open-modal"
                    >
                      <i className="icon ion-ios-lock"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--view"
                    >
                      <i className="icon ion-ios-eye"></i>
                    </a>
                    <a
                      href="/"
                      className="main__table-btn main__table-btn--edit"
                    >
                      <i className="icon ion-ios-create"></i>
                    </a>
                    <a
                      href="#modal-delete"
                      className="main__table-btn main__table-btn--delete open-modal"
                    >
                      <i className="icon ion-ios-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MovieTable;
