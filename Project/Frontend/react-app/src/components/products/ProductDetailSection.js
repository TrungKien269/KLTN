import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { getToken } from "../../Utils/Commons";
import ProductRating from "./ProductRating";
import ProductRatingVote from "./ProductRatingVote";
import { useTranslation } from "react-i18next";
import OwlCarousel from "react-owl-carousel2";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

function ProductDetailSection(props) {
  const [data, setData] = useState(null);
  const [authors, setAuthors] = useState("");
  const [similarityData, setSimilarityData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/Book/${props.bookInfo}`,
    }).then((response) => {
      setData(response.data.obj);
      var authors = response.data.obj.authorBook;
      var results = authors.map((author) => {
        return <React.Fragment> {author.author.name}</React.Fragment>;
      });

      setAuthors(results);
      console.log(response.data.obj);
    });
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/RelatedBook/${props.bookInfo}`,
    }).then((res) => {
      setSimilarityData(res.data.obj);
    });
  }, []);

  const PhotoItem = ({ image, group }) => (
    <div>
      <LightgalleryItem group={group} src={image}>
        <img src={image} style={{ width: "100%" }} />
      </LightgalleryItem>
    </div>
  );

  const showSlideBooks = useMemo(() => {
    var results = [];

    if (data) {
      results = data.imageBook.map((image) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <PhotoItem key={image.bookId} image={image.path} group="group1" />
          </div>
        );
      });
      console.log(results);
    }

    return results;
  }, [data]);

  const options = {
    items: 1,
    nav: true,
    rewind: true,
    autoplay: true,
    navText: [
      "<span aria-label='Previous'>‹</span>",
      "<span aria-label='Next'>›</span>",
    ],
  };
  //show related book
  const showRelatedBooks = useMemo(() => {
    var results = "";
    if (similarityData) {
      results = similarityData.map((data) => {
        return (
          <li>
            <div className="row">
              <div className="col-md-6">
                <img
                  src="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_129416.jpg"
                  className="img-cover shadow-lg"
                  alt=""
                />
              </div>
              <div className="col-md">
                <a href="#">Product example #1</a>
                <p className="card__book-price">50$</p>
              </div>
            </div>
          </li>
        );
      });
    }
  }, [similarityData]);

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
        quantity: parseInt(quantity),
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

  const showDetail = useMemo(() => {
    if (data) {
      return (
        <section className="section__detail">
          <div className="container">
            <div className="row">
              <div className="col-md">
                <div className="sidebar-block">
                  <h2>Related Books</h2>
                  <ul className="list-unstyled sidebar-list">
                    {/* show related book */}
                    <li>
                      <div className="row">
                        <div className="col-6">
                          <img
                            src="https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_129416.jpg"
                            className="img-cover shadow-lg"
                            alt=""
                          />
                        </div>
                        <div className="col">
                          <a href="#">Product example #1</a>
                          <p className="card__book-price">50$</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-5 mar-right-sm d-flex align-items-center">
                    {/*Carousel-slide*/}
                    {/* <div className="container-fluid">{showSlideBooks}</div> */}
                    {/*/Carousel-slide*/}
                    <LightgalleryProvider>
                      <OwlCarousel options={options}>
                        {showSlideBooks}
                      </OwlCarousel>
                    </LightgalleryProvider>
                  </div>
                  <div className="col-md">
                    <div className="title-wrapper">
                      <h3>{data.name}</h3>
                    </div>
                    <ProductRating id={props.bookInfo} />
                    <div className="special-author text-dark">
                      Authors:
                      {authors}
                    </div>
                    <h2>
                      <NumberFormat
                        value={data.currentPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"VND "}
                      ></NumberFormat>
                    </h2>
                    <div
                      className="detail__describe"
                      dangerouslySetInnerHTML={{ __html: data.summary }}
                    ></div>
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
                          {t("Add to cart")}
                        </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-4">
                        <h3>{t("Rate this book")}</h3>
                        <ProductRatingVote id={props.bookInfo} />
                      </div>
                    </div>
                    <div className="detail__link">
                      <a href="#" onClick={AddToWishList}>
                        {t("Add to wish list")}
                      </a>
                    </div>
                  </div>
                  <div className="product-table">
                    <table>
                      <tbody>
                        <tr className="title">
                          <td className="first">{t("Title")}</td>
                          <td>{data.name}</td>
                        </tr>
                        <tr className="author">
                          <td className="first">{t("Authors")}</td>
                          <td>{authors}</td>
                        </tr>
                        <tr className="type">
                          <td className="first">{t("Category")}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.bookCategory[0].cate.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="title">
                          <td className="first">{t("Released Year")}</td>
                          <td>{data.releaseYear}</td>
                        </tr>
                        <tr className="provider">
                          <td className="first">{t("Supplier")}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.supplierBook[0].supplier.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="publisher">
                          <td className="first">{t("Publisher")}</td>
                          <td>
                            {Object.keys(data).length > 0
                              ? data.publisherBook[0].publisher.name
                              : ""}
                          </td>
                        </tr>
                        <tr className="weight">
                          <td className="first">{t("Weight")}</td>
                          <td>{data.weight}</td>
                        </tr>
                        <tr className="Pages">
                          <td className="first">{t("Number of pages")}</td>
                          <td>{data.numOfPage}</td>
                        </tr>
                        <tr className="Description">
                          <td className="first">{t("Summary")}</td>
                          <td
                            dangerouslySetInnerHTML={{ __html: data.summary }}
                          ></td>
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
  }, [data, authors]);

  return <div>{showDetail}</div>;
}

export default ProductDetailSection;
