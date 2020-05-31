import React from "react";
import BookForm from "./BookForm";
import BookCard from "./BookCard";
import { Row, Col } from "reactstrap";
import BookView from "./BookView";

const BooksManagement = () => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
          <BookView category=""></BookView>
        </Col>

        <Col xs="12" md="12">
          <BookForm></BookForm>
        </Col>
      </Row>
    </div>
  );
};
export default BooksManagement;
