import React, { useMemo, useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import axios from "axios";
import moment from "moment";
import { Search, Grid, Header, Segment } from "semantic-ui-react";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // useEffect(() => {
  //   if (getToken()) {
  //     axios({
  //       headers: {
  //         Authorization: "Bearer " + getToken(),
  //       },
  //       method: "get",
  //       url: "http://localhost:5000/api/Main/SearchHistory",
  //     }).then((response) => {
  //       if (response.data.status) {
  //         console.log(response.data.obj);
  //         setSearchHistory(response.data.obj);
  //       }
  //     });
  //   }
  // }, []);

  const sHistory = useMemo(() => {
    let results = [];
    let dataSearch = [];
    if (searchHistory && searchHistory.length > 0) {
      dataSearch = searchHistory.map((sh) => {
        results.push({
          title: sh.words,
          key: sh.id,
        });
      });
    }
    return results;
  }, [searchHistory]);

  const handleSearch = (event) => {
    let value = event.target.value;
    if (getToken()) {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "get",
        url: "http://localhost:5000/api/Main/SearchHistory",
      }).then((response) => {
        if (response.data.status) {
          console.log(response.data.obj);
          setSearchHistory(response.data.obj);
        }
      });
    }
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
          // setSearchHistory((prev) => [response.data.obj, ...prev]);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className="input__search-bar">
        {/* <input type="text" placeholder="Search" onKeyPress={(e) => Search(e)} />
        <i className="fas fa-search" /> */}
        <Search
          results={sHistory}
          noResultsMessage="history is empty"
          onSearchChange={(e) => handleSearch(e)}
          onBlur={(e) => handleSearch(e)}
        />
      </div>
    </React.Fragment>
  );
};

export default withRouter(SearchBar);
