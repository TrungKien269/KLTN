import React, { useState, useMemo } from "react";
import Pagination from "react-js-pagination";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";

const Index = (props) => {
  const { data, itemsCountPerPage, pageRangeDisplayed } = props;
  // console.log(props);
  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);

  const handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    // console.log(itemsCountPerPage);
    setActivePage(pageNumber);
    setLoadingRange([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const showListData = useMemo(() => {
    let result = [];
    if (data.length > 0) {
      let start = loadingRange[0];
      let end =
        loadingRange[1] > data.length ? data.length - 1 : loadingRange[1];
      console.log(end);
      for (let i = start; i <= end; i++) {
        const book = data[i];
        result.push(
          <div className="col-lg-3 col-md-4 col-sm-6" key={book.id}>
            <ProductCard
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
          </div>
        );
      }
    }
    return result;
  }, [loadingRange, data]);

  return (
    <>
      <div className="row">{showListData}</div>
      <div className="d-flex justify-content-center w-100">
        <Pagination
          activePage={activePage}
          totalItemsCount={data.length}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Index;
