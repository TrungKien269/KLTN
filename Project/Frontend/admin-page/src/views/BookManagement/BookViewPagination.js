import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import BookCard from "./BookCard";
import NumberFormat from "react-number-format";
import { Header, Image, Table, Button } from "semantic-ui-react";
import axios from "axios";

const BookPagination = (props) => {
  const {
    itemsCountPerPage,
    pageRangeDisplayed,
    category = "",
    query,
    sortQuery,
    searchQuery,
  } = props;

  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [data, setData] = useState(null);
  const [flexData, setFlexData] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/ListBook/${
        category.length > 0 ? `Category/${category}` : "GetAll"
      }`,
    }).then(function (res) {
      setData(res.data.obj);
    });
    setLoadingRange([0, itemsCountPerPage - 1]);
    setActivePage(1);
  }, [category]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setActivePage(pageNumber);
    setLoadingRange([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const showListData = useMemo(() => {
    let result = [];
    let listData = flexData || data;
    if (listData && listData.length > 0) {
      let start = loadingRange[0];
      let end =
        loadingRange[1] > listData.length
          ? listData.length - 1
          : loadingRange[1];
      for (let i = start; i <= end; i++) {
        const book = listData[i];
        result.push(
          <BookCard
            key={book.id}
            id={book.id}
            name={book.name}
            image={book.image}
            price={
              <NumberFormat
                value={book.currentPrice}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"VND "}
              />
            }
          />
        );
      }
    } else {
      result.push(
        <React.Fragment>
          <div className="w-100">
            <h2>NOT FOUND</h2>
            <img
              className="img-contain img-cover-50"
              src="/img/empty_state.png"
            />
          </div>
        </React.Fragment>
      );
    }
    return result;
  }, [loadingRange, data, flexData]);

  return (
    <>
      <div className="d-flex justify-content-center w-100">
        <Pagination
          hideDisabled={true}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={flexData ? flexData.length : data ? data.length : 0}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Book image</Table.HeaderCell>
            <Table.HeaderCell>Book name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{showListData}</Table.Body>
      </Table>

      <div className="d-flex justify-content-center w-100">
        <Pagination
          hideDisabled={true}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={flexData ? flexData.length : data ? data.length : 0}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BookPagination;
