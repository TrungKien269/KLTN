import React from "react";
import HeaderBanner from "../../components/headbanner/HeaderBanner";
import ProductSlide from "../../components/products/ProductSlide";

function Index() {
  return (
    <React.Fragment>
      <HeaderBanner></HeaderBanner>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>Current bestsellers</h3>
            <a href="#">View all</a>
          </div>
          <ProductSlide />
        </div>
      </div>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>Top Rated books</h3>
            <a href="#">View all</a>
          </div>
          <ProductSlide />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Index;
