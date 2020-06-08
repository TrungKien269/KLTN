import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
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
const PromotionForm = () => {
  const [data, setData] = useState();
  const [endedDate, setEndedDate] = useState();
  const [description, setDescription] = useState();
  const [book, setBook] = useState([]);
  const [discount, setDiscount] = useState(0);

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
    setEndedDate(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  };

  const DetailRequest = useMemo(() => {
    var arr = [];
    if (book) {
      var len = book.length;
      for (var i = 0; i < len; i++) {
        arr.push({
          promotionID: 0,
          bookID: book[i],
          discount: discount,
        });
      }
    }
    return arr;
  }, [book, discount]);

  console.log(DetailRequest);
  console.log(endedDate);
  console.log(description);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "POST",
      url: "http://localhost:5000/api/Admin/CreatePromotion",
      params: {
        endedDate: endedDate,
        description: description,
      },
      data: DetailRequest,
    }).then((res) => {
      if (res.status) {
        alert("success");
      } else {
        alert("failed");
      }
    });
  };

  const multiSelectBooks = useMemo(() => {
    console.log(bookOptions);
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
          <strong>Basic Form</strong> Elements
        </CardHeader>
        <CardBody>
          <Form
            action=""
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={(e) => handleSubmit(e)}
          >
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
                  id="number-input"
                  name="number-input"
                  placeholder="discount"
                  onChange={(e) => handleDiscount(e)}
                />
              </Col>
            </FormGroup>
            <Button type="submit" size="sm" color="primary">
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
export default PromotionForm;
