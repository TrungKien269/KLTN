import React, { useState } from "react";
import MapContainer from "./MapContainer";
import Swal from "sweetalert2";
import Axios from "axios";

function Footer() {
  const [email, setEmail] = useState();

  const handleEmailChange = (e) => {
    var value = e.target.value;
    if (value) {
      setEmail(value);
    }
  };

  const handleSubscribe = () => {
    if (validateEmail(email)) {
      Axios({
        url: "http://localhost:5000/api/Main/Subcribe",
        method: "post",
        params: {
          email: email,
        },
      }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Subcribe email successfully!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have to type email correctly!",
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <footer className="footer">
      <div className="subcribe-form">
        <div className="blur-layer-text">
          <h2>Subcribe to our new letters</h2>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="email"
              className="input__subcribe"
              placeholder="Enter your e-mail address"
              onChange={(e) => handleEmailChange(e)}
            />
            <button
              className="btn btn--rounded btn-fit btn--blue"
              onClick={handleSubscribe}
            >
              Subcribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mar-top-lg">
        <div className="row"
          style={{
            width: `50%`,
            height: `300px`,
            backgroundColor: `grey`,
            marginTop: `-2%`,
            marginBottom: `2%`,
            marginLeft: `50%`,
            transform: `translateX(-50%)`
          }}> 
          {/*<MapContainer></MapContainer> */}
        </div> 
        <div className="row">
          <div className="col-md-3">
            <img src="img/footer_logo.webp" alt="" />
            <p>
              Provides clients with solutions to their same-day delivery needs.
              You can make your payments in various ways, fast and easy. We're
              confident if you buy any of these now, you're getting a good deal.
              A safer, faster, more secure way to pay online with, your
              payments.
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
              1 Vo Van Ngan, Thu Duc Dist, Ho Chi Minh, VietNam BOX: 553204
              Phone: (+84) 987654321 Mail: admin@bookshop.com
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
                <a href="/">
                  <i className="fab fa-facebook-f" />
                  Facebook
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fab fa-twitter" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fab fa-google-plus-g" />
                  Google Plus
                </a>
              </li>
              <li>
                <a href="/">
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
                <a href="/">About us</a>
              </li>
              <li>
                <a href="/">Term &amp; Condition</a>
              </li>
              <li>
                <a href="/">Contact us</a>
              </li>
              <li>
                <a href="/">My account</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
