/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertStatusToText } from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewFilm,
  resetCreateNewFilmState,
} from "../../store/actions/managerActions";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { AGE_THRESHOLD, showAgeThreshold } from "../../utils/age";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const NewFilm = () => {
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [ageRating, setAgeRating] = useState("");
  const [showAgeRating, setShowAgeRating] = useState(false);
  const { createFilm: createFilmData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const imgRef = useRef();
  const [imgError, setImgError] = useState("");
  const [showtimes, setShowtimes] = useState(new Date());
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (createFilmData?.success) {
      setTimeout(() => {
        dispatch(resetCreateNewFilmState());
      }, 500);
      reset();
      setStatus("");
      setAgeRating("");
      if (createFilmData.data?.data?.status === 1) {
        history.push("/manager/current");
      }
      if (createFilmData.data?.data?.status === 0) {
        history.push("/manager/coming");
      }
    }
  }, [
    createFilmData?.success,
    reset,
    dispatch,
    history,
    createFilmData.data?.data?.status,
  ]);

  useEffect(() => {
    setPreviewImageSrc(
      imgRef?.current?.files?.[0]
        ? URL?.createObjectURL(imgRef?.current?.files?.[0])
        : ""
    );
    setImgError("");
  }, [imgRef]);

  const onValid = (data) => {
    if (!status) {
      setError("status", { type: "manual", message: "????y l?? m???c b???t bu???c" });
      return;
    }
    if (!ageRating) {
      setError("ageRating", { type: "manual", message: "????y l?? m???c b???t bu???c" });
      return;
    }
    if (!imgRef || !imgRef.current || !imgRef.current.files[0]) {
      setImgError("????y l?? m???c b???t bu???c");
    } else {
      const formdata = new FormData();
      for (const property in data) {
        formdata.append(property, data[property]);
      }
      formdata.append("coverImage", imgRef.current.files[0]);
      formdata.append("status", status);
      formdata.append("ageRating", ageRating);
      formdata.append("showtimes", showtimes);
      dispatch(createNewFilm(formdata));
    }
  };

  return (
    <main className="pb-4">
      <Helmet>
        <title> T???o m???i phim </title>
      </Helmet>
      <div className="admin__create-account__wrapper text-white">
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          T???o m???i phim
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>T??n phim</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${
                    errors.movieName ? "input-error" : ""
                  }`}
                  {...register("movieName", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.movieName && (
                  <p className="input-required">{errors.movieName.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>?????o di???n</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${
                    errors.director ? "input-error" : ""
                  }`}
                  {...register("director", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.director && (
                  <p className="input-required">{errors.director.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Di???n vi??n</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${errors.actor ? "input-error" : ""}`}
                  {...register("actor", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.actor && (
                  <p className="input-required">{errors.actor.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Th??? lo???i</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${errors.genre ? "input-error" : ""}`}
                  {...register("genre", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.genre && (
                  <p className="input-required">{errors.genre.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Qu???c gia</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${
                    errors.nation ? "input-error" : ""
                  }`}
                  {...register("nation", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.nation && (
                  <p className="input-required">{errors.nation.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Th???i l?????ng</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="number"
                  className={`sign__input ${
                    errors.amountOfTime ? "input-error" : ""
                  }`}
                  {...register("amountOfTime", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                  min={0}
                />
                {errors.amountOfTime && (
                  <p className="input-required">
                    {errors.amountOfTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Kh???i chi???u</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <DatePicker
                  selected={showtimes}
                  onChange={(date) => setShowtimes(date)}
                />
              </div>
            </div>
          </div>
          <div className="row align-items-center mb-4">
            <div className="col-md-3">
              <p>Gi???i h???n tu???i</p>
            </div>
            <div className="col-md-9">
              <OutsideHandler callback={() => setShowAgeRating(false)}>
                <div
                  className={`sign-custom__select ${
                    showAgeRating ? "show" : ""
                  }`}
                  onClick={() => setShowAgeRating((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {ageRating ? showAgeThreshold(ageRating) : "Vui l??ng ch???n"}
                  </li>
                  <ul
                    className={`${showAgeRating ? "show" : ""}`}
                    style={{
                      height: "auto",
                    }}
                  >
                    {AGE_THRESHOLD.map((item) => (
                      <li
                        key={item.key}
                        onClick={() => {
                          setAgeRating(item.key);
                          clearErrors("ageRating");
                        }}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${
                        showAgeRating ? "up" : "down"
                      }`}
                    ></i>
                  </button>
                </div>
              </OutsideHandler>
              {errors.ageRating && (
                <p className="input-required">{errors.ageRating.message}</p>
              )}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>???nh Cover</p>
            </div>
            <div className="col-md-5">
              <div className="sign__group">
                <input
                  ref={imgRef}
                  type="file"
                  className="sign__input pt-1 cursor-pointer"
                />
                {imgError && <p className="input-required">{imgError}</p>}
              </div>
            </div>
            <div className="col-md-4 img__preview">
              {imgRef && <img src={previewImageSrc} alt={previewImageSrc} />}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>N???i dung</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <textarea
                  className={`sign__input sign_textarea ${
                    errors.description ? "input-error" : ""
                  }`}
                  {...register("description", {
                    required: {
                      value: true,
                      message: "????y l?? m???c b???t bu???c",
                    },
                  })}
                />
                {errors.description && (
                  <p className="input-required">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Lo???i phim</p>
            </div>
            <div className="col-md-9">
              <OutsideHandler callback={() => setShowStatus(false)}>
                <div
                  className={`sign-custom__select ${showStatus ? "show" : ""}`}
                  onClick={() => setShowStatus((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {status ? convertStatusToText(status) : "Vui l??ng ch???n"}
                  </li>
                  <ul
                    className={`${showStatus ? "show" : ""}`}
                    style={{
                      height: 95,
                    }}
                  >
                    <li
                      onClick={() => {
                        setStatus("1");
                        clearErrors("status");
                      }}
                    >
                      Phim ??ang chi???u
                    </li>
                    <li
                      onClick={() => {
                        setStatus("0");
                        clearErrors("status");
                      }}
                    >
                      Phim s???p chi???u
                    </li>
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${showStatus ? "up" : "down"}`}
                    ></i>
                  </button>
                </div>
              </OutsideHandler>
              {errors.status && (
                <p className="input-required">{errors.status.message}</p>
              )}
            </div>
          </div>
          <button
            className={`btn__outline-orange mx-auto my-4 ${
              createFilmData.isLoading ? "divDisable" : ""
            }`}
            type="submit"
          >
            {createFilmData.isLoading ? "??ang t???o phim" : "T???o phim"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewFilm;
