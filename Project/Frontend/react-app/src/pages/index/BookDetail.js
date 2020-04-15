import React, { Component } from "react";
import ProductDetailSection from "../../components/products/ProductDetailSection";
import { withRouter, useParams } from "react-router-dom";

function BookDetail(props) {
  const { id = "" } = useParams();

  return (
    <div>
      <ProductDetailSection bookInfo={id} />
    </div>
  );
}

export default withRouter(BookDetail);
