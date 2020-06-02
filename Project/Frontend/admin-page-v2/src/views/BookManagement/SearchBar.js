import React, { useMemo, useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import axios from "axios";
import { Row, Col, Button, FormGroup } from "reactstrap";
import { Search, Dropdown } from "semantic-ui-react";
import { setGlobalCssModule } from "reactstrap/lib/utils";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const sortOptions = [
    { key: "1", value: "Price ASC", text: "Giá tăng dần" },
    { key: "2", value: "Price DES", text: "Giá giảm dần" },
    { key: "3", value: "Name ASC", text: "Tên từ A-Z" },
    { key: "4", value: "Name DES", text: "Tên từ Z-A" },
  ];
  let categoryOptions = [];

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then((res) => {
      if (res.data.status) {
        setCategory(res.data.obj);
      }
    });
  }, []);

  if (category) {
    categoryOptions = category.map((category) => {
      return { key: category.id, value: category.name, text: category.name };
    });
  }

  // if (category) {
  //   console.log(category);
  // }

  const handleClear = () => {
    props.history.push("/bookmanagement");
  };
  const handleSelectCategory = (event, data) => {
    let value = data.value;
    setSelectedCategory(data.value);
    if (value != "") {
      let routeString = `?category=${value}`;
      props.history.push(routeString);
    }
  };
  const handleSelectSort = (e, data) => {
    let value = data.value;
    if (value != "") {
      let routeString = "";
      let field = value.split(" ")[0];
      let type = value.split(" ")[1];
      routeString = `?sortfield=${field}&sorttype=${type}`;
      props.history.push(routeString);
    }
  };
  const handleSearch = (event) => {
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
      } else {
      }
    }
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="d-flex">
          <Search id="search" onKeyDown={(e) => handleSearch(e)} />
          <Dropdown
            selection
            className="ml-1"
            placeholder="Select category"
            options={categoryOptions}
            onChange={(e, data) => handleSelectCategory(e, data)}
          />
          <Dropdown
            selection
            className="ml-1"
            placeholder="Sort"
            options={sortOptions}
            onChange={(e, data) => handleSelectSort(e, data)}
          />
          <Button color="danger" className="btn ml-1" onClick={handleClear}>
            <i className="fa fa-close"></i> Clear search
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(SearchBar);
