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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (createFilmData?.success) {
      reset();
      setStatus("");
      setAgeRating("");

      const timer = setTimeout(() => {
        dispatch(resetCreateNewFilmState());
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [createFilmData?.success, reset, dispatch]);

  useEffect(() => {
    setPreviewImageSrc(
      imgRef?.current?.files?.[0]
        ? URL?.createObjectURL(imgRef?.current?.files?.[0])
        : ""
    );
  }, [imgRef]);

  const onValid = (data) => {
    if (!imgRef || !imgRef.current || !imgRef.current.files) {
      setImgError("Đây là mục bắt buộc");
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
        <title> Tạo mới phim </title>
      </Helmet>
      <div className="admin__create-account__wrapper text-white">
        <h3 className="border-bottom d-inline-block pb-1 border-white mb-4">
          Tạo mới phim
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Tên phim</p>
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
                      message: "Đây là mục bắt buộc",
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
              <p>Đạo diễn</p>
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
                      message: "Đây là mục bắt buộc",
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
              <p>Diễn viên</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${errors.actor ? "input-error" : ""}`}
                  {...register("actor", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
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
              <p>Thể loại</p>
            </div>
            <div className="col-md-9">
              <div className="sign__group">
                <input
                  type="text"
                  className={`sign__input ${errors.genre ? "input-error" : ""}`}
                  {...register("genre", {
                    required: {
                      value: true,
                      message: "Đây là mục bắt buộc",
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
              <p>Quốc gia</p>
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
                      message: "Đây là mục bắt buộc",
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
              <p>Thời lượng</p>
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
                      message: "Đây là mục bắt buộc",
                    },
                  })}
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
              <p>Khởi chiếu</p>
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
              <p>Giới hạn tuổi</p>
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
                    {ageRating ? showAgeThreshold(ageRating) : "Vui lòng chọn"}
                  </li>
                  <ul
                    className={`${showAgeRating ? "show" : ""}`}
                    style={{
                      height: "auto",
                    }}
                  >
                    {AGE_THRESHOLD.map((item) => (
                      <li key={item.key} onClick={() => setAgeRating(item.key)}>
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
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Ảnh Cover</p>
            </div>
            <div className="col-md-5">
              <div className="sign__group">
                <input ref={imgRef} type="file" className="sign__input pt-1" />
                {imgError && <p className="input-required">{imgError}</p>}
              </div>
            </div>
            <div className="col-md-4 img__preview">
              {imgRef && <img src={previewImageSrc} alt={previewImageSrc} />}
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-3">
              <p>Nội dung</p>
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
                      message: "Đây là mục bắt buộc",
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
              <p>Loại phim</p>
            </div>
            <div className="col-md-9">
              <OutsideHandler callback={() => setShowStatus(false)}>
                <div
                  className={`sign-custom__select ${showStatus ? "show" : ""}`}
                  onClick={() => setShowStatus((prevState) => !prevState)}
                >
                  <li className="gender__text">
                    {status ? convertStatusToText(status) : "Vui lòng chọn"}
                  </li>
                  <ul
                    className={`${showStatus ? "show" : ""}`}
                    style={{
                      height: 95,
                    }}
                  >
                    <li onClick={() => setStatus("1")}>Phim đang chiếu</li>
                    <li onClick={() => setStatus("0")}>Phim sắp chiếu</li>
                  </ul>
                  <button className="sign__select-icon">
                    <i
                      className={`fas fa-chevron-${showStatus ? "up" : "down"}`}
                    ></i>
                  </button>
                </div>
              </OutsideHandler>
            </div>
          </div>
          <button
            className={`btn__outline-orange mx-auto my-4 ${
              createFilmData.isLoading ? "divDisable" : ""
            }`}
            type="submit"
          >
            {createFilmData.isLoading ? "Đang tạo phim" : "Tạo phim"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewFilm;
