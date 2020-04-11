import React from "react";
import HeaderBanner from "../../components/headbanner/HeaderBanner";
import ProductSlide from "../../components/products/ProductSlideBestSale";
import SpecialItemSlide from "../../components/products/SpecialItemSlide";
import TimeCounting from "../../components/utilities/TimeCounter";
import ProductSlideBestSale from "../../components/products/ProductSlideBestSale";
import ProductSlideBestPrice from "../../components/products/ProductSlideBestPrice";
function Index() {
  return (
    <React.Fragment>
      <HeaderBanner></HeaderBanner>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>Current bestsellers</h3>
          </div>
          <ProductSlideBestSale />
        </div>
      </div>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>Best price books</h3>
          </div>
          <ProductSlideBestPrice />
        </div>
      </div>
      <div className="section__feature">
        <SpecialItemSlide />
      </div>
      <div className="section__promo">
        <h2>Limited time offer</h2>
        <div className="container">{/* <TimeCounting /> */}</div>
      </div>
    </React.Fragment>
  );
}

export default Index;
