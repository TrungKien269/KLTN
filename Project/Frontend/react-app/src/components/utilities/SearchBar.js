import React, { useMemo, useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import axios from "axios";
import moment from "moment";

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
          console.log(response.data.obj);
        }
      });
    }
  }, []);

  const Search = (event) => {
    if (event.key === "Enter") {
      let value = event.target.value;
      setSearch(value);
      if (value != "") {
        let routeString = `?search=${value}`;
        props.history.push("/collections/" + routeString);
        // var newSearchHistory = {
        //   id: 3,
        //   userId: 4002,
        //   words: value,
        //   dateTime: moment().toISOString(),
        //   user: null
        // }

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
    <div className="input__search-bar">
      <input type="text" placeholder="Search" onKeyPress={(e) => Search(e)} />
      <i className="fas fa-search" />
    </div>
  );
};

export default withRouter(SearchBar);
