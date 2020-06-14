import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import EBookCard from './EBookCard';
import axios from "axios";

function EBookPagi(props) {
  const {
    itemsCountPerPage,
    pageRangeDisplayed,
    category = ""
  } = props;

  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [data, setData] = useState(null);
  const [flexData, setFlexData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios({
      method: "get",
      url: "http://localhost:5000/api/EBook/ListEBook",
    }).then(function (res) {
      setData(res.data.obj);
    });
    setLoadingRange([0, itemsCountPerPage - 1]);
    setActivePage(1);
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/EBook/ListEBook",
    }).then(function (res) {
      if (category.length > 0) {
        var arrData = [];
        arrData = res.data.obj;
        setData(arrData.filter((x) => x.category === category));
      }
      else {
        setData(res.data.obj);
      }
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
        const ebook = listData[i];
        result.push(
          <div className="col-lg-3 col-md-4 col-6" key={ebook.id}>
            <EBookCard
              id={ebook.id}
              name={ebook.name}
              image={ebook.image}
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
  )
}

export default EBookPagi
