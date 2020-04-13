import React, { useState, useEffect, useMemo, Component } from "react";
import SpecialItemCard from "./SpecialItemCard";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
class SpecialItemSlide extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const x = this;
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/List3FeaturedBook",
    }).then(function (res) {
      x.setState({ data: res.data.obj });
    });
  }

  showFeatureBook = (data) => {
    let result = "";
    if (Object.keys(data).length > 0) {
      result = data.map((book) => {
        return (
          <SpecialItemCard
            key={book.id}
            image={book.image}
            name={book.name}
            price={book.currentPrice}
          />
        );
      });
    }
    return result;
  };
  options = {
    nav: false,
    items: 1,
    margin: 0,
    loop: true,
    autoWidth: false,
    dots: false,
  };

  render() {
    return (
      <OwlCarousel options={this.options}>
        {this.showFeatureBook(this.state.data)}
      </OwlCarousel>
    );
  }
}

export default SpecialItemSlide;
