import React, { Component, useEffect, useState, useMemo } from "react";
import { Rating } from "semantic-ui-react";
import Axios from "axios";

const ProductRatingCard = (props) => {
  const [rating, setRating] = useState();
  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:5000/api/BookInfo/RatingInfo",
      params: {
        bookID: props.id,
      },
    }).then((res) => {
      // console.log(res.data.obj);
      setRating(res.data.obj);
    });
  }, []);

  const showRating = useMemo(() => {
    if (rating) {
      return (
        <Rating
          icon="star"
          defaultRating={rating.averagePoint / 2}
          maxRating={5}
          disabled
          size="huge"
        />
      );
    }
  }, [rating]);

  return (
    <div className="card__book-rating d-flex align-items-center">
      {showRating}
    </div>
  );
};
export default ProductRatingCard;
