import React, { useMemo, useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import axios from "axios";
import { Row, Col, Button, FormGroup } from "reactstrap";
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
          console.log(response.data.obj);
          setSearchHistory(response.data.obj);
        }
      });
    }
  }, []);

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

  const handleClear = () => {
    setSearch("");
    props.history.push("/bookmanagement");
  };
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
          console.log(response.data.obj);
          setSearchHistory(response.data.obj);
        }
      });
    }
    if (event.key === "Enter") {
      let value = event.target.value;

      setSearch(value);
      if (value != "") {
        let routeString = `?search=${value}`;
        props.history.push("/bookmanagement/" + routeString);

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
      else{
          
      }
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="d-flex">
          <Search
            id="search"
            results={sHistory}
            onKeyDown={(e) => handleSearch(e)}
            className=""
          />
          <Button color="danger" className="btn-pill" onClick={handleClear}>
            <i className="fa fa-lightbulb-o"></i>&nbsp; Clear search
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(SearchBar);
