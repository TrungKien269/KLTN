import React, { Component } from "react";
import ProductDetailSection from "../../components/products/ProductDetailSection";
import { withRouter, useParams } from "react-router-dom";
import CommentSection from "../../components/products/CommentSection";

function BookDetail(props) {
  const { id = "" } = useParams();

  return (
    <div>
      <ProductDetailSection bookInfo={id} />
      <div className="container">
        <CommentSection />
      </div>
    </div>
  );
}

export default withRouter(BookDetail);
