import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import ProductCard from "./ProductCard";
import NumberFormat from "react-number-format";
import axios from "axios";

const Index = (props) => {
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLoadingRange([0, itemsCountPerPage - 1]);
    const { from, to } = query || {};
    if (data) {
      if (from && to && from !== "-1" && to !== "-1") {
        const newData = data.filter(
          (v) => v.currentPrice >= from && v.currentPrice <= to
        );
        setFlexData(newData);
      } else setFlexData(null);
    }
  }, [query, data]);

  useEffect(() => {
    const { sortfield, sorttype } = sortQuery || {};
    if (data && sortfield && sorttype) {
      const fields = {
        Price: "currentPrice",
        Name: "name",
      };
      if (sorttype == "ASC") {
        let sortData = flexData || data;
        if (sortfield === "Price")
          sortData.sort((a, b) => a[fields[sortfield]] - b[fields[sortfield]]);
        else {
          sortData.sort((a, b) =>
            a[fields[sortfield]].localeCompare(b[fields[sortfield]])
          );
        }
        setFlexData([...sortData]);
      } else {
        let sortData = flexData || data;
        if (sortfield === "Price")
          sortData.sort((a, b) => b[fields[sortfield]] - a[fields[sortfield]]);
        else
          sortData.sort((a, b) =>
            b[fields[sortfield]].localeCompare(a[fields[sortfield]])
          );
        setFlexData([...sortData]);
      }
    }
  }, [sortQuery, data]);

  useEffect(() => {
    const searchvalue = searchQuery;
    if (searchvalue != null) {
      axios({
        method: "get",
        url: `http://localhost:5000/api/ListBook/Search/value=${searchvalue}`,
      }).then((res) => {
        setData(res.data.obj);
      });
      setLoadingRange([0, itemsCountPerPage - 1]);
      setActivePage(1);
    }
  }, [searchQuery]);

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
          <div className="col-lg-3 col-md-4 col-6" key={book.id}>
            <ProductCard
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
          </div>
        );
      }
    } else {
      result.push(
        <React.Fragment>
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
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
      <div className="row w-100">{showListData}</div>
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

export default Index;
