import React, { useEffect, useState, Component } from "react";
import Badge from "../utilities/Badge";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../Utils/Commons";
import Swal from "sweetalert2";

// import LazyLoad from "react-lazyload";
// import ProductRating from "./ProductRating";

class ProductCard extends Component {
  addToCart = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      url: "http://localhost:5000/api/BookInfo/AddToCart",
      method: "post",
      params: {
        id: this.props.id,
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
          text: "You have to sign in for this action!",
          icon: "error",
        });
      });
  };

  addToWishList = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "post",
      url: "http://localhost:5000/api/UserWishList/AddToWishList",
      params: {
        bookID: this.props.id,
      },
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Success",
            text: "Add this book to wish list successfully",
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
          text: "You have to sign in for this action!",
          icon: "error",
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        <Link to={`/book/${this.props.id}`}>
          <div className="card display-on-hover">
            <img
              className="card-img-top img-contain img-contain-25"
              src={this.props.image}
              alt="Card image cap"
            />

            <div className="card-body">
              <h5 className="card__book-title">{this.props.name}</h5>
              <p className="card__book-price">{this.props.price}</p>
              {/* <ProductRating /> */}
              <button
                className="btn btn--rounded btn-fw btn--blue item-display"
                onClick={this.addToCart}
              >
                Add to cart
              </button>
            </div>
            <div className="badge badge__utilities item-display">
              <span
                className="badge__utilities-blue"
                onClick={this.addToWishList}
              >
                <i className="fas fa-heart" />
              </span>
              <a
                href="#"
                className="badge__utilities-blue"
                data-toggle="modal"
                data-target="#modalQuickview"
              >
                <i className="fas fa-search" />
              </a>
            </div>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}

export default withRouter(ProductCard);
