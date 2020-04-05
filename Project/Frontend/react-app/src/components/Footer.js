import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="subcribe-form">
        <div className="blur-layer-text">
          <h2>Subcribe to our new letters</h2>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="text"
              className="input__subcribe"
              placeholder="Enter your e-mail address"
            />
            <a href="#" className="btn btn--rounded btn-fit btn--blue">
              Subcribe
            </a>
          </div>
        </div>
      </div>
      <div className="container mar-top-lg">
        <div className="row">
          <div className="col-md-3">
            <img src="img/footer_logo.webp" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
              architecto commodi corporis, quae repudiandae nisi dolorum
              explicabo illum consequuntur magnam hic nemo quisquam optio
              voluptas ipsam, aperiam veritatis nulla alias?
            </p>
          </div>
          <div className="col-md-3">
            <h4>
              <span
                className="icon"
                style={{ backgroundImage: 'url("img/footer_icon_2.webp")' }}
              />
              Our main office
            </h4>
            <p>
              San Francisco, California, US P.O. BOX: 553204 Phone: (+1) 998
              3384 Mail: admin@bookshop.com
            </p>
          </div>
          <div className="col-md-3">
            <h4>
              <span
                className="icon"
                style={{ backgroundImage: 'url("img/footer_icon_3.webp")' }}
              />
              keep in touch with us
            </h4>
            <ul className="footer__infor">
              <li>
                <a href="#">
                  <i className="fab fa-facebook-f" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-twitter" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-google-plus-g" />
                  Google Plus
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>
              <span
                className="icon"
                style={{ backgroundImage: 'url("img/footer_icon_3.webp")' }}
              />
              information
            </h4>
            <ul className="footer__infor">
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Term &amp; Condition</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
              <li>
                <a href="#">My account</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
