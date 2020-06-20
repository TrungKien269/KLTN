import React, { useState, useEffect, useMemo } from "react";
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Form,
  FormGroup,
  Input,
  Table,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from 'moment';

const PromotionList = () => {
  const [listPromo, setListPromo] = useState([]);

  const [modal, setModal] = useState(false);

  const [promotionID, setPromotionID] = useState(0);
  const [endedDate, setEndedDate] = useState(null);
  const [description, setDescription] = useState(null);

  const toggle = (data) => {
    setModal(!modal)
    if(modal == false){
      setPromotionID(parseInt(data.id));
      setEndedDate(moment(data.endedDate).format("YYYY-MM-DD"));
      setDescription(data.description);
    }
    else{
      setEndedDate(null);
      setDescription(null);
      setPromotionID(0);
    }
  };

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPromotion",
    }).then((res) => {
      if (res.status) {
        setListPromo(res.data.obj);
      }
    });
  }, []);

  const handleDate = (e) => {
    if (e.target.value) setEndedDate(e.target.value);
  };

  const handleDescription = (e) => {
    if (e.target.value) setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
      if(res.data.status){
        console.log(res.data);
        let promo = listPromo.find(x => x.id === promotionID);
        promo.endedDate = endedDate;
        promo.description = description;

        let index = listPromo.findIndex(x => x.id === promotionID);
        let newListPromo = listPromo;
        newListPromo[index] = promo;

        setListPromo((prev) => [...newListPromo]);
      }
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleDisable = (data) => {
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
      if(res.data.status){
        let promo = listPromo.find(x => x.id === data.id);
        promo.isExpired = 0;

        let index = listPromo.findIndex(x => x.id === data.id);
        let newListPromo = listPromo;
        newListPromo[index] = promo;

        setListPromo((prev) => [...newListPromo]);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const showListPromo = useMemo(() => {
    var x = "";
    var results = "";
    if (listPromo) {
      x = listPromo.map((data) => {
        var linktodetail = `/promotionmanagement/${data.id}`;
        // var d = data.promotionDetail;
        // results = d.map((da) => {
        //   return <div key={da.book.id}>{da.book.name}</div>;
        // });

        return (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.description}</td>
            <td>{data.endedDate.replace("T", " ")}</td>
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
                <Button negative onClick={(id) => handleDisable(data)}
                >Disabled</Button>
              </Button.Group>
            </td>
          </tr>
        );
      });
    }
    return x;
  }, [listPromo]);

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
            <Button className="mr-1" type="submit" size="sm" color="primary">
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
      </div>
    );
  } else {
    return (
      <div className="d-flex align-items-center h-100">
        <Loader active inline="centered" />
      </div>
    );
  }
};
export default PromotionList;
