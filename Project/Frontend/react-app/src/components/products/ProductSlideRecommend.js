import React, { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import OwlCarousel from "react-owl-carousel2";
import NumberFormat from "react-number-format";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import Axios from 'axios';
import { getToken } from '../../Utils/Commons';

function ProductSlideRecommend() {

  const [data, setData] = useState([]);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/Main/RecommendBook"
    }).then((res) => {
      if (res.data.status) {
        setData(prev => [...res.data.obj]);
      }
    })
  }, []);

  const ShowListBook = () => {
    let result = {};
    if (data && data.length > 0) {
      result = data.map((book) => {
        if (book.status) {
          return (
            <ProductCard
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
        }
      });
    }
    else {
      return <Loader active inline="centered" size="huge" />;
    }
    return result;
  };

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

  return (
    <OwlCarousel options={options}>
        {ShowListBook(data)}
      </OwlCarousel>
  )
}

export default ProductSlideRecommend
