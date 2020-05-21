import React, { useState, useEffect } from "react";
import faker from "faker";
import _ from "lodash";
import { Dropdown } from "semantic-ui-react";
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
import Axios from "axios";

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state[index],
}));

const Books = () => {
  const [id, setID] = useState("");
  const [bookname, setBookname] = useState("");
  const [orPrice, setOrPrice] = useState("");
  const [curPrice, setCurPrice] = useState("");
  const [pubYear, setPubYear] = useState("");
  const [category, setCategory] = useState();

  useEffect(() => {
    Axios({
      method: "get",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then((res) => {
      setCategory(res.data.obj);
    });
  }, []);

  if (category) {
    console.log(category);
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <CardHeader>
              <strong>Import new book</strong>
            </CardHeader>
            <CardBody>
              <Form
                action=""
                method="post"
                encType="multipart/form-data"
                className="form-horizontal"
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="product-id">Product ID</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="product-id"
                      name="product-id"
                      placeholder="ID"
                    ></Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="book-name">Book Name</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="book-name"
                      name="book-name"
                      placeholder="Book Name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="orprice-input">Original Price</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="orprice-input"
                      name="orprice-input"
                      placeholder="Enter The Book's Original Price"
                    />
                    <FormText className="help-block">
                      Please enter your book's original price
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="curprice-input">Current Price</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="curprice-input"
                      name="curprice-input"
                      placeholder="Enter The Book's Current Price"
                    />
                    <FormText className="help-block">
                      Please enter your book's current price
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="date-input">Published year</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="date-input"
                      name="date-input"
                      placeholder="Year"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="page-input">Number Of Page</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="page-input"
                      name="page-input"
                      placeholder="Enter The Book's Number Of page"
                    />
                    <FormText className="help-block">
                      Please enter your book's original price
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="categories-input">Categories</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Dropdown
                      placeholder="Categories"
                      fluid
                      multiple
                      text
                      selection
                      options={stateOptions}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="booksform-input">Book's Form</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Dropdown
                      placeholder="Book's form"
                      fluid
                      multiple
                      text
                      selection
                      options={stateOptions}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="publishers-input">Publishers</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Dropdown
                      placeholder="Publishers"
                      fluid
                      multiple
                      text
                      selection
                      options={stateOptions}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="suppliers-input">Suppliers</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Dropdown
                      placeholder="Suppliers"
                      fluid
                      multiple
                      text
                      selection
                      options={stateOptions}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="textarea"
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">Thumbnails</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      placeholder="Link thumbnail"
                      type="text"
                      id="file-input"
                      name="file-input"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row hidden>
                  <Col md="3">
                    <Label className="custom-file" htmlFor="custom-file-input">
                      Custom file input
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Label className="custom-file">
                      <Input
                        className="custom-file"
                        type="file"
                        id="custom-file-input"
                        name="file-input"
                      />
                      <span className="custom-file-control"></span>
                    </Label>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o"></i> Submit
              </Button>
              <Button type="reset" size="sm" color="danger">
                <i className="fa fa-ban"></i> Reset
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Books;
