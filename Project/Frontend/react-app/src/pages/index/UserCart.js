import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";

export default class UserCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const x = this;
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token")
      },
      method: "get",
      url: "http://localhost:5000/api/UserCart/Cart"
    }).then(res => {
      if (res.data.status) {
        x.setState({ data: res.data.obj.cartBook });
        // console.log(this.state.data);
      }
    });
  }

  handleRemoveClicked = (bookId, index) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to remove this book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then(result => {
      if (result.value) {
        this.setState({
          data: this.state.data.filter(item => item.bookId != bookId)
        });
        axios({
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("Token")
          },
          method: "delete",
          url: "http://localhost:5000/api/UserCart/RemoveBookCart",
          params: {
            id: bookId
          }
        }).then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Remove this book from your cart",
              icon: "success"
            });
          }
        });
      }
    });
  };

  handleQuantityChanged = (bookId, index) => {
    let quantity = document.getElementsByClassName("input-text qty text h-100")[
      index
    ].value;

    let items = [...this.state.data];
    let item = items[index];
    item.quantity = parseInt(quantity);
    item.subTotal = parseInt(item.book.currentPrice) * parseInt(quantity);
    items[index] = item;
    this.setState({
      data: items
    });

    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token")
      },
      method: "post",
      url: "http://localhost:5000/api/UserCart/EditQuantityCart",
      params: {
        id: bookId,
        quantity: quantity
      }
    }).then(res => {
      if (res.data.status) {
        Swal.fire({
          title: "Done",
          text: "Change number of this book in your cart",
          icon: "success"
        });
      }
    });
  };

  showListBooks = data => {
    let bookArr = [];
    if (Object.keys(data).length > 0) {
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
                  onClick={event =>
                    this.handleQuantityChanged(item.bookId, index)
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
                  value={item.quantity}
                />
                <input
                  type="button"
                  value="+"
                  class="plus quantity__button"
                  onClick={event =>
                    this.handleQuantityChanged(item.bookId, index)
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
                className="btn btn--blue btn--rounded btn-fit"
                id="btnRemove"
                onClick={() => this.handleRemoveClicked(item.bookId, index)}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      });
      return bookArr;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="cart-title">
          <h2>shopping cart</h2>
        </div>
        <div className="container">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th className="item">Book</th>
                  <th className="qty">Quantity</th>
                  <th className="price">Price</th>
                  <th className="total-price">Total</th>
                  <th className="remove">&nbsp;</th>
                </tr>
                {this.showListBooks(this.state.data)}
              </thead>
            </table>
          </div>
          <div className="row">
            <div className="col-sm-6 col-xs-12 cart-left">
              <div className="cart-order-note">
                <h3>Add a note to your order</h3>
                <div class="cart-note">
                  <textarea name="note" id="CartSpecialInstructions"></textarea>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xs-12 cart-right">
              <div className="cart-right-table">
                <div class="total-price">
                  Total{" "}
                  <span rv-html="cart.total_price | money">
                    <span
                      className="money"
                      data-currency-usd="$20.00"
                      data-currency="USD"
                    >
                      $20.00
                    </span>
                  </span>
                </div>
                <div className="note-tax">
                  <span className="nt-title">Shipping</span>{" "}
                  <span>
                    Shipping, taxes and discounts will be calculated at
                    checkout.
                  </span>
                </div>
              </div>

              <div className="cart-action">
                <Link
                  to="/collections/"
                  className="btn btn--rounded btn--blue btn-fit"
                >
                  Continue Shopping
                </Link>
                <button
                  className="btn btn--rounded btn--white btn-fit"
                  type="button"
                  name="checkout"
                  id="btnOrder"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
