import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import { Tab, Button } from "semantic-ui-react";
import NumberFormat from "react-number-format";
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
import { Link, withRouter } from "react-router-dom";
import moment from "moment";

const OrderManagement = () => {
  const [processingOrders, setProcessingOrders] = useState([]);
  const [deliveringOrders, setDeliveringOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "Get",
      url: "http://localhost:5000/api/Admin/ListProcessingAdmin",
    }).then((res) => {
      if (res.data.status) {
        setProcessingOrders(res.data.obj);
        console.log("process ", res.data.obj);
      }
    });

    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "Get",
      url: "http://localhost:5000/api/Admin/ListDeliveringAdmin",
    }).then((res) => {
      if (res.data.status) {
        setDeliveringOrders(res.data.obj);
        console.log("delivering ", res.data.obj);
      }
    });

    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "Get",
      url: "http://localhost:5000/api/Admin/ListDeliveredAdmin",
    }).then((res) => {
      if (res.data.status) {
        setDeliveredOrders(res.data.obj);
      }
    });

    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "Get",
      url: "http://localhost:5000/api/Admin/ListCanceledAdmin",
    }).then((res) => {
      if (res.data.status) {
        setCancelOrders(res.data.obj);
      }
    });
  }, []);

  const handleConfirm = (order, newState) => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "post",
      url: "http://localhost:5000/api/Admin/ConfirmOrder",
      params: {
        id: order.id,
        status: newState,
      },
    }).then((res) => {
      if (res.data.status) {
        alert("success");
        if (order.status === "Processing") {
          order.status = "Delivering";
          let newprocessingOrders = processingOrders.filter(
            (x) => x.id !== order.id
          );
          setProcessingOrders(newprocessingOrders);
          setDeliveringOrders((prev) => [order, ...prev]);
        } else if (order.status === "Delivering") {
          order.status = "Delivered";
          let newdeliveringOrders = deliveringOrders.filter(
            (x) => x.id !== order.id
          );
          setDeliveringOrders(newdeliveringOrders);
          setDeliveredOrders((prev) => [order, ...prev]);
        }
      }
    });
  };

  const showProcOrders = useMemo(() => {
    let results = "";
    if (processingOrders) {
      results = processingOrders.map((processingOrder) => {
        const linktodetail = `/ordermanagement/${processingOrder.id}`;

        return (
          <tbody>
            <tr>
              <td>{processingOrder.userId}</td>
              <td>{processingOrder.fullName}</td>
              <td>{processingOrder.phoneNumber}</td>
              <td>
                {moment(processingOrder.createdDate).format(
                  "YYYY-MM-DD hh:mm:ss"
                )}
              </td>
              <td>{processingOrder.id}</td>
              <td>
                <NumberFormat
                  value={processingOrder.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={processingOrder.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />{" "}
                / {processingOrder.type}
              </td>
              <td>
                <Badge color="warning">{processingOrder.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button
                    positive
                    onClick={(order) =>
                      handleConfirm(processingOrder, "Delivering")
                    }
                  >
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Link to={linktodetail}>
                    <Button>Detail</Button>
                  </Link>
                </Button.Group>
              </td>
            </tr>
          </tbody>
        );
      });
    }
    return results;
  }, [processingOrders]);

  const showDeliveringOrders = useMemo(() => {
    let results = "";
    if (deliveringOrders) {
      results = deliveringOrders.map((deliveringOrder) => {
        const linktodetail = `/ordermanagement/${deliveringOrder.id}`;
        return (
          <tbody>
            <tr>
              <td>{deliveringOrder.userId}</td>
              <td>{deliveringOrder.fullName}</td>
              <td>{deliveringOrder.phoneNumber}</td>
              <td>
                {moment(deliveringOrder.createdDate).format(
                  "YYYY-MM-DD hh:mm:ss"
                )}
              </td>
              <td>{deliveringOrder.id}</td>
              <td>
                <NumberFormat
                  value={deliveringOrder.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={deliveringOrder.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="success">{deliveringOrder.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button
                    positive
                    onClick={(order) =>
                      handleConfirm(deliveringOrder, "Delivered")
                    }
                  >
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Link to={linktodetail}>
                    <Button>Detail</Button>
                  </Link>
                </Button.Group>
              </td>
            </tr>
          </tbody>
        );
      });
    }
    return results;
  }, [deliveringOrders]);

  const showDeliveredOrders = useMemo(() => {
    let results = "";
    if (deliveredOrders) {
      results = deliveredOrders.map((deliveredOrder) => {
        const linktodetail = `/ordermanagement/${deliveredOrder.id}`;
        return (
          <tbody>
            <tr>
              <td>{deliveredOrder.userId}</td>
              <td>{deliveredOrder.fullName}</td>
              <td>{deliveredOrder.phoneNumber}</td>
              <td>
                {moment(deliveredOrder.createdDate).format(
                  "YYYY-MM-DD hh:mm:ss"
                )}
              </td>
              <td>{deliveredOrder.id}</td>
              <td>
                <NumberFormat
                  value={deliveredOrder.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={deliveredOrder.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="success">{deliveredOrder.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button
                    positive
                    onClick={(order) =>
                      handleConfirm(deliveredOrder, "Delivered")
                    }
                  >
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Link to={linktodetail}>
                    <Button>Detail</Button>
                  </Link>
                </Button.Group>
              </td>
            </tr>
          </tbody>
        );
      });
    }
    return results;
  }, [deliveredOrders]);

  const showCancelOrders = useMemo(() => {
    let results = "";
    if (cancelOrders) {
      results = cancelOrders.map((cancelOrder) => {
        return (
          <tbody>
            <tr>
              <td>{cancelOrder.userId}</td>
              <td>{cancelOrder.fullName}</td>
              <td>{cancelOrder.phoneNumber}</td>
              <td>
                {moment(cancelOrder.createdDate).format("YYYY-MM-DD hh:mm:ss")}
              </td>
              <td>{cancelOrder.id}</td>
              <td>
                <NumberFormat
                  value={cancelOrder.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={cancelOrder.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="secondary">{cancelOrder.status}</Badge>
              </td>
            </tr>
          </tbody>
        );
      });
    }
    return results;
  }, [deliveredOrders]);
  const panes = [
    {
      menuItem: "Processing orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Simple Table
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User id</th>
                    <th>Username</th>
                    <th>Phone number</th>
                    <th>Created date</th>
                    <th>Order ID</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                {showProcOrders}
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
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Delivering orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Simple Table
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User id</th>
                    <th>Username</th>
                    <th>Phone number</th>
                    <th>Created date</th>
                    <th>Order ID</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                {showDeliveringOrders}
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
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Delivered orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Simple Table
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User id</th>
                    <th>Username</th>
                    <th>Phone number</th>
                    <th>Created date</th>
                    <th>Order ID</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                {showDeliveredOrders}
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
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Cancel orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Simple Table
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User id</th>
                    <th>Username</th>
                    <th>Phone number</th>
                    <th>Created date</th>
                    <th>Order ID</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {showCancelOrders}
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
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div>
      <Tab panes={panes} renderActiveOnly={false} />
    </div>
  );
};
export default withRouter(OrderManagement);
