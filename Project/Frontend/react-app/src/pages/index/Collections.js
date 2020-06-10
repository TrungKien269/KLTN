import React from "react";
import SideBarCategories from "../../components/utilities/SideBarCategories";
import SideBarBrand from "../../components/utilities/SideBarBrand";
import ListProducts from "../../components/products/ListProducts";
import { withRouter } from "react-router-dom";
import SideBarPriceRange from "../../components/utilities/SideBarPriceRange";
import SideBarPriceSort from "../../components/utilities/SideBarPriceSort";
import { useTranslation } from 'react-i18next';

function Collections(props) {
  
  const { category = "" } = props.match.params;

  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <section className="section__product-list">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SideBarCategories />
              <SideBarPriceRange />
              {/*<SideBarBrand />*/}
            </div>
            <div className="col-md">
              <div className="title-wrapper">
                <h1>{category !== "" ? t(category) : t('All Products')}</h1>
              </div>
              <div className="col-xd-6">
                <SideBarPriceSort />
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
