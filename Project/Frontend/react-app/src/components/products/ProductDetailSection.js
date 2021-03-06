import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { getToken } from "../../Utils/Commons";
import ProductRating from "./ProductRating";
import ProductRatingVote from "./ProductRatingVote";
import { useTranslation } from "react-i18next";
import OwlCarousel from "react-owl-carousel2";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import ProductCard from "./ProductCard";
import { Breadcrumb } from "semantic-ui-react";
function ProductDetailSection(props) {
  const [data, setData] = useState(null);
  const [authors, setAuthors] = useState("");
  const [similarityData, setSimilarityData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [bookName, setBookName] = useState("");
  const sections = [
    { key: "Home", content: "Home", href: "/" },
    { key: "Store", content: "Collections", href: "/collections" },
    { key: "Shirt", content: bookName, active: true },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setBookName(data.name);
    }
  }, [data]);

  const similarityRef = useRef(null);
  similarityRef.current = similarityData;

  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/RelatedBook/${props.bookInfo}`,
    }).then((res) => {
      if (res.data.status) {
        setSimilarityData((prev) => [...res.data.obj]);
      }
    });

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
    });

    if (getToken()) {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "post",
        url: "http://localhost:5000/api/Main/SaveTracking",
        params: {
          bookID: props.bookInfo,
        },
      }).then((res) => {});
    }
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/RelatedBook/${props.bookInfo}`,
    }).then((res) => {
      if (res.data.status) {
        setSimilarityData((prev) => [...res.data.obj]);
      }
    });

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
    });

    if (getToken()) {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "post",
        url: "http://localhost:5000/api/Main/SaveTracking",
        params: {
          bookID: props.bookInfo,
        },
      }).then((res) => {});
    }
  }, [props.bookInfo]);

  const ShowPriceBook = (originalPrice, currentPrice) => {
    if (currentPrice < originalPrice) {
      return (
        <div>
          <h4>
            <del>
              <NumberFormat
                value={originalPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              ></NumberFormat>
            </del>
          </h4>
          <h2>
            <NumberFormat
              value={currentPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" VND"}
              style={{
                color: "red",
              }}
            ></NumberFormat>
          </h2>
        </div>
      );
    } else {
      return (
        <h2>
          <NumberFormat
            value={currentPrice}
            displayType={"text"}
            thousandSeparator={true}
            suffix={" VND"}
          ></NumberFormat>
        </h2>
      );
    }
  };

  const PhotoItem = ({ image, group }) => (
    <LightgalleryItem group={group} src={image}>
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  );

  const showSlideBooks = useMemo(() => {
    var results = [];
    if (data) {
      results = data.imageBook.map((image) => {
        return (
          <PhotoItem key={image.bookId} image={image.path} group="group1" />
        );
      });
    }
    return results;
  }, [data]);

  const options = {
    items: 1,
    nav: true,
    center: true,
    rewind: true,
    autoplay: false,
    dots: false,
    navText: [
      "<span aria-label='Previous'>‹</span>",
      "<span aria-label='Next'>›</span>",
    ],
  };
  const optionRelatedBook = {
    nav: true,
    items: 4,
    margin: 20,
    loop: false,
    autoWidth: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      320: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
    navText: [
      "<span aria-label='Previous'>‹</span>",
      "<span aria-label='Next'>›</span>",
    ],
  };
  //show related book
  const showRelatedBooks = useMemo(() => {
    var results = "";
    if (similarityRef.current && similarityRef.current.length > 0) {
      results = similarityRef.current.slice(1, 6).map((book) => {
        return (
          <div className="item" key={book.id}>
            <ProductCard
              id={book.id}
              name={book.name}
              image={book.image}
              price={
                <NumberFormat
                  value={book.currentPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              }
            />
          </div>
        );
      });
    }
    return results;
  }, [similarityRef.current]);

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

  const showDetail = (data, authors) => {
    if (data) {
      return (
        <section className="section__detail">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Breadcrumb
                  className="breadcrumb-section"
                  icon="right angle"
                  sections={sections}
                />
                <div className="row">
                  <div className="col-md-6 col-lg-5 mar-right-sm d-flex align-items-center">
                    {/*Carousel-slide*/}
                    {/* <div className="container-fluid">{showSlideBooks}</div> */}
                    {/*/Carousel-slide*/}
                    <LightgalleryProvider>
                      <OwlCarousel options={options}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {" "}
                          <PhotoItem
                            key={data.bookId}
                            image={data.image}
                            group="group1"
                          />
                        </div>
                        {showSlideBooks}
                      </OwlCarousel>
                    </LightgalleryProvider>
                  </div>
                  <div className="col-md-6 col-lg-7">
                    <div className="title-wrapper">
                      <h3>{data.name}</h3>
                    </div>
                    <ProductRating id={props.bookInfo} />
                    <div className="special-author text-dark">
                      {t("Authors")}:{authors}
                    </div>
                    {ShowPriceBook(data.originalPrice, data.currentPrice)}
                    <div
                      className="detail__describe"
                      dangerouslySetInnerHTML={{ __html: data.summary }}
                    ></div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="quantity buttons_added d-flex flex-row mar-top-2 justify-content-center justify-content-lg-start mb-md-2">
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
                      <div className="col-lg-6">
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
              <div className="row mt-5">
                <div className="col-md-12">
                  <h2>{t("Related Books")}</h2>
                  <OwlCarousel options={optionRelatedBook}>
                    {showRelatedBooks}
                  </OwlCarousel>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return <div>{showDetail(data, authors)}</div>;
}

export default ProductDetailSection;
