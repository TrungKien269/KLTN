import React, { useState, useEffect, useMemo, useDebugValue } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";
import { Dropdown } from "semantic-ui-react";
import _ from "lodash";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
const PromotionForm = (props) => {
  const [data, setData] = useState();
  const [endedDate, setEndedDate] = useState();
  const [description, setDescription] = useState();
  const promotionDetailRequest = [];

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
    var i = data.value.length;
    promotionDetailRequest.push({
      promotionID: 0,
      bookID: data.value[i - 1],
      discount: 5,
    });
    console.log(promotionDetailRequest);
  };

  const handleDate = (e) => {
    setEndedDate(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

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
      data: promotionDetailRequest,
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
              <Col md="9">{multiSelectBooks}</Col>
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
