import React from "react";
import SideBarCategories from "../../components/utilities/SideBarCategories";
import SideBarBrand from "../../components/utilities/SideBarBrand";
import ListProducts from "../../components/products/ListProducts";
import { withRouter } from "react-router-dom";

function Collections(props) {
  const { category = "" } = props.match.params;
  
  return (
    <React.Fragment>
      <section className="section__product-list">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SideBarCategories />

              <SideBarBrand />
            </div>
            <div className="col-md">
              <div className="title-wrapper">
                <h1>{category !== "" ? category : "All Products"}</h1>
              </div>
              <div className="row">
                <ListProducts category={category} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export default withRouter(Collections);
