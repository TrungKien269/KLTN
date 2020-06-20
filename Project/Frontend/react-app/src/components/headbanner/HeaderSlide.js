import React from "react";
import ServiceBar from "./ServiceBar";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";

function HeaderSlide() {
  const options = {
    nav: true,
    items: 1,
    margin: 10,
    loop: true,
    autoWidth: false,
    dots: false,
    navText: [
      "<span aria-label='Previous'>‹</span>",
      "<span aria-label='Next'>›</span>",
    ],
  };
  return (
    <header className="header">
      <OwlCarousel options={options}>
        <div className="item">
          <div className="promo-text promo-text--right">
            <h3 className="wow slideInLeft">Back to school</h3>
            <div
              className="promo-text-sub wow slideInRight"
              data-wow-delay=".5s"
            >
              Special
              <h3>50%OFF</h3>
            </div>
            <h2 className="wow fadeInUp hidden-md-elements" data-wow-delay="1s">
              for our student community
            </h2>
            <Link
              to="/collections"
              className="btn btn--rounded btn--lg btn--blue wow fadeIn"
              data-wow-delay="1.5s"
            >
              Go shopping
            </Link>
          </div>
          <img
            className="d-block w-100"
            src="img/img__sale.webp"
            alt="First slide"
          />
        </div>
      </OwlCarousel>

      <ServiceBar />
    </header>
  );
}

export default HeaderSlide;
