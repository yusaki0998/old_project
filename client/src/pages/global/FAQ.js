import React from "react";
import { Helmet } from "react-helmet";

const FAQ = () => {
  return (
    <>
      <Helmet>
        <title>Hotflix FAQ</title>
      </Helmet>
      <section
        className="section section--first section--bg"
        data-bg="img/section/section.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                <h2 className="section__title">FAQ</h2>
                <ul className="breadcrumb">
                  <li className="breadcrumb__item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--active">
                    FAQ
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section section--top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  Why is a Video is not loading?
                </h3>
                <p className="faq__text">
                  All the Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet. Various versions have evolved over
                  the years, sometimes by accident, sometimes on purpose
                  (injected humour and the like).
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  Why isn't there a HD version of this video?
                </h3>
                <p className="faq__text">
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy.
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  Why is the sound distorted?
                </h3>
                <p className="faq__text">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  Why is the Video stuttering, buffering or randomly stopping?
                </h3>
                <p className="faq__text">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  When I change the quality of a video, nothing happens.
                </h3>
                <p className="faq__text">
                  If you are going to use a passage of Lorem Ipsum, you need to
                  be sure there isn't anything embarrassing hidden in the middle
                  of text.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  Why isn't the video starting at the beginning?
                </h3>
                <p className="faq__text">
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  How do I make the Video go Fullscreen?
                </h3>
                <p className="faq__text">
                  It uses a dictionary of over 200 Latin words, combined with a
                  handful of model sentence structures, to generate Lorem Ipsum
                  which looks reasonable. The generated Lorem Ipsum is therefore
                  always free from repetition, injected humour, or
                  non-characteristic words etc.
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  What Browsers are supported?
                </h3>
                <p className="faq__text">
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  How do you handle my privacy?
                </h3>
                <p className="faq__text">
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose (injected humour and the like).
                </p>
              </div>

              <div className="faq">
                <h3 className="faq__title">
                  <i className="icon ion-ios-information-circle-outline"></i>{" "}
                  How can I contact you?
                </h3>
                <p className="faq__text">
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
