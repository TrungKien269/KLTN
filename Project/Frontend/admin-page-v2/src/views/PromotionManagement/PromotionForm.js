import React, { useState, useEffect, useMemo, useRef } from "react";
import Axios from "axios";
import { withRouter } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "../../Utils/Commons";
import { Dropdown } from "semantic-ui-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
const PromotionForm = (props) => {
  const [data, setData] = useState();
  const [endedDate, setEndedDate] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState([]);
  const [discount, setDiscount] = useState(0);
  let detailReq = [];

  const endedDateRef = useRef(null);
  endedDateRef.current = endedDate;
  const descriptionRef = useRef(null);
  descriptionRef.current = description;

  const detailReqRef = useRef(null);
  detailReqRef.current = detailReq;

  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:5000/api/ListBook/GetAll",
    }).then((res) => {
      setData(res.data.obj);
    });
  }, []);

  const bookOptions = useMemo(() => {
    let bookArr = [];
    if (data) {
      bookArr = data.map((data) => {
        return { key: data.id, value: data.id, text: data.name };
      });
    }
    return bookArr;
  }, [data]);

  const handleChange = (e, data) => {
    setBook(data.value);
  };

  const handleDate = (e) => {
    if (e.target.value) setEndedDate(e.target.value);
  };

  const handleDescription = (e) => {
    if (e.target.value) setDescription(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(parseFloat(e.target.value));
  };

  // useEffect(() => console.log(detailReq), [detailReq]);

  useEffect(() => {
    if (book.length > 0) {
      var len = book.length;
      for (var i = 0; i < len; i++) {
        detailReq.push({
          promotionID: 1,
          bookID: book[len - 1],
          discount: parseFloat(discount),
        });
      }
    } else {
      detailReq = [];
    }
  }, [book, discount]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "POST",
      url: "http://localhost:5000/api/Admin/CreatePromotion",
      params: {
        endedDate: endedDateRef.current,
        description: descriptionRef.current,
      },
      data: detailReqRef.current,
    }).then((res) => {
      if (res.status) {
        console.log(res.data);
        alert("success");
        window.location.reload();
      } else {
        alert("failed");
      }
    });
  };

  const multiSelectBooks = useMemo(() => {
    return (
      <Dropdown
        id="book-select"
        clearable
        fluid
        multiple
        search
        selection
        options={bookOptions}
        placeholder="Select Books"
        onChange={(e, data) => handleChange(e, data)}
      />
    );
  }, [bookOptions]);

  const showForm = useMemo(() => {
    return (
      <Card>
        <CardHeader>
          <strong>Create promotion</strong>
        </CardHeader>
        <CardBody>
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
                  onChange={(e) => handleDescription(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="book-select">
                  Select Book to add to Promotion
                </Label>
              </Col>
              <Col md="6">{multiSelectBooks}</Col>
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
                  onChange={(e) => handleDiscount(e)}
                />
              </Col>
            </FormGroup>
            <Button className="mr-1" type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> Submit
            </Button>
            <Button type="reset" size="sm" color="danger">
              <i className="fa fa-ban"></i> Reset
            </Button>
          </Form>
        </CardBody>
      </Card>
    
    );
  }, [bookOptions]);

  return <div>{showForm}</div>;
};
export default withRouter(PromotionForm);
