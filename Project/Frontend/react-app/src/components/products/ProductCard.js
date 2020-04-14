import React, { useEffect, useState, Component } from "react";
import Badge from "../utilities/Badge";
// import axios from "axios";
// import LazyLoad from "react-lazyload";
// import ProductRating from "./ProductRating";

class ProductCard extends Component {
  addToCart = () => {
    alert("add " + this.props.name + " to cart successfully");
  };
  render() {
    return (
      <React.Fragment>
        <div className="card display-on-hover">
          <a href="#">
            <img
              className="card-img-top img-contain img-contain-25"
              src={this.props.image}
              alt="Card image cap"
            />
          </a>
          <div className="card-body">
            <a href="#">
              <h5 className="card__book-title">{this.props.name}</h5>
              <p className="card__book-price">{this.props.price}</p>
              {/* <ProductRating /> */}
            </a>
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
      </React.Fragment>
    );
  }
}

export default ProductCard;
