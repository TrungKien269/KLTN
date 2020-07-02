import React, { Component } from "react";
import ProductDetailSection from "../../components/products/ProductDetailSection";
import { withRouter, useParams } from "react-router-dom";
import CommentSection from "../../components/products/CommentSection";

function BookDetail(props) {
  const { id = "" } = useParams();

  return (
    <React.Fragment>
      <ProductDetailSection bookInfo={id} />
      <div className="container mt-5 pad-0-0">
        <CommentSection id={id} />
      </div>
    </React.Fragment>
  );
}

export default withRouter(BookDetail);
