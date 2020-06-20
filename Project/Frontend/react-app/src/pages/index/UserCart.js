import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import { useTranslation } from 'react-i18next';

function UserCart() {

  const [data, setData] = useState([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/UserCart/Cart",
    }).then((res) => {
      if (res.data.status) {
        setData(res.data.obj.cartBook)
      }
    });
  }, []);

  const handleRemoveClicked = (bookId, index) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to remove this book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.value) {
        var newData = data.filter((item) => item.bookId != bookId);
        setData((prev) => [...newData]);
        axios({
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
          },
          method: "delete",
          url: "http://localhost:5000/api/UserCart/RemoveBookCart",
          params: {
            id: bookId,
          },
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Remove this book from your cart",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleQuantityChanged = (bookId, index) => {
    let quantity = document.getElementsByClassName("input-text qty text h-100")[index].value;

    let items = [...data];
    let item = items[index];
    item.quantity = parseInt(quantity);
    item.subTotal = parseInt(item.book.currentPrice) * parseInt(quantity);
    items[index] = item;
    setData((prev) => [...items])

    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "post",
      url: "http://localhost:5000/api/UserCart/EditQuantityCart",
      params: {
        id: bookId,
        quantity: quantity,
      },
    }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Done",
          text: "Change number of this book in your cart",
          icon: "success",
        });
      }
    });
  };

  const showListBooks = useMemo(() => {
    let bookArr = [];
    if (data && data.length > 0) {
      bookArr = data.map((item, index) => {
        return (
          <tr>
            <td className="item-name">
              <div className="item-img">
                <Link to={`/book/${item.bookId}`}>
                  <img
                    src={item.book.image}
                    className="img-contain img-cover-10"
                    alt=""
                  />
                </Link>
              </div>
              <div className="item-title">
                <Link to={`/book/${item.bookId}`}>{item.book.name}</Link>
              </div>
            </td>
            <td className="item-qty">
              <div className="quantity buttons_added d-flex justify-content-center">
                <input
                  type="button"
                  value="-"
                  className="minus quantity__button"
                  onClick={() =>
                    handleQuantityChanged(item.bookId, index)
                  }
                />
                <input
                  type="text"
                  step="1"
                  min="1"
                  name="quantity"
                  title="Qty"
                  className="input-text qty text h-100"
                  size="4"
                  pattern=""
                  inputmode=""
                  defaultValue={item.quantity}
                />
                <input
                  type="button"
                  value="+"
                  class="plus quantity__button"
                  onClick={() =>
                    handleQuantityChanged(item.bookId, index)
                  }
                />
              </div>
            </td>
            <td className="item-price">
              <p>{item.book.currentPrice.toLocaleString()} VND</p>
            </td>
            <td className="item-total">
              <p>{item.subTotal.toLocaleString()} VND</p>
            </td>
            <td className="action">
              <button
                className="btn btn--red btn--rounded btn-fit"
                id="btnRemove"
                onClick={() => handleRemoveClicked(item.bookId, index)}
              >
                {t('Remove')}
              </button>
            </td>
          </tr>
        );
      });
      return bookArr;
    }
  });

  return (
    <React.Fragment>
      <div className="cart-title">
        <h2>{t('shopping cart')}</h2>
      </div>
      <div className="container">
        <div className="cart-table">
          <table>
            <thead>
              <tr>
                <th className="item">{t('Book')}</th>
                <th className="qty">{t('Quantity')}</th>
                <th className="price">{t('Price')}</th>
                <th className="total-price">{t('Total')}</th>
                <th className="remove">&nbsp;</th>
              </tr>
              {showListBooks}
            </thead>
          </table>
        </div>
        <div className="row">
          <div className="col-sm-6 col-xs-12 cart-left">
            
          </div>

          <div className="col-sm-6 col-xs-12 cart-right">
            <div className="cart-right-table">
              
              <div className="note-tax">
                <span>
                  {t('Shipping, taxes and discounts will be calculated at checkout')}
                </span>
              </div>
            </div>

            <div className="cart-action">
              <Link
                to="/collections/"
                className="btn btn--rounded btn--blue btn-fit"
              >
                {t('Continue Shopping')}
              </Link>
              <Link
                to={"/proceedcheckout"}
                className="btn btn--rounded btn--white btn-fit"
                type="button"
                name="checkout"
                id="btnOrder"
              >
                {t('Proceed to Checkout')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default withRouter(UserCart)
