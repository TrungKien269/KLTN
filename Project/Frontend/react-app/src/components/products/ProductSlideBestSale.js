import React, { Component, Suspense } from "react";
import ProductCard from "./ProductCard";
import Badge from "../utilities/Badge";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import NumberFormat from "react-number-format";
//import 'react-owl-carousel2/style.css'; //Allows for server-side rendering.

class ProductSlideBestSale extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const x = this;
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/List6BestSaleBook",
    }).then(function (response) {
      x.setState({ data: response.data.obj });
    });
  }

  ShowTop6 = (data) => {
    let result = "";
    if (Object.keys(data).length > 0) {
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
                  prefix={"VND "}
                />
              }
            />
          );
        }
      });
    }

    return result;
  };

  options = {
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

  render() {
    return (
      <OwlCarousel options={this.options}>
        {this.ShowTop6(this.state.data)}
      </OwlCarousel>
    );
  }
}

export default ProductSlideBestSale;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard";

// function ProductSlideBestSale(props) {
//   const [top6, setTop6] = useState({});

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: "http://localhost:53788/api/Main/List6BestSaleBook",
//     }).then(function (response) {
//       setTop6(response.data.obj);
//     });
//   }, []);
//   return (
//     <div className="owl-carousel owl-carousel-product owl-theme">
//       {ShowTop6(top6)}
//     </div>
//   );
// }

// const ShowTop6 = (data) => {
//   let result = "";
//   if (Object.keys(data).length > 0) {
//     result = data.map((book) => {
//       return (
//         <ProductCard
//           key={book.id}
//           name={book.name}
//           image={book.image}
//           price={"$" + book.currentPrice}
//         />
//       );
//     });
//   }

//   return result;
// };

// export default ProductSlideBestSale;
