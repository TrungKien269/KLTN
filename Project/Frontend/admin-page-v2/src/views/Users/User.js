import React, { useState, useEffect, useMemo } from "react";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import { Button, Dropdown } from "semantic-ui-react";
import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

function User(props) {
  const [user, setUser] = useState(null);
  const [coupon, setCoupon] = useState(null);

  const couponOptions = [
    { key: 5, value: 0.05, text: "5%" },
    { key: 6, value: 0.06, text: "6%" },
    { key: 7, value: 0.07, text: "7%" },
    { key: 8, value: 0.08, text: "8%" },
    { key: 9, value: 0.09, text: "9%" },
    { key: 10, value: 0.1, text: "10%" },
    { key: 11, value: 0.11, text: "11%" },
    { key: 12, value: 0.12, text: "12%" },
    { key: 13, value: 0.13, text: "13%" },
    { key: 14, value: 0.14, text: "14%" },
    { key: 15, value: 0.15, text: "15%" },
  ];

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/StatisticUser/",
      params: {
        userID: parseInt(props.match.params.id),
      },
    }).then((res) => {
      setUser(res.data.obj);
    });
  }, []);

  const getBadge = (status) => {
    return status === "Available"
      ? "success"
      : status === "Banned"
        ? "danger"
        : "primary";
  };

  const showUserInfo = useMemo(() => {
    if (user) {
      return (
        <tbody>
          <tr>
            <td>ID</td>
            <td>
              <strong>{user.id}</strong>
            </td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td>
              <strong>{user.fullName}</strong>
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <strong>{user.email}</strong>
            </td>
          </tr>
          <tr>
            <td>Created Date</td>
            <td>
              <strong>
                {moment(user.createdDateTime).format("YYYY-MM-DD hh:mm:ss")}
              </strong>
            </td>
          </tr>
          <tr>
            <td>Number of Order Purchased</td>
            <td>
              <strong>{user.numberOrder}</strong>
            </td>
          </tr>
          <tr>
            <td>Number of Book Rated</td>
            <td>
              <strong>{user.numberRating}</strong>
            </td>
          </tr>
          <tr>
            <td>State</td>
            <td>
              <Badge color={getBadge(user.state)}>{user.state}</Badge>
            </td>
          </tr>
          <div className="mt-2">
            {user.state === "Available" ? (
              <Button color="red" onClick={(id) => handleBan(user.id)}>
                Ban user
              </Button>
            ) : (
                <Button color="green" onClick={(id) => handleActivate(user.id)}>
                  Activate user
              </Button>
              )}
          </div>
        </tbody>
      );
    } else {
      return (
        <span>
          <i className="text-muted icon-ban"></i> Not found
        </span>
      );
    }
  }, [user]);

  const handleActivate = (id) => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "put",
      url: "http://localhost:5000/api/Admin/UpdateUserState/",
      params: {
        userID: parseInt(id),
        state: "Available",
      },
    })
      .then((res) => {
        console.log(res.data.obj);
        setUser({ ...user, state: "Available" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBan = (id) => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "put",
      url: "http://localhost:5000/api/Admin/UpdateUserState/",
      params: {
        userID: parseInt(id),
        state: "Banned",
      },
    })
      .then((res) => {
        console.log(res.data.obj);
        setUser({ ...user, state: "Banned" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectCoupon = (event, field) => {
    let value = field.value;
    setCoupon(value);
  }

  const SendCoupon = () => {
    if (coupon) {
      Axios({
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
        },
        method: "POST",
        url: "http://localhost:5000/api/Admin/SendCouponEmail",
        params: {
          value: parseFloat(coupon),
          userID: parseInt(props.match.params.id),
        }
      }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Coupon has been sent to this user"
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
        }
      }).catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      })
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" lg="6">
          <Card>
            <CardHeader>
              <strong>
                <i className="icon-info pr-1"></i>User ID:{" "}
                {props.match.params.id}
              </strong>
            </CardHeader>
            <CardBody>
              <div className="d-flex flex-row flex-wrap align-items-center mb-2 ">
                <h4 className="mb-0">Send Coupon</h4>
                <Dropdown
                  className="m-1"
                  placeholder="State"
                  options={couponOptions}
                  selection
                  value={coupon ? coupon : ""}
                  onChange={(e, data) => handleSelectCoupon(e, data)}
                />
                <Button size="small" color="green"  onClick={SendCoupon}>
                  Send
                </Button>
              </div>
              <Table responsive striped>
                {showUserInfo}
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" lg="3"></Col>
      </Row>
    </div>
  );
}

export default User;
