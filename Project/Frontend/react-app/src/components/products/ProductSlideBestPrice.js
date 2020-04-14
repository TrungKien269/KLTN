import React, { Component } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";

class ProductSlideBestPrice extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    const books = this;
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/ListLowestPriceBook",
    }).then(function (res) {
      books.setState({
        data: res.data.obj,
      });
    });
  }

  showLowestPriceBook = (data) => {
    let result = "";
    if (Object.keys(data).length > 0) {
      result = data.map((book) => {
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
                prefix={"VND "}
              />
            }
          />
        );
      });
    }

    return result;
  };
  options = {
    nav: true,
    items: 4,
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
  render() {
    return (
      <OwlCarousel options={this.options}>
        {this.showLowestPriceBook(this.state.data)}
      </OwlCarousel>
    );
  }
}

export default ProductSlideBestPrice;
