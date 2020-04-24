import React, { Component, useEffect, useState, useMemo, useRef } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { withRouter, Link } from "react-router-dom";

const ProceedCheckout = (props) => {
  var order = [];
  var proceedOrder = [];
  var orderTotal = 0;
  const [cartBook, setCartBook] = useState(null);
  const [userInfor, setUserInfor] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAdressChange = (event) => {
    setAddress(event.target.value);
  };

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

  proceedOrder = useMemo(() => {
    if (cartBook) {
      let x = [];
      x = cartBook.cartBook;
      for (let i = 0; i < x.length; i++) {
        orderTotal = orderTotal + x[i].subTotal;
        order.push({
          bookID: x[i].bookId,
          currentPrice: x[i].book.currentPrice,
          quantity: x[i].quantity,
        });
      }
    }
    return order;
  }, [cartBook, orderTotal]);

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
                          prefix={"VND "}
                        ></NumberFormat>
                      }
                    </div>
                    <table>
                      <tbody>
                        <tr>
                          <td className="first">Delivery type</td>
                          <td className="second">Shipping</td>
                        </tr>
                        <tr>
                          <td className="first">Product code</td>
                          <td className="second">{item.bookId}</td>
                        </tr>
                        <tr>
                          <td className="first">Amount</td>
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

  return (
    <div>
      <section className="section__checkout">
        <div className="cart-title">
          <h2>check out</h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="title-wrapper">
                <h2>Please provide complete information</h2>
                {/* <a href="/login.html">Login</a> */}
              </div>
              <form className="form-checkout">
                <input
                  type="text"
                  placeholder="Your name"
                  id="name"
                  defaultValue={userInfor && userInfor.fullName}
                  ref={fullNameRef}
                  onChange={(e) => handleNameChange(e)}
                />
                <input
                  type="number"
                  placeholder="Phone number"
                  id="number"
                  defaultValue={userInfor && userInfor.phoneNumber}
                  ref={phoneRef}
                  onChange={(e) => handlePhoneChange(e)}
                />

                <textarea
                  name
                  id
                  cols={30}
                  rows={5}
                  placeholder="Your detail address"
                  defaultValue={userInfor && userInfor.address}
                  ref={addressRef}
                  onChange={(e) => handleAdressChange(e)}
                />
                <input
                  type="button"
                  defaultValue="Confirm your order"
                  className="btn btn--rounded btn-fit btn--blue"
                  onClick={() => handleSubmit()}
                />
              </form>
            </div>
            <div className="col-md">
              <div className="order">
                <div className="title-wrapper">
                  <h2>Your order</h2>
                </div>
                <div className="title-wrapper">
                  <h2>Total</h2>
                  <div className="product-price">
                    {
                      <NumberFormat
                        value={orderTotal}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix="VND "
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
