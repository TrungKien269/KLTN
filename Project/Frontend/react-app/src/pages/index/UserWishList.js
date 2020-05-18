import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

export default class UserWishList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/UserWishList/UserWishList",
    })
      .then((res) => {
        if (res.data.status) {
          this.setState({ data: res.data.obj });
          console.log(this.state.data);
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

  handleAddClicked = (bookID) => {
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      url: "http://localhost:5000/api/BookInfo/AddToCart",
      method: "post",
      params: {
        id: bookID,
        quantity: 1,
      },
    })
      .then((res) => {
        if (res.data.status == true) {
          Swal.fire({
            title: "Success",
            text: "Add this book to cart successfully",
            icon: "success",
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
  };

  handleRemoveClicked = (bookId) => {
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
        this.setState({
          data: this.state.data.filter((item) => item.bookId != bookId),
        });
        axios({
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
          },
          method: "delete",
          url: "http://localhost:5000/api/UserWishList/RemoveFromWishList",
          params: {
            bookID: bookId,
          },
        })
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                title: "Done",
                text: "Remove this book from your wish list",
                icon: "success",
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
  };

  showListBooks = (data) => {
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
            <td className="item-price">
              <p>{item.book.currentPrice.toLocaleString()} VND</p>
            </td>
            <td className="item-price">
              <p>{new Date(item.dateTime).toLocaleDateString()}</p>
            </td>
            <td className="item-img">
              <button
                className="btn btn--blue btn--rounded btn-fit"
                id="btnAddToCart"
                onClick={() => this.handleAddClicked(item.bookId)}
              >
                Add to cart
              </button>
            </td>
            <td className="action">
              <button
                className="btn btn--red btn--rounded btn-fit"
                id="btnRemove"
                onClick={() => this.handleRemoveClicked(item.bookId)}
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
          <h2>Wish List</h2>
        </div>
        <div className="container">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th className="item">Book</th>
                  <th className="qty">Price</th>
                  <th className="price">Added Date</th>
                  <th className="cart">&nbsp;</th>
                  <th className="remove">&nbsp;</th>
                </tr>
                {this.showListBooks(this.state.data)}
              </thead>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
