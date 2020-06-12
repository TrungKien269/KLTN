import React, { Component, useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";
import data from '../../data/local.json';
import { useTranslation } from 'react-i18next';
import { Tab, Button } from "semantic-ui-react";
import CardCheckout from './CardCheckout';
import PayPalCheckout from './PayPalCheckout';
import { CalculateDistance } from "../../Utils/MapDistance";
import { GetShippingFee } from "../../Utils/ShippingFee"

const ProceedCheckout = (props) => {
  var order = [];
  var proceedOrder = [];
  const { t, i18n } = useTranslation();
  const codName = t('Cash on Delivery');
  const cardName = t('Card');
  const paypalName = t('PayPal');

  const [cartBook, setCartBook] = useState(null);
  const [userInfor, setUserInfor] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const [orderTotal, setOrderTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const [isCheckout, setIsCheckout] = useState(false);

  const [timeTyping, setTimeTyping] = useState(null);

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const emailRef = useRef(null);

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAdressChange = (event) => {
    var value = event.target.value;
    if (timeTyping) {
      clearTimeout(timeTyping)
    }
    setTimeTyping(setTimeout(() => {
      setAddress(value);
    }, 1500));
  };

  const handleShippingFeeChange = (fee) => {
    setShippingFee(parseInt(fee));
  }

  useEffect(() => {
    if(city != "" && address != ""){
      var fullAddress = address + " " + city;
      CalculateDistance(fullAddress).then((res) => {
        alert(GetShippingFee(res));
        setShippingFee(parseInt(GetShippingFee(res)));
      });
    }
  }, [address, city]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleCheckout = (check) => {
    if(check === true){
      setCartBook(null);
    }
  }

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/ProceedOrder/ListCartBook",
    }).then((res) => {
      setCartBook(res.data.obj);
    });
  }, []);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/ProceedOrder/OrderUserInfo",
    }).then((res) => {
      setUserInfor(res.data.obj);
      setFullName(res.data.obj.fullName);
      setPhoneNumber(res.data.obj.phoneNumber);
      setAddress(res.data.obj.address);
    });
  }, []);

  useEffect(() => {
    setCities(data);
    setShippingFee(25000);
  }, [])

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
  }, [cartBook, orderTotal, shippingFee]);

  const handleSubmit = () => {
    if (proceedOrder.length > 0) {
      Swal.fire({
        title: "Confirm",
        text: "Do you want to check out?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, check out!",
      }).then((result) => {
        if (result.value) {
          Axios({
            headers: {
              Authorization: "Bearer " + getToken(),
            },
            method: "post",
            url: "http://localhost:5000/api/ProceedOrder/CODCheckout",
            params: {
              email: email,
              type: "COD",
              shippingFee: shippingFee,
              fullName: fullName,
              phoneNumber: phonenumber,
              address: address,
            },
            data: proceedOrder,
          })
            .then((res) => {
              if (res.data.status) {
                setCartBook(null);
                Swal.fire({
                  title: "Success",
                  text: "Your order is on processing",
                  icon: "success",
                  confirmButtonText: "Back to store",
                }).then(() => {
                  props.history.push("/collections/");
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
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "You must select one or more books before checking out!",
        icon: "error",
      });
    }
  };

  const SelectCity = (e) => {
    if (e.target.value) {
      setCity(e.target.value)
    }
  }

  const showListProduct = useMemo(() => {
    let orderBlock = [];
    let x = [];
    if (cartBook) {
      x = cartBook.cartBook;
      if (x.length > 0) {
        for (let i = 0; i < x.length; i++) {
          orderBlock = x.map((item) => {
            return (
              <div className="product-block">
                <div className="row">
                  <div className="col-3 pad-0-0">
                    <Link to={`/book/${item.bookId}`}>
                      <img src={item.book.image} className="img-cover" alt="" />
                    </Link>
                  </div>
                  <div className="col">
                    <div className="product-name">
                      <Link to={`/book/${item.bookId}`}>{item.book.name}</Link>
                    </div>
                    <div className="product-price">
                      {
                        <NumberFormat
                          value={item.book.currentPrice}
                          thousandSeparator={true}
                          displayType="text"
                          suffix={" VND"}
                        ></NumberFormat>
                      }
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td className="first">{t('Delivery type')}</td>
                          <td className="second">{t('Shipping')}</td>
                        </tr>
                        <tr>
                          <td className="first">{t('Product code')}</td>
                          <td className="second">{item.bookId}</td>
                        </tr>
                        <tr>
                          <td className="first">{t('Amount')}</td>
                          <td className="second">{item.quantity}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          });
        }
      }
    }
    return orderBlock;
  });

  const showListCity = useMemo(() => {
    let cityItems = [];
    if (cities && cities.length > 0) {
      cityItems = cities.map((city) => {
        return (
          // <option value={city.ID}>{city.Title}</option>
          <option value={city.id}>{city.name}</option>
        )
      });
    }
    return cityItems;
  }, [cities]);

  const panes = [
    {
      menuItem: codName,
      pane: (
        <Tab.Pane>
          <div className="title-wrapper">
            <h2>{t('Please provide complete information')}</h2>
          </div>
          <form className="form-checkout">
            <input
              type="email"
              placeholder={t('Email for receive notification')}
              id="email"
              defaultValue={userInfor && userInfor.account.email}
              ref={emailRef}
              onChange={(e) => handleEmailChange(e)}
            />
            <input
              type="text"
              placeholder={t('Your name')}
              id="name"
              defaultValue={userInfor && userInfor.fullName}
              ref={fullNameRef}
              onChange={(e) => handleNameChange(e)}
            />
            <input
              type="number"
              placeholder={t('Phone number')}
              id="number"
              defaultValue={userInfor && userInfor.phoneNumber}
              ref={phoneRef}
              onChange={(e) => handlePhoneChange(e)}
            />
            <select name="city" id="cbCity" className="form-control"
              onChange={(e) => SelectCity(e)}>
              <option selected hidden>{t('Choose City')}</option>
              {showListCity}
            </select>
            <textarea
              name
              id
              cols={30}
              rows={5}
              placeholder={t('Your detail address')}
              defaultValue={userInfor && userInfor.address}
              ref={addressRef}
              onChange={(e) => handleAdressChange(e)}
            />
            <input
              type="button"
              defaultValue={t('Confirm your order')}
              className="btn btn--rounded btn-fit btn--blue"
              onClick={() => handleSubmit()}
            />
          </form>
        </Tab.Pane>
      )
    },
    {
      menuItem: cardName,
      pane: (
        <Tab.Pane>
          <CardCheckout userInfo={userInfor}
            cartBook={cartBook} isCheckout={(check) => handleCheckout(check)}
            shippingFeeChanged={(fee) => handleShippingFeeChange(fee)}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: paypalName,
      pane: (
        <Tab.Pane>
          <PayPalCheckout userInfo={userInfor}
            cartBook={cartBook} isCheckout={(check) => handleCheckout(check)}
            shippingFeeChanged={(fee) => handleShippingFeeChange(fee)}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <div>
      <section className="section__checkout">
        <div className="cart-title">
          <h2>{t('check out')}</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <Tab panes={panes} renderActiveOnly={false} />
            </div>
            <div className="col-md">
              <div className="order">
                <div className="title-wrapper">
                  <h2 style={{
                    textAlign: "center"
                  }}>{t('Your Order')}</h2>
                </div>
                <div className="title-wrapper">
                  <h2>{t('Shipping Fee')}</h2>
                  <div className="product-price">
                    {
                      <NumberFormat
                        value={shippingFee}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix=" VND"
                      ></NumberFormat>
                    }
                  </div>
                </div>
                <div className="title-wrapper">
                  <h2>{t('Total')}</h2>
                  <div className="product-price">
                    {
                      <NumberFormat
                        value={orderTotal}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix=" VND"
                      ></NumberFormat>
                    }
                  </div>
                </div>
              </div>
              {showListProduct}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(ProceedCheckout);
