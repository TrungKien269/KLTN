import React from "react";
import BookCard from "./BookCard";
import BookPagination from "./BookViewPagination";
import { Card, CardBody, CardHeader } from "reactstrap";

const BookView = (props) => {
  const { category } = props;

  return (
    <Card>
      <CardHeader>
        <strong>List Books</strong>
      </CardHeader>
      <CardBody>
        <BookPagination
          category={encodeURI(category)}
          itemsCountPerPage={10}
          pageRangeDisplayed={3}
        ></BookPagination>
      </CardBody>
    </Card>
  );
};
export default BookView;
