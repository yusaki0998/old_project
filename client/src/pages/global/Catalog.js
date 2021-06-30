import React from "react";
import { Link } from "react-router-dom";
import PremiereMovies from "../../components/main/PremiereMovies";
import PricePlan from "../../components/main/PricePlan";
import FilterEngine from "../../components/main/catalog/FilterEngine";
import FilterResult from "../../components/main/catalog/FilterResult";
import Paginator from "../../components/shared/Paginator";

const Catalog = () => {
  return (
    <>
      <section
        className="section section--first section--bg"
        data-bg="img/section/section.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                <h1 className="section__title">Catalog</h1>

                <ul className="breadcrumb">
                  <li className="breadcrumb__item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--active">
                    Catalog
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FilterEngine />
      <FilterResult />
      <Paginator />
      <PremiereMovies />
      <PricePlan />
    </>
  );
};

export default Catalog;
