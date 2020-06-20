import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import { Tab, Button } from "semantic-ui-react";
import NumberFormat from "react-number-format";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
import Swal from "sweetalert2";

function OrderPagination(props) {

  const { itemsCountPerPage, pageRangeDisplayed } = props;

  const [activePageProcessing, setActivePageProcessing] = useState(1);
  const [loadingRangeProcessing, setLoadingRangeProcessing] = useState([0, itemsCountPerPage - 1]);
  const [processingOrders, setProcessingOrders] = useState(null);
  const [flexProcessingOrders, setFlexProcessingOrders] = useState(null);

  const [activePageDelivering, setActivePageDelivering] = useState(1);
  const [loadingRangeDelivering, setLoadingRangeDelivering] = useState([0, itemsCountPerPage - 1]);
  const [deliveringOrders, setDeliveringOrders] = useState(null);
  const [flexDeliveringOrders, setFlexDeliveringOrders] = useState(null);

  const [activePageDelivered, setActivePageDelivered] = useState(1);
  const [loadingRangeDelivered, setLoadingRangeDelivered] = useState([0, itemsCountPerPage - 1]);
  const [deliveredOrders, setDeliveredOrders] = useState(null);
  const [flexDeliveredOrders, setFlexDeliveredOrders] = useState(null);

  const [activePageCanceled, setActivePageCanceled] = useState(1);
  const [loadingRangeCanceled, setLoadingRangeCanceled] = useState([0, itemsCountPerPage - 1]);
  const [canceledOrders, setCanceledOrders] = useState(null);
  const [flexCanceledOrders, setFlexCanceledOrders] = useState(null);

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
        setLoadingRangeProcessing([0, itemsCountPerPage - 1]);
        setActivePageProcessing(1);
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
        setLoadingRangeDelivering([0, itemsCountPerPage - 1]);
        setActivePageDelivering(1);
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
        setCanceledOrders(res.data.obj);
      }
    });
  }, []);

  const handlePageChangeProcessing = (pageNumber) => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setActivePageProcessing(pageNumber);
    setLoadingRangeProcessing([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const handlePageChangeDelivering = (pageNumber) => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setActivePageDelivering(pageNumber);
    setLoadingRangeDelivering([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const handlePageChangeDelivered = (pageNumber) => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setActivePageDelivered(pageNumber);
    setLoadingRangeDelivered([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const handlePageChangeCanceled = (pageNumber) => {
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setActivePageCanceled(pageNumber);
    setLoadingRangeCanceled([
      (pageNumber - 1) * itemsCountPerPage,
      pageNumber * itemsCountPerPage - 1,
    ]);
  };

  const handleConfirm = (order, newState) => {
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
            id: order.id,
            status: newState,
          },
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Confirm this order",
              icon: "success",
            });
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
          else{
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
    })
  };

  const showListProcessingData = useMemo(() => {
    let result = [];
    let listData = flexProcessingOrders || processingOrders;
    if (listData && listData.length > 0) {
      let start = loadingRangeProcessing[0];
      let end =
        loadingRangeProcessing[1] > listData.length
          ? listData.length - 1
          : loadingRangeProcessing[1];
      for (let i = start; i <= end; i++) {
        const order = listData[i];
        if (order) {
          const linktodetail = `/ordermanagement/${order.id}`;
          result.push(
            <tbody>
              <tr>
                <td>{order.fullName}</td>
                <td>
                  {moment(order.createdDate).format(
                    "DD-MM-YYYY hh:mm:ss"
                  )}
                </td>
                <td>{order.id}</td>
                <td>{order.type}</td>
                <td>
                  <NumberFormat
                    value={order.shippingFee}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <Badge color="warning">{order.status}</Badge>
                </td>
                <td>
                  <Button.Group size="mini">
                    <Button
                      positive
                      onClick={() =>
                        handleConfirm(order, "Delivering")
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
        }
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
  }, [loadingRangeProcessing, processingOrders, flexProcessingOrders]);

  const showListDeliveringData = useMemo(() => {
    let result = [];
    let listData = flexDeliveringOrders || deliveringOrders;
    if (listData && listData.length > 0) {
      let start = loadingRangeDelivering[0];
      let end =
        loadingRangeDelivering[1] > listData.length
          ? listData.length - 1
          : loadingRangeDelivering[1];
      for (let i = start; i <= end; i++) {
        const order = listData[i];
        if (order) {
          const linktodetail = `/ordermanagement/${order.id}`;
          result.push(
            <tbody>
              <tr>
                <td>{order.fullName}</td>
                <td>
                  {moment(order.createdDate).format(
                    "DD-MM-YYYY hh:mm:ss"
                  )}
                </td>
                <td>{order.id}</td>
                <td>{order.type}</td>
                <td>
                  <NumberFormat
                    value={order.shippingFee}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <Badge color="primary">{order.status}</Badge>
                </td>
                <td>
                  <Button.Group size="mini">
                    <Button
                      positive
                      onClick={() =>
                        handleConfirm(order, "Delivered")
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
        }
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
  }, [loadingRangeDelivering, deliveringOrders, flexDeliveringOrders]);

  const showListDeliveredData = useMemo(() => {
    let result = [];
    let listData = flexDeliveredOrders || deliveredOrders;
    if (listData && listData.length > 0) {
      let start = loadingRangeDelivered[0];
      let end =
        loadingRangeDelivered[1] > listData.length
          ? listData.length - 1
          : loadingRangeDelivered[1];
      for (let i = start; i <= end; i++) {
        const order = listData[i];
        if (order) {
          const linktodetail = `/ordermanagement/${order.id}`;
          result.push(
            <tbody>
              <tr>
                <td>{order.fullName}</td>
                <td>
                  {moment(order.createdDate).format(
                    "DD-MM-YYYY hh:mm:ss"
                  )}
                </td>
                <td>{order.id}</td>
                <td>{order.type}</td>
                <td>
                  <NumberFormat
                    value={order.shippingFee}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <Badge color="success">{order.status}</Badge>
                </td>
                <td>
                  <Button.Group size="mini">
                    <Link to={linktodetail}>
                      <Button>Detail</Button>
                    </Link>
                  </Button.Group>
                </td>
              </tr>
            </tbody>
          );
        }
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
  }, [loadingRangeDelivered, deliveredOrders, flexDeliveredOrders]);

  const showListCanceledData = useMemo(() => {
    let result = [];
    let listData = flexCanceledOrders || canceledOrders;
    if (listData && listData.length > 0) {
      let start = loadingRangeCanceled[0];
      let end =
        loadingRangeCanceled[1] > listData.length
          ? listData.length - 1
          : loadingRangeCanceled[1];
      for (let i = start; i <= end; i++) {
        const order = listData[i];
        if (order) {
          const linktodetail = `/ordermanagement/${order.id}`;
          result.push(
            <tbody>
              <tr>
                <td>{order.fullName}</td>
                <td>
                  {moment(order.createdDate).format(
                    "DD-MM-YYYY hh:mm:ss"
                  )}
                </td>
                <td>{order.id}</td>
                <td>{order.type}</td>
                <td>
                  <NumberFormat
                    value={order.shippingFee}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={order.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" VND"}
                  />
                </td>
                <td>
                  <Badge color="danger">{order.status}</Badge>
                </td>
                <td>
                  <Button.Group size="mini">
                    <Link to={linktodetail}>
                      <Button>Detail</Button>
                    </Link>
                  </Button.Group>
                </td>
              </tr>
            </tbody>
          );
        }
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
  }, [loadingRangeCanceled, canceledOrders, flexCanceledOrders]);

  const panes = [
    {
      menuItem: "Processing Orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> List Order
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User's Full Name</th>
                    <th>Created Date Time</th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                {showListProcessingData}
              </Table>
              <div className="d-flex justify-content-center w-100">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  hideDisabled={true}
                  activePage={activePageProcessing}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={
                    flexProcessingOrders ? flexProcessingOrders.length : processingOrders ? processingOrders.length : 0
                  }
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={handlePageChangeProcessing}
                />
              </div>
            </CardBody>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Delivering Orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> List Order
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User's Full Name</th>
                    <th>Created Date Time</th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                {showListDeliveringData}
              </Table>
              <div className="d-flex justify-content-center w-100">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  hideDisabled={true}
                  activePage={activePageDelivering}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={
                    flexDeliveringOrders ? flexDeliveringOrders.length : deliveringOrders ? deliveringOrders.length : 0
                  }
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={handlePageChangeDelivering}
                />
              </div>
            </CardBody>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Delivered Orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> List Order
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User's Full Name</th>
                    <th>Created Date Time</th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {showListDeliveredData}
              </Table>
              <div className="d-flex justify-content-center w-100">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  hideDisabled={true}
                  activePage={activePageDelivered}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={
                    flexDeliveredOrders ? flexDeliveredOrders.length : deliveredOrders ? deliveredOrders.length : 0
                  }
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={handlePageChangeDelivered}
                />
              </div>
            </CardBody>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Canceled Orders",
      pane: (
        <Tab.Pane>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> List Order
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>User's Full Name</th>
                    <th>Created Date Time</th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Shipping Fee</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {showListCanceledData}
              </Table>
              <div className="d-flex justify-content-center w-100">
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  hideDisabled={true}
                  activePage={activePageCanceled}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={
                    flexCanceledOrders ? flexCanceledOrders.length : canceledOrders ? canceledOrders.length : 0
                  }
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={handlePageChangeCanceled}
                />
              </div>
            </CardBody>
          </Card>
        </Tab.Pane>
      ),
    }
  ];

  return (
    <div>
      <Tab panes={panes} renderActiveOnly={false} />
    </div>
  )
}

export default OrderPagination
