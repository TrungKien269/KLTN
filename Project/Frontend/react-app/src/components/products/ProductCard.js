import React, { useEffect, useState, Component } from "react";
import Badge from "../utilities/Badge";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../Utils/Commons";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ProductRatingCard from "./ProductRatingCard";

const ProductCard = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t, i18n } = useTranslation();

  const ShowSaleOff = () => {
    if (props.sale) {
      return <div class="badge badge__sale">{props.sale}%</div>;
    }
  };

  const ShowPrice = () => {
    if (props.originalPrice) {
      return (
        <div>
          <p className="card__book-price">
            <del>
              <small>{props.originalPrice}</small>
            </del>
          </p>
          <p className="card__book-price">{props.price}</p>
        </div>
      );
    } else {
      return <p className="card__book-price">{props.price}</p>;
    }
  };

  const addToCart = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      url: "http://localhost:5000/api/BookInfo/AddToCart",
      method: "post",
      params: {
        id: props.id,
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

  const addToWishList = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "post",
      url: "http://localhost:5000/api/UserWishList/AddToWishList",
      params: {
        bookID: props.id,
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

  return (
    <React.Fragment>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="img-contain img-cover-30" src={props.image} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Link to={`/book/${props.id}`} title={props.name}>
        <div className="card display-on-hover">
          {ShowSaleOff}
          <img
            className="card-img-top img-contain img-contain-25"
            src={props.image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card__book-title">{props.name}</h5>
            <ProductRatingCard id={props.id} />
            {ShowPrice}
            <button
              className="btn btn--rounded btn-fw btn--blue item-display"
              onClick={addToCart}
            >
              {t("Add to cart")}
            </button>
          </div>
          <div className="badge badge__utilities item-display">
            <span
              className="badge__utilities-blue"
              onClick={(e) => addToWishList(e)}
            >
              <i className="fas fa-heart" />
            </span>

            <span className="badge__utilities-blue" onClick={handleShow}>
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default withRouter(ProductCard);
