import React, { useMemo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import axios from "axios";

import { Search } from "semantic-ui-react";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (getToken()) {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "get",
        url: "http://localhost:5000/api/Main/SearchHistory",
      }).then((response) => {
        if (response.data.status) {
          setSearchHistory(response.data.obj);
        }
      });
    }
  }, []);

  const sHistory = useMemo(() => {
    let dataSearch = [];
    if (searchHistory && searchHistory.length > 0) {
      dataSearch = searchHistory.map((sh) => {
        return { title: sh.words, key: sh.id };
      });
    }
    return dataSearch;
  }, [searchHistory]);

  const handleSearch = (event) => {
    if (getToken()) {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "get",
        url: "http://localhost:5000/api/Main/SearchHistory",
      }).then((response) => {
        if (response.data.status) {
          setSearchHistory(response.data.obj);
        }
      });
    }
    if (event.key === "Enter") {
      let value = event.target.value;
      setSearch(value);
      if (value != "") {
        let routeString = `?search=${value}`;
        props.history.push("/collections/" + routeString);

        axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          method: "post",
          url: "http://localhost:5000/api/Main/SaveSearch",
          params: {
            words: value,
          },
        }).then((response) => {
          if (response.data.status) {
            setSearchHistory((prev) => [response.data.obj, ...prev]);
          }
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="input__search-bar">
        {/* <input type="text" placeholder="Search" onKeyPress={(e) => Search(e)} />
        <i className="fas fa-search" /> */}
        <Search
          results={sHistory}
          // noResultsMessage="history is empty"
          onKeyDown={(e) => handleSearch(e)}
          className=""
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(SearchBar);
