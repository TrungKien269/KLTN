import React from "react";
import SideBarCategories from "../../components/utilities/SideBarCategories";
import SideBarPriceRange from "../../components/utilities/SideBarPriceRange";
import SideBarBrand from "../../components/utilities/SideBarBrand";
import ProductCard from "../../components/products/ProductCard";
import ListProducts from "../../components/products/ListProducts";
function Collections() {
  return (
    <React.Fragment>
      <section className="section__product-list">
        <div className="container">
          <div className="row">
            <div className="col-md-3 hidden-md-elements">
              <SideBarCategories />
              <SideBarPriceRange />
              <SideBarBrand />
            </div>
            <div className="col-md">
              <div class="title-wrapper">
                <h1>Products</h1>
              </div>
              <div className="row">
                <ListProducts />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default Collections;
