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

const OrderManagement = () => {
  const [processingOrders, setProcessingOrders] = useState();
  const [deliveringOrders, setDeliveringOrders] = useState();
  const [deliveredOrders, setDeliveredOrders] = useState();
  const [cancelOrders, setCancelOrders] = useState();

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
        console.log("delivered ", res.data.obj);
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
        console.log("cancel ", res.data.obj);
      }
    });
  }, []);

  const handleConfirm = (e) => {};

  const showProcOrders = useMemo(() => {
    let results = "";
    if (processingOrders) {
      results = processingOrders.map((processingOrders) => {
        return (
          <tbody>
            <tr>
              <td>{processingOrders.userId}</td>
              <td>{processingOrders.fullName}</td>
              <td>{processingOrders.phoneNumber}</td>
              <td>{processingOrders.createdDate.replace("T", " ")}</td>
              <td>{processingOrders.id}</td>
              <td>
                <NumberFormat
                  value={processingOrders.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={processingOrders.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="warning">{processingOrders.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button positive onClick={(e) => handleConfirm(e)}>
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Button negative>Deny</Button>
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
      results = deliveringOrders.map((deliveringOrders) => {
        return (
          <tbody>
            <tr>
              <td>{deliveringOrders.userId}</td>
              <td>{deliveringOrders.fullName}</td>
              <td>{deliveringOrders.phoneNumber}</td>
              <td>{deliveringOrders.createdDate.replace("T", " ")}</td>
              <td>{deliveringOrders.id}</td>
              <td>
                <NumberFormat
                  value={deliveringOrders.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={deliveringOrders.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="green">{deliveringOrders.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button positive onClick={(e) => handleConfirm(e)}>
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Button negative>Deny</Button>
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
        return (
          <tbody>
            <tr>
              <td>{deliveredOrders.userId}</td>
              <td>{deliveredOrders.fullName}</td>
              <td>{deliveredOrders.phoneNumber}</td>
              <td>{deliveredOrders.createdDate.replace("T", " ")}</td>
              <td>{deliveredOrders.id}</td>
              <td>
                <NumberFormat
                  value={deliveredOrders.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={deliveredOrders.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="green">{deliveredOrders.status}</Badge>
              </td>
              <td>
                <Button.Group size="mini">
                  <Button positive onClick={(e) => handleConfirm(e)}>
                    Confirm
                  </Button>
                  <Button.Or text="or" />
                  <Button negative>Deny</Button>
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
      results = cancelOrders.map((cancelOrders) => {
        return (
          <tbody>
            <tr>
              <td>{cancelOrders.userId}</td>
              <td>{cancelOrders.fullName}</td>
              <td>{cancelOrders.phoneNumber}</td>
              <td>{cancelOrders.createdDate.replace("T", " ")}</td>
              <td>{cancelOrders.id}</td>
              <td>
                <NumberFormat
                  value={cancelOrders.shippingFee}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <NumberFormat
                  value={cancelOrders.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              </td>
              <td>
                <Badge color="secondary">{cancelOrders.status}</Badge>
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
      menuItem: "processing orders",
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
export default OrderManagement;
