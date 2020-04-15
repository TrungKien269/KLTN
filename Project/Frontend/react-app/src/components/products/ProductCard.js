import React, { useEffect, useState, Component } from "react";
import Badge from "../utilities/Badge";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

// import LazyLoad from "react-lazyload";
// import ProductRating from "./ProductRating";

class ProductCard extends Component {
  addToCart = (event) => {
    event.preventDefault();
    axios({
      headers: {
        "Authorization": "Bearer " + window.sessionStorage.getItem("Token")
      },
      url: "http://localhost:5000/api/BookInfo/AddToCart",
      method: "post",
      params: {
        id: this.props.id,
        quantity: 1
      }
    }).then((res) => {
      if(res.data.status == true){
        alert("add " + this.props.name + " to cart successfully");
      }
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
              <a href="#" className="badge__utilities-blue">
                <i className="fas fa-heart" />
              </a>
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
