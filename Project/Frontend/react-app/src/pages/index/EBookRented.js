import React, { Component, useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";
import Cleave from "cleave.js/react";
import { useTranslation } from 'react-i18next';

function EBookRented(props) {

  const [email, setEmail] = useState("");
  const [cvc, setCVC] = useState("");
  const [message, setMessage] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [policy, setPolicy] = useState(null);

  const { t, i18n } = useTranslation();

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
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/ProceedOrder/OrderUserInfo"
    }).then((res) => {
      if(res.data.status){
        setEmail(res.data.obj.account.email)
      }
    })
  }, []);

  const handleEmailChange = evt => {
    setEmail(evt.target.value);
  }

  const handleCardNumberChange = evt => {
    setCardNumber(evt.target.value);
  };

  const handleExpMonthChange = evt => {
    setExpMonth(evt.target.value);
  };

  const handleExpYearChange = evt => {
    setExpYear(evt.target.value);
  };

  const handleCVCChange = evt => {
    setCVC(evt.target.value);
  };

  const handlePolicyChange = evt => {
    setPolicy(evt.target.value);
  }

  const pay = e => {
    e.preventDefault();
    if(policy === null){
      Swal.fire({
        title: "Error",
        text: "You have to choose one policy",
        icon: "error",
      });
    }
    else{
      Swal.fire({
        title: "Confirm",
        text: "Do you want to begin a payment?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, pay!",
      }).then((result) => {
        if(result.value){
          window.Stripe.card.createToken(
            {
              number: cardNumber,
              exp_month: expMonth,
              exp_year: expYear,
              cvc: cvc
            }, (status, response) => {
              if (status === 200){
                Axios({
                  headers: {
                    Authorization: "Bearer " + getToken()
                  },
                  method: "post",
                  url: "http://localhost:5000/api/EBook/RentEBook",
                  params: {
                    stripeEmail: email,
                    stripeToken: response.id,
                    policyID: parseInt(policy)
                  }
                }).then((res) => {
                  if (res.data.status) {
                    Swal.fire({
                      title: "Success",
                      text: "You can read ebook now",
                      icon: "success",
                      confirmButtonText: "Back to ebook page",
                    }).then(() => {
                      props.history.push("/ebooks/");
                    });
                  }
                  else {
                    Swal.fire({
                      title: "Error",
                      text: res.data.message,
                      icon: "error",
                    });
                  }
                }).catch((err) => {
                  Swal.fire({
                    title: "Error",
                    text: err,
                    icon: "error",
                  });
                });
              }
              else{
                Swal.fire({
                  title: "Error",
                  text: "Error when payment!",
                  icon: "error",
                });
              }
            })
        }
      })
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-7">
          <div className="panel panel-default">
            <form onSubmit={e => pay(e)}>
              <div className="panel-body mt-5">
                <h4>Rent EBook</h4>
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
                        onChange={e => handleEmailChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <label>CARD NUMBER</label>
                      <div className="input-group">
                        <Cleave
                          className="form-control"
                          name="cardNumber"
                          maxLength="20"
                          placeholder="Enter your credit card number"
                          options={{ creditCard: true }}
                          onChange={e => handleCardNumberChange(e)}
                        />
                        <span className="input-group-addon">
                          <span className="fa fa-credit-card"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
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
                              onChange={e => handleExpMonthChange(e)}
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
                              onChange={e => handleExpYearChange(e)}
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
                  <div className="col-xs-5 col-md-5 pull-right">
                    <div className="form-group">
                      <label>CVV CODE</label>
                      <input
                        type="number"
                        name="cvv"
                        className="form-control"
                        placeholder="CVC"
                        maxLength="4"
                        onChange={e => handleCVCChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer">
                <div className="row">
                  <div className="col-xs-12 col-md-6">
                    <button className="btn btn-primary btn-lg btn-block">
                      Pay
                    </button>
                  </div>
                  <div className="col-xs-12 col-md-6">
                    <button className="btn btn-Secondary btn-lg btn-block">
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-xs-12 col-md-5">
          <div className="panel panel-default">
            <div className="panel-body mt-5">
              <h4>Choose Rental Package</h4>
              <div className="row">
                <div className="col-xs-12 col-md-12">
                  <div class="form-check">
                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" id="defaultGroupExample1" name="groupOfDefaultRadios"
                        value={1} onChange={handlePolicyChange}/>
                      <label class="custom-control-label" for="defaultGroupExample1">
                        1 Month - 
                      <NumberFormat
                          value={" 50000"}
                          thousandSeparator={true}
                          displayType={"text"}
                          suffix=" VND"
                          prefix={" "}
                        ></NumberFormat>
                      </label>
                    </div>

                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" id="defaultGroupExample2" name="groupOfDefaultRadios"
                        value={2} onChange={handlePolicyChange}/>
                      <label class="custom-control-label" for="defaultGroupExample2">
                        6 Months - 
                        <NumberFormat
                          value={" 250000"}
                          thousandSeparator={true}
                          displayType={"text"}
                          suffix=" VND"
                          prefix={" "}
                        ></NumberFormat>
                      </label>
                    </div>

                    <div class="custom-control custom-radio">
                      <input type="radio" class="custom-control-input" id="defaultGroupExample3" name="groupOfDefaultRadios"
                        value={3} onChange={handlePolicyChange}/>
                      <label class="custom-control-label" for="defaultGroupExample3">
                        1 Year - 
                      <NumberFormat
                          value={" -500000"}
                          thousandSeparator={true}
                          displayType={"text"}
                          suffix=" VND"
                          prefix={" "}
                        ></NumberFormat>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(EBookRented)
