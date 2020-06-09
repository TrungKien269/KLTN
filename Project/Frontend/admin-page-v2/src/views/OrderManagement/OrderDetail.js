import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import NumberFormat from "react-number-format";
const OrderDetail = (props) => {
  const [order, setOrder] = useState("");

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
            <td>{orderD.book.currentPrice}</td>
            <td>{orderD.quantity}</td>
            <td>{orderD.quantity * orderD.book.currentPrice}</td>
          </tr>
        );
      });
    }
    return (
      <React.Fragment>
        <Card>
          <CardHeader className="position-relative">
            <div className="d-flex justify-content-lg-between">
              <div>
                {" "}
                <i className="fa fa-align-justify"></i>{" "}
                <strong>Order ID: </strong>
                {order.id} | <strong>Order Date:</strong> {order.createdDate}
                {" | "}
                <strong>Customer name: </strong> {order.fullName}
                {" | "}
                <strong>Address: </strong> {order.address}
                {" | "} <strong>Phone number: </strong>
                {order.phoneNumber}
                {" | "} <strong>Payment type: </strong> {order.type}
              </div>
              <span>
                {" "}
                {order.status === "processing" ? (
                  <Badge color="warning">proccessing</Badge>
                ) : order.status === "Delivering" ? (
                  <Badge color="success">Delivering</Badge>
                ) : order.status === "Delivered" ? (
                  <Badge color="success">Delivered</Badge>
                ) : order.status === "Canceled" ? (
                  <Badge color="danger">Canceled </Badge>
                ) : (
                  ""
                )}
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <strong>
              {" "}
              Total:{" "}
              <NumberFormat
                value={order.total}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
              {" | "}
              Shipping fee:{" "}
              <NumberFormat
                value={order.shippingFee}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" VND"}
              />
            </strong>

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
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button"></PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag="button"></PaginationLink>
              </PaginationItem>
            </Pagination>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }, [order]);

  return <div>{showOrderDetail}</div>;
};
export default OrderDetail;
