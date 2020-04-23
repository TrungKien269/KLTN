import React, { Component, useEffect, useState, useMemo } from "react";
import { Rating } from "semantic-ui-react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import Swal from "sweetalert2";

const ProductRatingVote = (props) => {
  const [rate, setRate] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleRate = (e, { rating }) => {
    setRate({ rating });
  };

  const handleSubmit = () => {
    if (getToken()) {
      Axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "post",
        url: "http://localhost:5000/api/BookInfo/RateBook",
        params: {
          bookID: props.id,
          point: rate.rating,
        },
      }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Success",
            text: "Thanks for your rate",
            icon: "success",
          });
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "You have to login to rate a book",
        icon: "error",
      });
    }
  };

  const rateForm = useMemo(() => {
    if (submit) {
      return (
        <Rating
          maxRating={10}
          onRate={handleRate}
          size="huge"
          icon="star"
          disabled
        />
      );
    } else {
      return (
        <Rating maxRating={10} onRate={handleRate} size="massive" icon="star" />
      );
    }
  }, [submit]);

  return (
    <div className="d-flex flex-row align-items-center">
      {rateForm}
      <button className="btn btn-fit" onClick={handleSubmit}>
        Vote
      </button>
    </div>
  );
};
export default ProductRatingVote;