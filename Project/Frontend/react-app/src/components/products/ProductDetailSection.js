import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { getToken } from "../../Utils/Commons";
import ProductRating from "./ProductRating";
import ProductRatingVote from "./ProductRatingVote";
import { useTranslation } from 'react-i18next';

function ProductDetailSection(props) {

  const [data, setData] = useState(null);
  const [authors, setAuthors] = useState("")
  const [similarityData, setSimilarityData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/Book/${props.bookInfo}`,
    }).then(function (response) {
      setData(response.data.obj);
      var author = "";
      for (var i = 0; i < response.data.obj.authorBook.length; i++) {
        author += response.data.obj.authorBook[i].author.name + ", ";
      }
      setAuthors(author.substring(0, author.length - 2));
    });
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/RelatedBook/${props.bookInfo}`,
    }).then((res) => {
      setSimilarityData(res.data.obj);
    });
  }, []);

  const handleQuantityChanged = (event) => {
    setQuantity(parseInt(document.getElementById("txtQuantity").value));
  };

  const AddToCart = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      url: "http://localhost:5000/api/BookInfo/AddToCart",
      method: "post",
      params: {
        id: data.id,
        quantity: parseInt(quantity)
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

  const AddToWishList = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "post",
      url: "http://localhost:5000/api/UserWishList/AddToWishList",
      params: {
        bookID: data.id,
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

  const showDetail = (data, authors) => {
    if (data && authors) {
      return (
        <section className="section__detail">
          <div className="container">
            <div className="row">
              <div className="col-md">
                <div className="row">
                  <div className="col-md-5 mar-right-sm d-flex align-items-center">
                    {/*Carousel-slide*/}
                    <div className="container-fluid">
                      {/*Carousel Wrapper*/}
                      {/* <div className="badge sale__badge">SALE</div> */}
                      <div
                        id="carousel-example-1z"
                        className="carousel slide carousel-slide pointer-event "
                        data-ride="carousel"
                        data-interval={0}
                      >
                        {/*Slides*/}
                        <div className="carousel-inner" role="listbox">
                          {/*First slide*/}
                          <div
                            className="carousel-item active cursor-zoom"
                            data-image={data.image}
                            data-toggle="zoom"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <div className="card">
                              <img
                                src={data.image}
                                className="card-img-top img-cover"
                                alt="..."
                              />
                            </div>
                            <img
                              role="presentation"
                              alt=""
                              src={data.image}
                              className="zoomImg"
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                opacity: 0,
                                width: "270px",
                                height: "380px",
                                border: "none",
                                maxWidth: "none",
                                maxHeight: "none",
                              }}
                            />
                          </div>
                          {/*/First slide*/}
                          {/*Second slide*/}
                          <div
                            className="carousel-item cursor-zoom"
                            data-image="img/img__product-1-front.webp"
                            data-toggle="zoom"
                          >
                            <div className="card">
                              <img
                                src="data/book6.webp"
                                className="card-img-top img-cover"
                                alt="..."
                              />
                            </div>
                          </div>
                          {/*/Second slide*/}
                          {/*Third slide*/}
                          <div
                            className="carousel-item cursor-zoom"
                            data-image="data/book6.webp"
                            data-toggle="zoom"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <div className="card">
                              <img
                                src="data/book6.webp"
                                className="card-img-top img-cover"
                                alt="..."
                              />
                            </div>
                            <img
                              role="presentation"
                              alt=""
                              src="data/book6.webp"
                              className="zoomImg"
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                opacity: 0,
                                width: "270px",
                                height: "380px",
                                border: "none",
                                maxWidth: "none",
                                maxHeight: "none",
                              }}
                            />
                          </div>
                          {/*/Third slide*/}
                          {/*Fourth slide*/}
                          <div
                            className="carousel-item cursor-zoom"
                            data-image="data/book6.webp"
                            data-toggle="zoom"
                            style={{ position: "relative", overflow: "hidden" }}
                          >
                            <div className="card">
                              <img
                                src="data/book6.webp"
                                className="card-img-top img-cover"
                                alt="..."
                              />
                            </div>
                            <img
                              role="presentation"
                              alt=""
                              src="data/book6.webp"
                              className="zoomImg"
                              style={{
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                opacity: 0,
                                width: "270px",
                                height: "380px",
                                border: "none",
                                maxWidth: "none",
                                maxHeight: "none",
                              }}
                            />
                          </div>
                          {/*/Fourth slide*/}
                        </div>
                        {/*/.Slides*/}
                        {/*Indicators*/}
                        <ol className="carousel-indicators carousel-indicators-dark">
                          <li
                            data-target="#carousel-example-1z"
                            data-slide-to={0}
                            className="active"
                            style={{ backgroundImage: 'url("data/book6.webp")' }}
                          ></li>
                          <li
                            data-target="#carousel-example-1z"
                            data-slide-to={1}
                            style={{ backgroundImage: 'url("data/book6.webp")' }}
                          />
                          <li
                            data-target="#carousel-example-1z"
                            data-slide-to={2}
                            style={{ backgroundImage: 'url("data/book6.webp")' }}
                          />
                          <li
                            data-target="#carousel-example-1z"
                            data-slide-to={3}
                            style={{ backgroundImage: 'url("data/book6.webp")' }}
                          />
                        </ol>
                        {/*/.Indicators*/}
                      </div>
                      {/*/.Carousel Wrapper*/}
                    </div>
                    {/*/Carousel-slide*/}
                  </div>
                  <div className="col-md">
                    <div className="title-wrapper">
                      <h3>{data.name}</h3>
                    </div>
                    <ProductRating id={props.bookInfo} />
                    <div className="special-author text-dark">{}</div>
                    <h2>
                      <NumberFormat
                        value={data.currentPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"VND "}
                      ></NumberFormat>
                    </h2>
                    <div className="detail__describe"
                      dangerouslySetInnerHTML={{ __html: data.summary }}>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="quantity buttons_added d-flex flex-row mar-top-2">
                          <input
                            type="button"
                            defaultValue="-"
                            className="minus quantity__button"
                            onClick={handleQuantityChanged}
                          />
                          <input
                            type="text"
                            id="txtQuantity"
                            step={1}
                            min={1}
                            max
                            name="quantity"
                            defaultValue={1}
                            title="Qty"
                            className="input-text qty text h-100"
                            size={4}
                            inputMode={"text"}
                          />
                          <input
                            type="button"
                            defaultValue="+"
                            className="plus quantity__button"
                            onClick={handleQuantityChanged}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <a
                          href="#"
                          className="btn btn-fw btn--rounded btn--blue"
                          onClick={AddToCart}
                        >
                          {t('Add to cart')}
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-4">
                        <h3>{t('Rate this book')}</h3>
                        <ProductRatingVote id={props.bookInfo} />
                      </div>
                    </div>
                    <div className="detail__link">
                      <a href="#" onClick={AddToWishList}>
                        {t('Add to wish list')}
                      </a>
                    </div>
                  </div>
                  <div className="product-table">
                    <table>
                      <tbody>
                        <tr className="title">
                          <td className="first">{t('Title')}</td>
                          <td>{data.name}</td>
                        </tr>
                        <tr className="author">
                          <td className="first">{t('Authors')}</td>
                          <td>{authors}</td>
                        </tr>
                        <tr className="type">
                          <td className="first">{t('Category')}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.bookCategory[0].cate.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="title">
                          <td className="first">{t('Released Year')}</td>
                          <td>{data.releaseYear}</td>
                        </tr>
                        <tr className="provider">
                          <td className="first">{t('Supplier')}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.supplierBook[0].supplier.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="publisher">
                          <td className="first">{t('Publisher')}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.publisherBook[0].publisher.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="weight">
                          <td className="first">{t('Weight')}</td>
                          <td>{data.weight}</td>
                        </tr>
                        <tr className="Pages">
                          <td className="first">{t('Number of pages')}</td>
                          <td>{data.numOfPage}</td>
                        </tr>
                        <tr className="Description">
                          <td className="first">{t('Summary')}</td>
                          <td dangerouslySetInnerHTML={{ __html: data.summary }}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <div>
      {showDetail(data, authors)}
    </div>
  );
}

export default ProductDetailSection;
