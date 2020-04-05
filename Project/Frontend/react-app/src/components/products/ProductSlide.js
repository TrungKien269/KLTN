import React from "react";
import ProductCard from "./ProductCard";

function ProductSlide() {
  return (
    <React.Fragment>
      <div class="owl-carousel owl-carousel-product owl-theme">
        <ProductCard />
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </React.Fragment>
  );
}

export default ProductSlide;
