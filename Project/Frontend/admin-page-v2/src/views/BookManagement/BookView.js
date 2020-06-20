import React from "react";
import BookPagination from "./BookViewPagination";
import { Card, CardBody, CardHeader } from "reactstrap";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

const BookView = (props) => {
  const { onSelectBook } = props;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const from = query.get("from");
  const to = query.get("to");

  const sortQuery = useQuery();
  const sortfield = sortQuery.get("sortfield");
  const sorttype = sortQuery.get("sorttype");

  const searchQuery = useQuery();
  const searchvalue = searchQuery.get("search");

  const categoryQuery = useQuery();
  const category = categoryQuery.get("category");
  return (
    <Card>
      <CardHeader>
        <strong>List Books</strong>
      </CardHeader>
      <CardBody>
        <SearchBar></SearchBar>
        <BookPagination
          query={{ from, to }}
          sortQuery={{ sortfield, sorttype }}
          searchQuery={searchvalue}
          category={category}
          itemsCountPerPage={10}
          pageRangeDisplayed={10}
          selectBookID={onSelectBook}
        ></BookPagination>
      </CardBody>
    </Card>
  );
};
export default BookView;
