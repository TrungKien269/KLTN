import React, { useState, useMemo, useEffect } from "react";
import Pagination from "react-js-pagination";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import { Button, Loader } from "semantic-ui-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Table,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

function PromotionPagination(props) {

  const { itemsCountPerPage, pageRangeDisplayed } = props;
  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [listPromo, setListPromo] = useState([]);
  const [flexListPromo, setFlexListPromo] = useState(null);

  const [modal, setModal] = useState(false);

  const [promotionID, setPromotionID] = useState(0);
  const [endedDate, setEndedDate] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPromotion",
    }).then((res) => {
      setListPromo(res.data.obj);
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

  const toggle = (data) => {
    setModal(!modal)
    if (modal == false) {
      setPromotionID(parseInt(data.id));
      setEndedDate(moment(data.endedDate).format("YYYY-MM-DD"));
      setDescription(data.description);
    }
    else {
      setEndedDate(null);
      setDescription(null);
      setPromotionID(0);
    }
  };

  const handleDate = (e) => {
    if (e.target.value) setEndedDate(e.target.value);
  };

  const handleDescription = (e) => {
    if (e.target.value) setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm",
      text: "Do you want to update this promotion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken()
          },
          url: "http://localhost:5000/api/Admin/UpdatePromotion",
          method: "put",
          params: {
            id: promotionID,
            createdDate: "",
            endedDate: endedDate,
            description: description,
            isExpired: 1
          }
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Update this promotion",
              icon: "success",
            });
            let promo = listPromo.find(x => x.id === promotionID);
            promo.endedDate = moment(endedDate).format("DD-MM-YYYY hh:mm:ss");
            promo.description = description;

            let index = listPromo.findIndex(x => x.id === promotionID);
            let newListPromo = listPromo;
            newListPromo[index] = promo;

            setListPromo((prev) => [...newListPromo]);
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
    });
  };

  const handleDisable = (data) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to deactivate this promotion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken()
          },
          url: "http://localhost:5000/api/Admin/UpdatePromotion",
          method: "put",
          params: {
            id: parseInt(data.id),
            createdDate: data.createdDate,
            endedDate: data.endedDate,
            description: data.description,
            isExpired: 0
          }
        }).then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Deactivate this promotion",
              icon: "success",
            });
            let promo = listPromo.find(x => x.id === data.id);
            promo.isExpired = 0;

            let index = listPromo.findIndex(x => x.id === data.id);
            let newListPromo = listPromo;
            newListPromo[index] = promo;

            setListPromo((prev) => [...newListPromo]);
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
    })
  }

  const handleEnable = (data) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to activate this promotion?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken()
          },
          url: "http://localhost:5000/api/Admin/UpdatePromotion",
          method: "put",
          params: {
            id: parseInt(data.id),
            createdDate: data.createdDate,
            endedDate: data.endedDate,
            description: data.description,
            isExpired: 1
          }
        }).then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Activate this promotion",
              icon: "success",
            });
            let promo = listPromo.find(x => x.id === data.id);
            promo.isExpired = 1;

            let index = listPromo.findIndex(x => x.id === data.id);
            let newListPromo = listPromo;
            newListPromo[index] = promo;

            setListPromo((prev) => [...newListPromo]);
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
    })
  }

  const showListPromo = useMemo(() => {
    let result = [];
    let listData = flexListPromo || listPromo;
    if (listData && listData.length > 0) {
      let start = loadingRange[0];
      let end =
        loadingRange[1] > listData.length
          ? listData.length - 1
          : loadingRange[1];
      for (let i = start; i <= end; i++) {
        const data = listData[i];
        var linktodetail = `/promotionmanagement/${data.id}`;
        result.push(
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.description}</td>
            <td>{moment(data.endedDate).format("DD-MM-YYYY hh:mm:ss")}</td>
            <td>
              {data.isExpired ? (
                <Badge color="success">Active</Badge>
              ) : (
                  <Badge color="secondary">Disabled</Badge>
                )}
            </td>
            <td className="text-center">
              <Button.Group size="mini">
                <Button positive onClick={() => toggle(data)}>
                  Update
                </Button>
                <Button.Or text="or" />
                <Link to={linktodetail}>
                  <Button>Detail</Button>
                </Link>
                <Button.Or text="or" />
                {data.isExpired ? (
                  <Button negative onClick={(id) => handleDisable(data)}
                  >Deactivate</Button>
                ) : (
                  <Button negative onClick={(id) => handleEnable(data)}
                  >Activate</Button>
                  )}
              </Button.Group>
            </td>
          </tr>
        )
      }
    }
    else {
      result.push(
        <React.Fragment>
          <div className="w-100">
            <h2>NOT FOUND</h2>
          </div>
        </React.Fragment>
      );
    }
    return result;
  }, [loadingRange, listPromo, flexListPromo]);

  if (listPromo) {
    return (
      <div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Promotion</ModalHeader>
            <ModalBody>

              <Form className="form-horizontal" onSubmit={handleFormSubmit}>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Ended day</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      required
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      value={endedDate}
                      onChange={(e) => handleDate(e)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Description Input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      required
                      type="textarea"
                      id="text-input"
                      name="text-input"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => handleDescription(e)}
                    />
                  </Col>
                </FormGroup>
                <Button className="mr-1" type="submit" size="md" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Update
            </Button>
              </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> List Promotion
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>Promotion ID</th>
                  <th>Description</th>
                  <th>Ended day</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>{showListPromo}</tbody>
            </Table>
          </CardBody>
        </Card>
        <div className="d-flex justify-content-center w-100">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            hideDisabled={true}
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={
              flexListPromo ? flexListPromo.length : listPromo ? listPromo.length : 0
            }
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={handlePageChange}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="d-flex align-items-center h-100">
        <Loader active inline="centered" />
      </div>
    );
  }
}

export default PromotionPagination
