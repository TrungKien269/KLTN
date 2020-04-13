import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";
import axios from "axios";

const Index = (props) => {
  const { itemsCountPerPage, pageRangeDisplayed, category = "" } = props;
  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [data, setData] = useState([]);

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
          hideDisabled={true}
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Index;
