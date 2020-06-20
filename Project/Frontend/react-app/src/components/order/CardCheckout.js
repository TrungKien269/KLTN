import React, { useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";
import data from "../../data/local.json";
import { useTranslation } from "react-i18next";
import Cleave from "cleave.js/react";
import { CalculateDistance } from "../../Utils/MapDistance";
import { GetShippingFee } from "../../Utils/ShippingFee";

function CardCheckout(props) {
  var order = [];
  var proceedOrder = [];

  const { t, i18n } = useTranslation();

  const [cartBook, setCartBook] = useState(null);
  const [userInfor, setUserInfor] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cvc, setCVC] = useState("");
  const [message, setMessage] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const [discount, setDiscount] = useState(0);

  const [timeTyping, setTimeTyping] = useState(null);

  const loadStripe = () => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_0swCVi6RPjNzaBrm6O2PgZ0S00nyCBUalf"
        );
      };
      window.document.body.appendChild(s);
    }
  };

  useEffect(() => {
    loadStripe();
    setCities(data);
    setShippingFee(25000);
  }, []);

  useEffect(() => {
    if (props.userInfo) {
      setUserInfor(props.userInfo);
      setFullName(props.userInfo.fullName);
      setPhoneNumber(props.userInfo.phoneNumber);
      setAddress(props.userInfo.address);
    }
  }, [props.userInfo]);

  useEffect(() => {
    if (props.cartBook) {
      setCartBook(props.cartBook);
    }
  }, [props.cartBook]);

  useEffect(() => {
    if (props.discount) {
      setDiscount(parseFloat(props.discount));
    }
  }, [props.discount]);

  proceedOrder = useMemo(() => {
    if (cartBook) {
      let x = [];
      var total = 0;
      x = cartBook.cartBook;
      for (let i = 0; i < x.length; i++) {
        total = total + parseInt(x[i].subTotal);
        order.push({
          bookID: x[i].bookId,
          bookName: x[i].book.name,
          currentPrice: x[i].book.currentPrice,
          quantity: x[i].quantity,
        });
      }
      setOrderTotal(parseInt(total) + shippingFee);
    }
    return order;
  }, [cartBook, orderTotal]);

  const showListCity = useMemo(() => {
    let cityItems = [];
    if (cities && cities.length > 0) {
      cityItems = cities.map((city) => {
        return <option value={city.id}>{city.name}</option>;
      });
    }
    return cityItems;
  }, [cities]);

  const SelectCity = (e) => {
    if (e.target.value) {
      setCity(cities[parseInt(e.target.value) - 1].name);
    }
  };

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAdressChange = (event) => {
    var value = event.target.value;
    if (timeTyping) {
      clearTimeout(timeTyping);
    }
    setTimeTyping(
      setTimeout(() => {
        setAddress(value);
      }, 1500)
    );
  };

  useEffect(() => {
    if (city != "" && address != "") {
      var fullAddress = address + " " + city;
      CalculateDistance(fullAddress).then((res) => {
        setShippingFee(parseInt(GetShippingFee(res)));
        props.shippingFeeChanged(GetShippingFee(res));
      });
    }
  }, [address, city]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCardNumberChange = (evt) => {
    setCardNumber(evt.target.value);
  };

  const handleExpMonthChange = (evt) => {
    setExpMonth(evt.target.value);
  };

  const handleExpYearChange = (evt) => {
    setExpYear(evt.target.value);
  };

  const handleCVCChange = (evt) => {
    setCVC(evt.target.value);
  };

  const Pay = (e) => {
    e.preventDefault();
    window.Stripe.card.createToken(
      {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
      },
      (status, response) => {
        if (status === 200) {
          Axios({
            headers: {
              Authorization: "Bearer " + getToken(),
            },
            method: "post",
            url: "http://localhost:5000/api/ProceedOrder/CardCheckout",
            params: {
              stripeEmail: email,
              stripeToken: response.id,
              type: "Card",
              total: parseInt(orderTotal) - parseInt(orderTotal) * discount,
              shippingFee: parseInt(shippingFee),
              fullName: fullName,
              phoneNumber: phonenumber,
              address: address + " " + city,
            },
            data: proceedOrder,
          })
            .then((res) => {
              if (res.data.status) {
                setCartBook(null);
                props.isCheckout(true);
                Swal.fire({
                  title: "Success",
                  text: "Your order is on processing",
                  icon: "success",
                  confirmButtonText: "Back to store",
                }).then(() => {
                  Axios({
                    headers: {
                      Authorization: "Bearer " + getToken(),
                    },
                    method: "delete",
                    url: "http://localhost:5000/api/UserCart/ResetCart",
                  });
                });
              } else {
                Swal.fire({
                  title: "Error",
                  text: res.data.message,
                  icon: "error",
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                text: err,
                icon: "error",
              });
            });
        } else {
          console.log(status);
          console.log(response);
          alert("Error");
        }
      }
    );
  };

  return (
    <div>
      <div className="title-wrapper">
        <h2>{t("Please provide complete information")}</h2>
      </div>
      <form className="payment-form">
        {/* <div className="d-flex flex-row justify-content-between align-items-center p-3">
          <h2>Payment Form</h2>
          <img
            className="w-10"
            src={process.env.PUBLIC_URL + "/img/card.png"}
          ></img>
        </div> */}

        <div className="panel-body mt-5 p-3">
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <div className="form-group">
                <label>EMAIL</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Your email"
                  value={email !== "" ? email : ""}
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("NAME")}</label>
                    <input
                      type="text"
                      placeholder={t("Your name")}
                      id="name"
                      className="form-control"
                      defaultValue={userInfor && userInfor.fullName}
                      onChange={(e) => handleNameChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <label>{t("PHONE NUMBER")}</label>
                    <input
                      type="number"
                      placeholder={t("Phone number")}
                      id="number"
                      className="form-control"
                      defaultValue={userInfor && userInfor.phoneNumber}
                      onChange={(e) => handlePhoneChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("CITY")}</label>
                    <select
                      name="city"
                      id="cbCity"
                      className="form-control"
                      onChange={(e) => SelectCity(e)}
                    >
                      <option selected hidden>
                        {t("Choose City")}
                      </option>
                      {showListCity}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>{t("ADDRESS")}</label>
                    <input
                      className="form-control"
                      placeholder={t("Your detail address")}
                      defaultValue={userInfor && userInfor.address}
                      onChange={(e) => handleAdressChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-9 mt-3">
                  <div className="form-group">
                    <label>CARD NUMBER</label>
                    <div className="input-group">
                      <Cleave
                        className="form-control"
                        name="cardNumber"
                        maxLength="20"
                        placeholder="Enter your credit card number"
                        options={{ creditCard: true }}
                        onChange={(e) => handleCardNumberChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xs-5 col-md-3 pull-right mt-3">
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="number"
                      name="cvv"
                      className="form-control"
                      placeholder="CVC"
                      maxLength="4"
                      onChange={(e) => handleCVCChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-xs-7 col-md-7">
              <div className="form-group">
                <label>
                  <span className="hidden-xs">EXPIRATION</span> DATE
                </label>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        name="expMonth"
                        className="form-control"
                        onChange={(e) => handleExpMonthChange(e)}
                      >
                        <option value="">Select Month</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pull-right">
                    <div className="form-group">
                      <select
                        name="expYear"
                        className="form-control"
                        onChange={(e) => handleExpYearChange(e)}
                      >
                        <option value="">Select Year</option>
                        <option value="20">2020</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                        <option value="23">2023</option>
                        <option value="24">2024</option>
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                        <option value="28">2028</option>
                        <option value="29">2029</option>
                        <option value="30">2030</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer p-0 mt-3">
          <div className="d-flex flex-row">
            <button className="btn btn-reset btn-block h-100 m-0 w-50 text-left">
              <i class="fas fa-chevron-left mr-2"></i>
              Reset
            </button>
            <button
              type="submit"
              className="btn btn-payment btn-block m-0 h-100 w-50 text-right"
              onClick={(e) => Pay(e)}
            >
              Confirm
              <i class="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      </form>

      {/* <form className="form-checkout">
        <input
          type="email"
          placeholder={t("Email for receive notification")}
          id="email"
          defaultValue={userInfor && userInfor.account.email}
          onChange={(e) => handleEmailChange(e)}
        />
        <input
          type="text"
          placeholder={t("Your name")}
          id="name"
          defaultValue={userInfor && userInfor.fullName}
          onChange={(e) => handleNameChange(e)}
        />
        <input
          type="number"
          placeholder={t("Phone number")}
          id="number"
          defaultValue={userInfor && userInfor.phoneNumber}
          onChange={(e) => handlePhoneChange(e)}
        />
        <select
          name="city"
          id="cbCity"
          className="form-control"
          onChange={(e) => SelectCity(e)}
        >
          <option selected hidden>
            {t("Choose City")}
          </option>
          {showListCity}
        </select>
        <textarea
          name
          id
          cols={30}
          rows={5}
          placeholder={t("Your detail address")}
          defaultValue={userInfor && userInfor.address}
          onChange={(e) => handleAdressChange(e)}
        />

        <Cleave
          className="form-control"
          name="cardNumber"
          id="numbers"
          maxLength="20"
          placeholder="Enter your credit card number"
          options={{ creditCard: true }}
          onChange={(e) => handleCardNumberChange(e)}
        />
        <div className="container">
          <div className="row">
            <div className="col-xs-7 col-md-7">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        name="expMonth"
                        className="form-control"
                        onChange={(e) => handleExpMonthChange(e)}
                      >
                        <option value="">Select Month</option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 pull-right">
                    <div className="form-group">
                      <select
                        name="expYear"
                        className="form-control"
                        onChange={(e) => handleExpYearChange(e)}
                      >
                        <option value="">Select Year</option>
                        <option value="20">2020</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                        <option value="23">2023</option>
                        <option value="24">2024</option>
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                        <option value="28">2028</option>
                        <option value="29">2029</option>
                        <option value="30">2030</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-5 col-md-5 pull-right">
                    <div className="form-group">
                      <input
                        type="number"
                        name="cvv"
                        className="form-control"
                        placeholder="CVC"
                        maxLength="4"
                        onChange={(e) => handleCVCChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="button"
          defaultValue={t("Confirm your order")}
          className="btn btn--rounded btn-fit btn--blue"
          onClick={(e) => Pay(e)}
        />
      </form> */}
    </div>
  );
}

export default CardCheckout;
