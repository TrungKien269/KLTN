import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import Badge from "../utilities/Badge";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import NumberFormat from "react-number-format";
import { Loader } from "semantic-ui-react";

const ProductSlideBestSale = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/List6BestSaleBook",
    }).then((res) => {
      setData(res.data.obj);
    });
  }, []);

  const ShowTop6 = useMemo(() => {
    let result = "";
    if (data) {
      result = data.map((book) => {
        return (
          <ProductCard
            className="item"
            key={book.id}
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
        );
      });
    }
    return result;
  }, [data]);

  const options = {
    nav: true,
    items: 5,
    margin: 30,
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

  if (data) {
    return <OwlCarousel options={options}>{ShowTop6}</OwlCarousel>;
  } else {
    return <Loader active inline="centered" size="massive" />;
  }
};

export default ProductSlideBestSale;
