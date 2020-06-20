import React, { useState, useMemo, useEffect } from "react";
import { Button } from "semantic-ui-react";
import PromotionDetailForm from "./PromotionDetailForm";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import Pagination from "react-js-pagination";
import PromotionForm from "./PromotionForm";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import Swal from "sweetalert2";

function PromotionDetailPagination(props) {

  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const { itemsCountPerPage, pageRangeDisplayed } = props;
  const [activePage, setActivePage] = useState(1);
  const [loadingRange, setLoadingRange] = useState([0, itemsCountPerPage - 1]);
  const [listDetails, setListDetails] = useState([]);
  const [flexListDetails, setFlexListDetails] = useState(null);

  const [bookID, setBookID] = useState(null);
  const [bookName, setBookName] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      url: "http://localhost:5000/api/Admin/GetPromotion",
      params: {
        id: parseInt(props.id)
      }
    }).then(res => {
      if (res.data.status) {
        setListDetails(res.data.obj.promotionDetail);
      }
    })
  }, []);

  const toggleAdd = () => {
    setModalAdd(!modalAdd);
  }
  const toggleUpdate = (data) => {
    setModalUpdate(!modalUpdate);
    if (modalUpdate === false) {
      if (data) {
        setBookName(data.book.name)
        setBookID(data.bookId);
        setDiscount(parseFloat(data.discount))
      }
    }
  }

  const handleDiscount = (e) => {
    let value = e.target.value;
    if (value) {
      setDiscount(parseFloat(e.target.value))
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm",
      text: "Do you want to update this  book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then((result) => {
      if(result.value){
        Axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          url: "http://localhost:5000/api/Admin/UpdatePromotionDetail",
          method: "put",
          params: {
            promotionID: parseInt(props.id),
            bookID: bookID,
            discount: parseFloat(discount)
          }
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Update this promotion book",
              icon: "success",
            });
            let detail = listDetails.find(x => x.bookId === bookID);
            detail.discount = parseFloat(discount);

            let index = listDetails.findIndex(x => x.bookId === bookID);
            let newListDetail = listDetails;
            newListDetail[index] = detail;

            setListDetails((prev) => [...newListDetail]);
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

  const handleDelete = (bookId) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this promotion book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if(result.value){
        Axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          url: "http://localhost:5000/api/Admin/DeletePromotionDetail",
          method: "delete",
          params: {
            promotionID: parseInt(props.id),
            bookID: bookId,
          }
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Delete this promotion book",
              icon: "success",
            });
            let newListDetail = listDetails;
            newListDetail = newListDetail.filter((x) => x.bookId !== bookId);

            setListDetails((prev) => [...newListDetail]);
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
        });
      }
    })
  }

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


  const showListDetail = useMemo(() => {
    let result = [];
    let listData = flexListDetails || listDetails;
    if (listData && listData.length > 0) {
      let start = loadingRange[0];
      let end =
        loadingRange[1] > listData.length
          ? listData.length - 1
          : loadingRange[1];
      for (let i = start; i <= end; i++) {
        const data = listData[i];
        result.push(
          <tr>
            <td>{data.bookId}</td>
            <td>{data.book.name}</td>
            <td>{parseFloat(data.discount)}</td>
            <td style={{textAlign: "center"}}>
              <Button.Group size="mini">
                <Button onClick={() => toggleUpdate(data)}>Update</Button>
                <Button.Or text="or" />
                <Button negative onClick={(id) => handleDelete(data.bookId)}>Delete</Button>
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
  }, [loadingRange, listDetails, flexListDetails])

  return (
    <div>
      <Modal isOpen={modalAdd} toggle={toggleAdd}>
        <ModalHeader toggle={toggleAdd}>Add Promotion Detail</ModalHeader>
        <ModalBody>
          <PromotionDetailForm id={parseInt(props.id)}></PromotionDetailForm>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalUpdate} toggle={toggleUpdate}>
        <ModalHeader toggle={toggleUpdate}>Update Promotion Detail</ModalHeader>
        <ModalBody>
          <Form className="form-horizontal" onSubmit={(e) => handleUpdate(e)}>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="id-input">Book ID</Label>
              </Col>
              <Col md="6">
                <Input
                  required
                  type="text"
                  id="id-input"
                  name="id-input"
                  placeholder="Book ID"
                  disabled
                  value={bookID ? bookID : null}
                />
              </Col>
              <Col md="3">
                <Input
                  required
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  id="number-input"
                  name="number-input"
                  placeholder="discount"
                  value={discount ? discount : 0}
                  onChange={(e) => handleDiscount(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="id-input">Book Title</Label>
              </Col>
              <Col xs="12" md="9">
                <Input
                  required
                  type="text"
                  id="id-input"
                  name="id-input"
                  placeholder="Book Title"
                  disabled
                  value={bookName ? bookName : null}
                />
              </Col>
            </FormGroup>
            <Button className="mr-1" type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> Update
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <Card>
        <CardHeader className="d-flex justify-content-lg-between">
          <span>
            {" "}
            <i className="fa fa-align-justify"></i> Promotion id : {props.id}
          </span>

          <Button.Group size="mini">
            <Button positive onClick={toggleAdd}>
              Add
            </Button>
          </Button.Group>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book name</th>
                <th>Discount</th>
                <th style={{textAlign: "center"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {showListDetail}
            </tbody>
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
            flexListDetails ? flexListDetails.length : listDetails ? listDetails.length : 0
          }
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default PromotionDetailPagination
