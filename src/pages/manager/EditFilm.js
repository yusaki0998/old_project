/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { convertStatusToText } from "../../utils/convertGender";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUpdateFilmInfoState,
  updateFilmInfo,
} from "../../store/actions/managerActions";
import { useHistory, useLocation } from "react-router-dom";
import { getFilmDetailRequest } from "../../store/api/manager";
import { checkCondition } from "../../utils/helper";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import OutsideHandler from "../../components/shared/ClickWrapper";
import { AGE_THRESHOLD, showAgeThreshold } from "../../utils/age";
import { Helmet } from "react-helmet";

const EditFilm = () => {
  const [status, setStatus] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [ageRating, setAgeRating] = useState("");
  const [showAgeRating, setShowAgeRating] = useState(false);
  const [showtimes, setShowtimes] = useState(new Date());
  const { updateFilm: updateFilmData } = useSelector((state) => state.manager);
  const dispatch = useDispatch();
  const imgRef = useRef();
  const { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const filmIdField = query.get("filmId");
  const [isLoading, setIsLoading] = useState(false);
  const [filmDetailData, setFilmDetailData] = useState({});
  const [fileInput, setFileInput] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (!filmIdField) {
      history.goBack();
    } else {
      setIsLoading(true);
      getFilmDetailRequest(filmIdField)
        .then(({ data }) => {
          setFilmDetailData(data?.data?.movie);
          setStatus(data?.data?.movie?.status?.toString());
          setShowtimes(new Date(data?.data?.movie?.showtimes));
          setAgeRating(data?.data?.movie?.ageRating);
          setIsLoading(false);
        })
        .catch((_) => {
          setIsLoading(false);
          history.goBack();
        });
    }
  }, [history, filmIdField]);

  useEffect(() => {
    if (updateFilmData?.success) {
      setTimeout(() => {
        dispatch(resetUpdateFilmInfoState());
      }, 500);
      if (updateFilmData?.data?.status === 1) {
        history.push("/manager/current");
      }
      if (updateFilmData?.data?.status === 0) {
        history.push("/manager/coming");
      }
    }
  }, [updateFilmData?.success, dispatch, history, updateFilmData.data?.status]);

  const onValid = (data) => {
    if (!status) {
      setError("status", { type: "manual", message: "????y l?? m???c b???t bu???c" });
      return;
    }
    if (!ageRating) {
      setError("ageRating", { type: "manual", message: "????y l?? m???c b???t bu???c" });
      return;
    }

    const formdata = new FormData();
    for (const property in data) {
      formdata.append(property, data[property]);
    }
    if (imgRef.current.files[0]) {
      formdata.append("coverImage", imgRef.current.files[0]);
    }
    formdata.append("status", status);
    formdata.append("ageRating", ageRating);
    formdata.append("showtimes", showtimes);
    dispatch(updateFilmInfo(filmIdField, formdata));
  };

  return (
    <main className="pb-4">
      <Helmet>
        <title> Ch???nh s???a phim </title>
      </Helmet>
      <div className="admin__create-account__wrapper text-white">
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Ch???nh s???a th??ng tin phim
        </h3>
        {isLoading && <LoadingSpinner />}
        {!isLoading && filmDetailData.movieName && (
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
                    defaultValue={checkCondition(
                      filmDetailData?.movieName,
                      filmDetailData?.movieName,
                      ""
                    )}
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
                    defaultValue={checkCondition(
                      filmDetailData?.director,
                      filmDetailData?.director,
                      ""
                    )}
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
                    className={`sign__input ${
                      errors.actor ? "input-error" : ""
                    }`}
                    defaultValue={checkCondition(
                      filmDetailData?.actor,
                      filmDetailData?.actor,
                      ""
                    )}
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
                    className={`sign__input ${
                      errors.genre ? "input-error" : ""
                    }`}
                    defaultValue={checkCondition(
                      filmDetailData?.genre,
                      filmDetailData?.genre,
                      ""
                    )}
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
                    defaultValue={checkCondition(
                      filmDetailData?.nation,
                      filmDetailData?.nation,
                      ""
                    )}
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
                    defaultValue={checkCondition(
                      filmDetailData?.amountOfTime,
                      filmDetailData?.amountOfTime,
                      ""
                    )}
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
                      {ageRating
                        ? showAgeThreshold(ageRating)
                        : "Vui l??ng ch???n"}
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
                          {item?.label}
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
              <div className="col-md-9">
                <div className="img__wrapper-input">
                  <div className="sign__group mr-3">
                    <input
                      ref={imgRef}
                      type="file"
                      className="sign__input pt-1 cursor-pointer"
                      onChange={(e) => {
                        setFileInput(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="img__preview">
                    <img
                      src={
                        fileInput
                          ? URL.createObjectURL(fileInput)
                          : filmDetailData?.coverImage
                      }
                      alt=""
                    />
                  </div>
                </div>
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
                    defaultValue={checkCondition(
                      filmDetailData?.description,
                      filmDetailData?.description,
                      ""
                    )}
                    {...register("description", {
                      required: {
                        value: true,
                        message: "????y l?? m???c b???t bu???c",
                      },
                    })}
                  />
                  {errors.description && (
                    <p className="input-required">
                      {errors.description.message}
                    </p>
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
                    className={`sign-custom__select ${
                      showStatus ? "show" : ""
                    }`}
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
                        className={`fas fa-chevron-${
                          showStatus ? "up" : "down"
                        }`}
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
                updateFilmData.isLoading ? "divDisable" : ""
              }`}
              type="submit"
            >
              {updateFilmData.isLoading ? "??ang c???p nh???t" : "X??c nh???n"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default EditFilm;
