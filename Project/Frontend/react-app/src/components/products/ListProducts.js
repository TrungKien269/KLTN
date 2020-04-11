import React, { Component } from "react";
import ProductCard from "./ProductCard";

class ListProducts extends Component {
  render() {
    var products = [
      {
        id: 1,
        name: "book 1",
        price: "120.00$",
        image: "./data/book1.webp",
        status: true,
      },
      {
        id: 2,
        name: "book 2",
        price: "120.00$",
        image: "./data/book2.webp",
        status: true,
      },
      {
        id: 3,
        name: "book 3",
        price: "120.00$",
        image: "./data/book3.webp",
        status: true,
      },
      {
        id: 4,
        name: "book 4",
        price: "120.00$",
        image: "./data/book4.webp",
        status: true,
      },
      {
        id: 5,
        name: "book 5",
        price: "120.00$",
        image: "./data/book5.webp",
        status: true,
      },
      {
        id: 6,
        name: "book 6",
        price: "120.00$",
        image: "./data/book6.webp",
        status: true,
      },
      {
        id: 7,

        name: "book 7",
        price: "120.00$",
        image: "./data/book7.webp",
        status: true,
      },
      {
        id: 8,
        name: "book 8",
        price: "120.00$",
        image: "./data/book8.webp",
        status: true,
      },
      {
        id: 9,
        name: "book 9",
        price: "120.00$",
        image: "./data/book9.webp",
        status: true,
      },
      {
        id: 10,
        name: "book 10",
        price: "120.00$",
        image: "./data/book10.webp",
        status: true,
      },
    ];
    let elements = products.map((product, index) => {
      let result = "";
      if (product.status) {
        result = (
          <div className="col-sm-3 col-6">
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          </div>
        );
      }
      return result;
    });
    return <React.Fragment>{elements}</React.Fragment>;
  }
}

export default ListProducts;
