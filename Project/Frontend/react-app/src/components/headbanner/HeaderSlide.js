import React from "react";
import ServiceBar from "./ServiceBar";
import { Link } from "react-router-dom";

function HeaderSlide() {
  return (
    <header className="header">
      <div
        id="carouselExampleControls"
        className="carousel slide display-on-hover"
        data-ride="carousel"
        data-interval={0}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container-slide">
              <div className="promo-text promo-text--right">
                <h3 className="wow slideInLeft">Back to school</h3>
                <div
                  className="promo-text-sub wow slideInRight"
                  data-wow-delay=".5s"
                >
                  Special
                  <h3>50%OFF</h3>
                </div>
                <h2
                  className="wow fadeInUp hidden-md-elements"
                  data-wow-delay="1s"
                >
                  for our student community
                </h2>
                <a
                  href="/"
                  className="btn btn--rounded btn--lg btn--blue wow fadeIn"
                  data-wow-delay="1.5s"
                >
                  get the deal
                </a>
              </div>
              <img
                className="d-block w-100"
                src="img/img__sale.webp"
                alt="First slide"
              />
            </div>
          </div>
          <div className="carousel-item">
            <div className="container-slide display-on-hover">
              <div className="promo-text promo-text--center item-display hidden-md-elements">
                <h3 className="wow slideInLeft">Benefit of reading</h3>
                <div
                  className="promo-text-sub wow slideInRight"
                  data-wow-delay=".5s"
                >
                  <h2>Getting smart,thin,healthy and happy</h2>
                </div>
                <p className="wow fadeInRight" data-wow-delay="1s">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aperia
                </p>
                <Link
                  to={"/collections/"}
                  className="btn btn--rounded btn--blue wow fadeIn"
                  data-wow-delay="1.5s"
                >
                  view collections
                </Link>
              </div>
              <video src="data/video.mp4" autoPlay loop muted preload="auto" />
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev item-display"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <i className="fas fa-chevron-left" />
        </a>
        <a
          className="carousel-control-next item-display"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <i className="fas fa-chevron-right" />
        </a>
      </div>
      <ServiceBar />
    </header>
  );
}

export default HeaderSlide;
