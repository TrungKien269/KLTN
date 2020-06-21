import React, { Component, useState, useEffect, useMemo } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const ProductSlideBestPrice = () => {
  const [book, setBook] = useState();
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/ListLowestPriceBook",
    }).then((res) => {
      setBook(res.data.obj);
    });
  }, []);

  const showLowestPriceBook = useMemo(() => {
    let result = {};
    if (book) {
      result = book.map((book) => {
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
              amount={book.bookNumber.amount}
            />
          </div>
        );
      });
    } else {
      return <Loader active inline="centered" size="huge" />;
    }
    return result;
  }, [book]);

  const options = {
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

  if (book) {
    return <OwlCarousel options={options}>{showLowestPriceBook}</OwlCarousel>;
  } else {
    return <Loader active inline="centered" size="massive" />;
  }
};

export default ProductSlideBestPrice;
