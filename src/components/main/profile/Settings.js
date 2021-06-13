import React from "react";

const Settings = () => {
  return (
    <div
      className="tab-pane fade"
      id="tab-3"
      role="tabpanel"
      aria-labelledby="3-tab"
    >
      <div className="row">
        <div className="col-12 col-lg-6">
          <form action="#" className="form form--profile">
            <div className="row row--form">
              <div className="col-12">
                <h4 className="form__title">Profile details</h4>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form__input"
                    placeholder="User 123"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    className="form__input"
                    placeholder="email@email.com"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="firstname">
                    First Name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    className="form__input"
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="lastname">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastname"
                    className="form__input"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="col-12">
                <button className="form__btn" type="button">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-6">
          <form action="#" className="form form--profile">
            <div className="row row--form">
              <div className="col-12">
                <h4 className="form__title">Change password</h4>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="oldpass">
                    Old password
                  </label>
                  <input
                    id="oldpass"
                    type="password"
                    name="oldpass"
                    className="form__input"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="newpass">
                    New password
                  </label>
                  <input
                    id="newpass"
                    type="password"
                    name="newpass"
                    className="form__input"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="confirmpass">
                    Confirm new password
                  </label>
                  <input
                    id="confirmpass"
                    type="password"
                    name="confirmpass"
                    className="form__input"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                <div className="form__group">
                  <label className="form__label" for="select">
                    Select
                  </label>
                  <select name="select" id="select" className="form__select">
                    <option value="0">Option</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                  </select>
                </div>
              </div>

              <div className="col-12">
                <button className="form__btn" type="button">
                  Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
