/** @format */

import React from "react";
import projectImg from "../../template/styles/main/img/gallery/project-1.jpg";

const MoviePhotos = () => {
  return (
    <div
      className="tab-pane fade"
      id="tab-1"
      role="tabpanel"
      aria-labelledby="1-tab"
    >
      <div className="gallery" itemScope>
        <div className="row row--grid">
          <figure
            className="col-12 col-sm-6 col-xl-4"
            itemProp="associatedMedia"
            itemScope
          >
            <a
              href="img/gallery/project-1.jpg"
              itemProp="contentUrl"
              data-size="1920x1280"
            >
              <img
                src={projectImg}
                itemProp="thumbnail"
                alt="movie description"
              />
            </a>
            <figcaption itemProp="caption description">
              Some image caption 1
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MoviePhotos;
