import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import UserRow from "./UserRow";
import Axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Container,
} from "reactstrap";
import { Search, Dropdown, Loader } from "semantic-ui-react";
import moment from "moment";

function UserPagination(props) {
  const { itemsCountPerPage, pageRangeDisplayed } = props;
  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [data, setData] = useState(null);
  const [flexData, setFlexData] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [timeTyping, setTimeTyping] = useState(null);

  const [userState, setUserState] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const stateOptions = [
    { key: "1", value: "Available", text: "Available" },
    { key: "2", value: "Banned", text: "Banned" },
  ];

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/GetListUser/",
    }).then((res) => {
      setData(res.data.obj);
      setRawData(res.data.obj);
      setLoadingRange([0, itemsCountPerPage - 1]);
      setActivePage(1);
    });
  }, []);

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
        const user = listData[i];
        user.createdDateTime = moment(user.createdDateTime).format(
          "YYYY-MM-DD hh:mm:ss"
        );
        result.push(<UserRow key={user.id} user={user} />);
      }
    } else {
      result.push(
        <React.Fragment>
          <div className="w-100">
            <h2>NOT FOUND</h2>
          </div>
        </React.Fragment>
      );
    }
    return result;
  }, [loadingRange, data, flexData]);

  const handleSearch = (event) => {
    var value = event.target.value;
    if (timeTyping) {
      clearTimeout(timeTyping);
    }
    setTimeTyping(
      setTimeout(() => {
        if (userState) {
          setSearchValue(value);
          setData(rawData);
          let filterData = flexData || data;
          filterData = filterData.filter((x) => x.fullName.includes(value));
          setData([...filterData]);
        } else {
          setSearchValue(value);
          setData(rawData);
          let filterData = rawData;
          filterData = filterData.filter((x) => x.fullName.includes(value));
          setData([...filterData]);
        }
      }, 1200)
    );
  };

  const handleSelectState = (event, field) => {
    let value = field.value;
    if (searchValue) {
      setData(rawData);
      let filterData = flexData || data;
      filterData = filterData.filter((x) => x.state === value);
      setData([...filterData]);
      setUserState(value);
    } else {
      setData(rawData);
      let filterData = rawData;
      filterData = filterData.filter((x) => x.state === value);
      setData([...filterData]);
      setUserState(value);
    }
  };

  const handleReset = () => {
    setData(rawData);
    setSearchValue(null);
    setTimeTyping(null);
    setUserState(null);
    document.getElementById("search").value = "";
  };

  if (data || flexData) {
    return (
      <React.Fragment>
        <div className="animated fadeIn container">
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Users
                </CardHeader>

                <CardBody>
                  <Row className="mb-1">
                    <Col className="d-flex">
                      <Search
                        id="search"
                        onSearchChange={(e) => handleSearch(e)}
                        defaultValue={searchValue ? searchValue : ""}
                      />
                      <Dropdown
                        selection
                        className="ml-1"
                        placeholder="Select state"
                        options={stateOptions}
                        value={userState ? userState : ""}
                        onChange={(e, data) => handleSelectState(e, data)}
                      />
                      <Button
                        color="danger"
                        className="btn ml-1"
                        onClick={handleReset}
                      >
                        <i className="fa fa-close"></i> Reset
                      </Button>
                    </Col>
                  </Row>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Created Date Time</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>{showListData}</tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-center w-100">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            hideDisabled={true}
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={
              flexData ? flexData.length : data ? data.length : 0
            }
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div className="d-flex h-100">
        <Loader active inline="centered" />
      </div>
    );
  }
}

export default UserPagination;
