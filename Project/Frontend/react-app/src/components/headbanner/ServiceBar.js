import React from "react";

function ServiceBar() {
  return (
    <div className="service-bar">
      <div className="container">
        <div className="owl-carousel owl-service owl-theme">
          <div className="service-item">
            <div className="service-img">
              <img src="img/delivery-icon.webp" alt="/" />
            </div>
            <div className="service-text">
              <div className="service-title">Quick delivery</div>
              <div className="service-caption">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <img src="img/payment-icon.webp" alt="" />
            </div>
            <div className="service-text">
              <div className="service-title">Pay with Easy</div>
              <div className="service-caption">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <img src="img/deal-icon.webp" alt="" />
            </div>
            <div className="service-text">
              <div className="service-title">best deal</div>
              <div className="service-caption">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </div>
            </div>
          </div>
          <div className="service-item">
            <div className="service-img">
              <img src="img/secured-icon.webp" alt="" />
            </div>
            <div className="service-text">
              <div className="service-title">secured payment</div>
              <div className="service-caption">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceBar;
