import React, { useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";
import data from '../../data/local.json';
import { useTranslation } from 'react-i18next';
import { PayPalButton } from "react-paypal-button-v2";
import { CalculateDistance } from "../../Utils/MapDistance";
import { GetShippingFee } from "../../Utils/ShippingFee";

function PayPalCheckout(props) {
  var order = [];
  var proceedOrder = [];

  const { t, i18n } = useTranslation();

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
  const [usdCurrency, setUSDCurrency] = useState(0.0);

  const [discount, setDiscount] = useState(0);

  const [timeTyping, setTimeTyping] = useState(null);

  useEffect(() => {
    setCities(data);
    setShippingFee(25000);
    Axios({
      method: "get",
      url: "http://localhost:5000/api/ProceedOrder/USDCurrency"
    }).then((res) => {
      if (res.data.status) {
        setUSDCurrency(parseFloat(res.data.obj))
      }
    })
  }, []);

  useEffect(() => {
    if (props.userInfo) {
      setUserInfor(props.userInfo)
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
    if(props.discount){
      setDiscount(parseFloat(props.discount));
    }
    console.log(props.discount)
  }, [props.discount])

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
        return (
          <option value={city.id}>{city.name}</option>
        )
      });
    }
    return cityItems;
  }, [cities]);

  const SelectCity = (e) => {
    if (e.target.value) {
      setCity(cities[parseInt(e.target.value) - 1].name)
    }
  }

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

  useEffect(() => {
    if(city != "" && address != ""){
      var fullAddress = address + " " + city;
      CalculateDistance(fullAddress).then((res) => {
        setShippingFee(parseInt(GetShippingFee(res)));
        props.shippingFeeChanged(GetShippingFee(res));
      });
    }
  }, [address, city]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const SettingPayPal = () => {
    var itemArr = [];
    var cartBooks = cartBook.cartBook;
    var total = 0;
    var shippingFeeInfo = (parseInt(shippingFee) * usdCurrency).toFixed(2).toString();
    var shippingInfo = {
      method: "Shipping",
      address: {
        name: {
          full_name: fullName
        },
        address_line_1: address,
        address_line_2: "/",
        admin_area_2: "/",
        admin_area_1: city,
        country_code: "VN"
      }
    }
    if (cartBook) {
      for (let i = 0; i < cartBooks.length; i++) {
        total = total + parseFloat((parseInt(cartBooks[i].subTotal) * usdCurrency).toFixed(2));
        let item = {
          name: cartBooks[i].book.name,
          description: cartBooks[i].book.releaseYear,
          sku: cartBooks[i].bookId,
          unit_amount: {
            currency_code: "USD",
            value: (parseInt(cartBooks[i].book.currentPrice) * usdCurrency).toFixed(2).toString()
          },
          quantity: cartBooks[i].quantity.toString(),
          category: "PHYSICAL_GOODS"
        }
        itemArr.push(item);
      }
    }
    var discountInfo = (parseFloat(discount) * total).toFixed(2).toString();
    var amountInfo = {
      currency_code: "USD",
      value: (parseFloat(total) + parseFloat(shippingFeeInfo) - discountInfo).toFixed(2).toString(),
      breakdown: {
        item_total: {
          currency_code: "USD",
          value: total
        },
        shipping: {
          currency_code: "USD",
          value: (parseInt(shippingFee) * usdCurrency).toFixed(2).toString()
        },
        discount: {
          currency_code: "USD",
          value: (parseFloat(discount) * total).toFixed(2).toString()
        }
      }
    }
    var purchaseUnitsInfo = {
      amount: amountInfo,
      items: itemArr,
      shipping: shippingInfo
    }
    return purchaseUnitsInfo;
  };

  const buttonStyle = {
    layout: 'vertical',
    color: 'blue',
    width: '50%'
  }

  return (
    <div>
      <div className="title-wrapper">
        <h2>{t('Please provide complete information')}</h2>
      </div>
      <form className="form-checkout">
        <input
          type="email"
          placeholder={t('Email for receive notification')}
          id="email"
          defaultValue={userInfor && userInfor.account.email}
          onChange={(e) => handleEmailChange(e)}
        />
        <input
          type="text"
          placeholder={t('Your name')}
          id="name"
          defaultValue={userInfor && userInfor.fullName}
          onChange={(e) => handleNameChange(e)}
        />
        <input
          type="number"
          placeholder={t('Phone number')}
          id="number"
          defaultValue={userInfor && userInfor.phoneNumber}
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
          onChange={(e) => handleAdressChange(e)}
        />

        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="form-group">
              <div>
                <PayPalButton
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        SettingPayPal()
                      ],
                    });
                  }}

                  onApprove={(data, actions) => {
                    Axios({
                      headers: {
                        Authorization: "Bearer " + getToken(),
                      },
                      url: "http://localhost:5000/api/ProceedOrder/PayPalCheckout",
                      method: "post",
                      params: {
                        email: email,
                        paypalOrderID: data.orderID,
                        type: "PayPal",
                        total: parseInt(orderTotal) - parseInt(orderTotal) * discount,
                        shippingFee: parseInt(shippingFee),
                        fullName: fullName,
                        phoneNumber: phonenumber,
                        address: address + " " + city
                      },
                      data: proceedOrder
                    }).then((res) => {
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
                    }).catch((err) => {
                      Swal.fire({
                        title: "Error",
                        text: err,
                        icon: "error",
                      });
                    });
                  }}

                  style={buttonStyle}

                  options={{
                    clientId: "AS_iLHEtFU2km3bPNvkvleuO1PoozOEBIre-bHSyjnaCr44n9ZzSb9vIt2URySILtCLUCQbMFXU1LosN",
                    disableFunding: "card",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default PayPalCheckout
