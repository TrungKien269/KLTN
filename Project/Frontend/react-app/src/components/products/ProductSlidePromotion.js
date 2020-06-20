import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import OwlCarousel from "react-owl-carousel2";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
import Axios from "axios";
import moment from "moment";
import TimeCounting from "../utilities/TimeCounter";

function ProductSlidePromotion(props) {
  const [promotion, setPromotion] = useState();

  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:5000/api/Main/ListCurrentPromotion",
    }).then((res) => {
      if (res.data.status) {
        setPromotion(res.data.obj);
      }
    });
  }, []);

  const ShowPromotionBooks = useMemo(() => {
    let result = {};
    if (promotion) {
      result = promotion[0].promotionDetail.map((promo) => {
        return (
          <ProductCard
            key={promo.book.id}
            id={promo.book.id}
            name={promo.book.name}
            image={promo.book.image}
            price={
              <NumberFormat
                value={promo.book.currentPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            }
            originalPrice={
              <NumberFormat
                value={promo.book.originalPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            }
            sale={parseFloat(promo.discount) * 100}
          />
        );
      });
    } else {
      return <Loader active inline="centered" size="huge" />;
    }
    return result;
  }, [promotion]);

  const ShowTimeCounting = useMemo(() => {
    if (promotion) {
      return <TimeCounting endedDate={promotion[0].endedDate} />;
    }
  }, [promotion]);

  const options = {
    nav: true,
    items: 4,
    margin: 20,
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

  return (
    <React.Fragment>
      {ShowTimeCounting}
      <OwlCarousel options={options}>{ShowPromotionBooks}</OwlCarousel>
    </React.Fragment>
  );
}

export default ProductSlidePromotion;
