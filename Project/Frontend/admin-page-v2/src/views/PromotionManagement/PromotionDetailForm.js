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
import Swal from "sweetalert2";

const PromotionDetailForm = (props) => {
  const [data, setData] = useState();
  const [bookID, setBookID] = useState("0");
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
        onChange={(e, data) => handleChange(e, data)}
      />
    );
  }, [bookOptions]);

  const handleChange = (e, data) => {
    if (data.value)
      setBookID(data.value);
  };

  const handleDiscount = (e) => {
    var value = e.target.value;
    if (value) {
      setDiscount(parseFloat(value));
    }
  }

  const handleReset = () => {
    setBookID(null);
    setDiscount(0);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Confirm",
      text: "Do you want to create this promotion book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          url: "http://localhost:5000/api/Admin/CreatePromotionDetail",
          method: "post",
          params: {
            promotionID: parseInt(props.id),
            bookID: bookID,
            discount: parseFloat(discount)
          }
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Create this promotion book",
              icon: "success",
            });
            handleReset();
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
  };

  return (
    <Card>
      <CardHeader>
        <strong>Create promotion detail</strong>
      </CardHeader>
      <CardBody>
        <Form className="form-horizontal" onSubmit={handleFormSubmit}>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="book-select">
                Select Book to add to Promotion
              </Label>
            </Col>
            <Col md="6">{multiSelectBooks}</Col>
            <Col md="3">
              <Input
                type="number"
                min="0"
                max="1"
                step="0.01"
                id="number-input"
                name="number-input"
                placeholder="discount"
                defaultValue={discount}
                onChange={(e) => handleDiscount(e)}
              />
            </Col>
          </FormGroup>
          <div className="text-right">
            {" "}
            <Button className="mr-1" type="submit" size="sm" color="primary">
              <i className="fa fa-dot-circle-o"></i> Add
            </Button>
            <Button type="reset" size="sm" color="danger"
              onClick={handleReset}>
              <i className="fa fa-ban"></i> Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default PromotionDetailForm;
