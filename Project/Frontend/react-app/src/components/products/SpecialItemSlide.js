import React, { useState, useEffect, useMemo } from "react";
import SpecialItemCard from "./SpecialItemCard";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import NumberFormat from "react-number-format";

function SpecialItemSlide(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/List3FeaturedBook",
    }).then(function (res) {
      if (res.data.status) {
        setData(res.data.obj);
      }
    });
  }, [])

  const showFeatureBook = (data) => {
    let result = "";
    let authors = "";
    if (data && data.length > 0) {
      result = data.map((book) => {
        return (
          <SpecialItemCard
            key={book.id}
            id={book.id}
            image={book.image}
            name={book.name}
            price={
              <NumberFormat
                value={book.currentPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"VND "}
              />
            }
            author={book.authorBook[0].author.name}
          />
        );
      });
    }
    return result;
  };

  const options = {
    nav: false,
    items: 1.25,
    center: true,
    margin: 0,
    loop: true,
    autoWidth: false,
    dots: false,
  };

  return (
    <OwlCarousel options={options}>
      {showFeatureBook(data)}
    </OwlCarousel>
  );
}

export default SpecialItemSlide;
