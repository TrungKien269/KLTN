import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Button,
  Row,
  Table,
} from "reactstrap";
import NumberFormat from "react-number-format";
import moment from "moment";
import Swal from "sweetalert2";

const OrderDetail = (props) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/GetOrderDetails",
      params: {
        orderID: props.match.params.id,
      },
    }).then((res) => {
      console.log(res.data.obj);
      setOrder(res.data.obj);
    });
  }, []);

  const showOrderDetail = useMemo(() => {
    let results = "";
    if (order) {
      let x = order.orderDetail;
      results = x.map((orderD) => {
        return (
          <tr key={orderD.book.id}>
            <td> {orderD.book.id}</td>
            <td>{orderD.book.name}</td>
            <td>
              <NumberFormat
                value={orderD.book.currentPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            </td>
            <td>{orderD.quantity}</td>
            <td>
              <NumberFormat
                value={orderD.quantity * orderD.book.currentPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            </td>
          </tr>
        );
      });
      return (
        <React.Fragment>
          <Card>
            <CardHeader className="position-relative">
              <div className="d-flex justify-content-lg-between">
                <div>
                  {" "}
                  <i className="fa fa-align-justify"></i>
                  <strong>Order ID:</strong> &nbsp;{order.id}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Book name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>{results}</tbody>
              </Table>
              <Row>
                <Col lg="6">
                  <h5>
                    Type: &nbsp;
                    <strong>{order.type}</strong>
                  </h5>
                  <h5>
                    Total: &nbsp;
                    <strong>
                      <NumberFormat
                        value={order.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                      />
                    </strong>
                  </h5>
                  <h5>
                    Shipping fee: &nbsp;
                    <strong>
                      <NumberFormat
                        value={order.shippingFee}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={" VND"}
                      />
                    </strong>
                  </h5>
                  <h5>
                    Created Date: &nbsp;
                    <strong>
                      {moment(order.createdDate).format("DD-MM-YYYY hh:mm:ss")}
                    </strong>
                  </h5>
                  {order.status === "Processing" ? (
                    <Button
                      color="success"
                      size="lg"
                      onClick={() => handleConfirm(order.id, "Delivering")}
                    >
                      Confirm Order
                    </Button>
                  ) : order.status === "Delivering" ? (
                    <Button
                      color="success"
                      size="lg"
                      onClick={() => handleConfirm(order.id, "Delivered")}
                    >
                      Confirm Order
                    </Button>
                  ) : (
                    ""
                  )}
                </Col>
                <Col lg="6">
                  <h5>
                    State: &nbsp;
                    {order.status === "Processing" ? (
                      <Badge color="warning">Processing</Badge>
                    ) : order.status === "Delivering" ? (
                      <Badge color="primary">Delivering</Badge>
                    ) : order.status === "Delivered" ? (
                      <Badge color="success">Delivered</Badge>
                    ) : (
                      <Badge color="danger">Canceled </Badge>
                    )}
                  </h5>
                  <h5>
                    Customer name: &nbsp;
                    <strong>{order.fullName}</strong>
                  </h5>
                  <h5>
                    Phone number: &nbsp;
                    <strong>{order.phoneNumber}</strong>
                  </h5>
                  <h5>
                    Address: &nbsp;
                    <strong>{order.address}</strong>
                  </h5>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </React.Fragment>
      );
    }
  }, [order]);

  const handleConfirm = (orderID, state) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to confirm this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          method: "post",
          url: "http://localhost:5000/api/Admin/ConfirmOrder",
          params: {
            id: orderID,
            status: state,
          },
        })
          .then((res) => {
            if (res.data.status) {
              Swal.fire({
                title: "Done",
                text: "Confirm this order",
                icon: "success",
              }).then(() => {
                var newOrder = order;
                setOrder({ ...order, newOrder });
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: res.data.message,
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: err,
            });
          });
      }
    });
  };

  return <div>{showOrderDetail}</div>;
};
export default OrderDetail;
