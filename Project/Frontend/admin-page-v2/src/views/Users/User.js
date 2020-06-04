import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table, Button } from 'reactstrap';
import Axios from 'axios';
import moment from 'moment';

function User(props) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/StatisticUser/",
      params: {
        userID: parseInt(props.match.params.id)
      }
    }).then((res) => {
      setUser(res.data.obj);
    })
  }, []);

  const getBadge = (status) => {
    return status === 'Available' ? 'success' :
      status === 'Banned' ? 'danger' :
        'primary'
  }

  const showUserInfo = useMemo(() => {
    if (user) {
      return (
        <tbody>
          <tr>
            <td>ID</td>
            <td><strong>{user.id}</strong></td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td><strong>{user.fullName}</strong></td>
          </tr>
          <tr>
            <td>Email</td>
            <td><strong>{user.email}</strong></td>
          </tr>
          <tr>
            <td>Created Date</td>
            <td><strong>{moment(user.createdDateTime).format("YYYY-MM-DD hh:mm:ss")}</strong></td>
          </tr>
          <tr>
            <td>Number of Order Purchased</td>
            <td><strong>{user.numberOrder}</strong></td>
          </tr>
          <tr>
            <td>Number of Book Rated</td>
            <td><strong>{user.numberRating}</strong></td>
          </tr>
          <tr>
            <td>State</td>
            <td><Badge color={getBadge(user.state)}>{user.state}</Badge></td>
          </tr>
          <Button color="success" onClick={(id) => handleActivate(user.id)}>Activate</Button>
          <Button color="danger" onClick={(id) => handleBan(user.id)}>Ban</Button>
        </tbody>
      )
    }
    else {
      return (<span><i className="text-muted icon-ban"></i> Not found</span>)
    }
  }, [user]);

  const handleActivate = (id) => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token")
      },
      method: "put",
      url: "http://localhost:5000/api/Admin/UpdateUserState/",
      params: {
        userID: parseInt(id),
        state: "Available"
      }
    }).then((res) => {
      console.log(res.data.obj);
      setUser({...user, state: "Available"});
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleBan = (id) => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token")
      },
      method: "put",
      url: "http://localhost:5000/api/Admin/UpdateUserState/",
      params: {
        userID: parseInt(id),
        state: "Banned"
      }
    }).then((res) => {
      console.log(res.data.obj);
      setUser({...user, state: "Banned"});
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg={12}>
          <Card>
            <CardHeader>
              <strong><i className="icon-info pr-1"></i>User ID: {props.match.params.id}</strong>
            </CardHeader>
            <CardBody>
              <Table responsive striped hover>
                {showUserInfo}
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default User
