import React, { Component } from "react";
import ProductDetailSection from "../../components/products/ProductDetailSection";
import { withRouter, useParams } from "react-router-dom";
import CommentSection from "../../components/products/CommentSection";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

function BookDetail(props) {
  const { id = "" } = useParams();

  return (
    <React.Fragment>
      <Header />
      <ProductDetailSection bookInfo={id} />
      <div className="container">
        <CommentSection id={id} />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(BookDetail);
