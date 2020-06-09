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
  CardFooter,
} from "reactstrap";
const PromotionDetailForm = () => {
  const [data, setData] = useState();

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
  const multiSelectBooks = useMemo(() => {
    return (
      <Dropdown
        id="book-select"
        clearable
        fluid
        search
        selection
        options={bookOptions}
        placeholder="Select Books"
      />
    );
  }, [bookOptions]);

  return (
    <Card>
      <CardHeader>
        <strong>Create promotion</strong>
      </CardHeader>
      <CardBody>
        <Form className="form-horizontal">
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="id-input">Ended day</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                required
                type="text"
                id="id-input"
                name="id-input"
                placeholder="Promotion ID"
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
              />
            </Col>
          </FormGroup>
          <div className="text-right">
            {" "}
            <Button className="mr-1" type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> Submit
            </Button>
            <Button type="reset" size="sm" color="danger">
              <i className="fa fa-ban"></i> Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PromotionDetailForm;
