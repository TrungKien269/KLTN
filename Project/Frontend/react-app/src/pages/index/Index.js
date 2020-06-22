import React, { useMemo } from "react";
import HeaderBanner from "../../components/headbanner/HeaderBanner";
import SpecialItemSlide from "../../components/products/SpecialItemSlide";
import ProductSlideBestSale from "../../components/products/ProductSlideBestSale";
import ProductSlideBestPrice from "../../components/products/ProductSlideBestPrice";
import ProductSlidePromotion from "../../components/products/ProductSlidePromotion";
import ProductSlideRecommend from "../../components/products/ProductSlideRecommend";
import { getToken } from "../../Utils/Commons";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();

  const ShowListRecommendBook = () => {
    if (getToken()) {
      return (
        <div className="section__bestseller">
          <div className="container">
            <div className="title-wrapper">
              <h3>{t("Recommend for you")}</h3>
            </div>
            <ProductSlideRecommend />
          </div>
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <HeaderBanner></HeaderBanner>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>{t("Best Price")}</h3>
          </div>
          <ProductSlideBestSale />
        </div>
      </div>
      <div className="section__bestseller">
        <div className="container">
          <div className="title-wrapper">
            <h3>{t("Best Sellers")}</h3>
          </div>
          <ProductSlideBestPrice />
        </div>
      </div>
      {ShowListRecommendBook()}
      <div className="section__feature">
        <SpecialItemSlide />
      </div>
      {/* <div className="section__promo">
        <h2>{t("Limited time offer for sales")}</h2>
        <div className="container">
          <ProductSlidePromotion />
        </div>
      </div> */}
    </React.Fragment>
  );
};

export default Index;
