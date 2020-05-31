import React from "react";
import BookCard from "./BookCard";
import BookPagination from "./BookViewPagination";
import { Card, CardBody, CardHeader } from "reactstrap";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

const BookView = (props) => {
  const { category } = props;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const searchQuery = useQuery();
  const searchvalue = searchQuery.get("search");
  return (
    <Card>
      <CardHeader>
        <strong>List Books</strong>
      </CardHeader>
      <CardBody>
        <SearchBar></SearchBar>
        <BookPagination
          searchQuery={searchvalue}
          category={encodeURI(category)}
          itemsCountPerPage={10}
          pageRangeDisplayed={3}
        ></BookPagination>
      </CardBody>
    </Card>
  );
};
export default BookView;
