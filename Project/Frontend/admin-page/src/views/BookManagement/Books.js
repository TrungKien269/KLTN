import React from "react";
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

const addressDefinitions = faker.definitions.address;
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state[index],
}));
const Books = () => {
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
                    <Label htmlFor="curprice-input">Password</Label>
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
                      placeholder="State"
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
                    <Label htmlFor="select">Select</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="select" name="select" id="select">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="multiple-select">Multiple select</Label>
                  </Col>
                  <Col md="9">
                    <Input
                      type="select"
                      name="multiple-select"
                      id="multiple-select"
                      multiple
                    >
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="4">Option #4</option>
                      <option value="5">Option #5</option>
                      <option value="6">Option #6</option>
                      <option value="7">Option #7</option>
                      <option value="8">Option #8</option>
                      <option value="9">Option #9</option>
                      <option value="10">Option #10</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Radios</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio1"
                        name="radios"
                        value="option1"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio1"
                      >
                        Option 1
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio2"
                        name="radios"
                        value="option2"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio2"
                      >
                        Option 2
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio3"
                        name="radios"
                        value="option3"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio3"
                      >
                        Option 3
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Inline Radios</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio1"
                        name="inline-radios"
                        value="option1"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-radio1"
                      >
                        One
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio2"
                        name="inline-radios"
                        value="option2"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-radio2"
                      >
                        Two
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="inline-radio3"
                        name="inline-radios"
                        value="option3"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-radio3"
                      >
                        Three
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Checkboxes</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="checkbox1"
                      >
                        Option 1
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox2"
                        name="checkbox2"
                        value="option2"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="checkbox2"
                      >
                        Option 2
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox3"
                        name="checkbox3"
                        value="option3"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="checkbox3"
                      >
                        Option 3
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Inline Checkboxes</Label>
                  </Col>
                  <Col md="9">
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox1"
                      >
                        One
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox2"
                        name="inline-checkbox2"
                        value="option2"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox2"
                      >
                        Two
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="inline-checkbox3"
                        name="inline-checkbox3"
                        value="option3"
                      />
                      <Label
                        className="form-check-label"
                        check
                        htmlFor="inline-checkbox3"
                      >
                        Three
                      </Label>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-input">File input</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" id="file-input" name="file-input" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="file-multiple-input">
                      Multiple File input
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="file"
                      id="file-multiple-input"
                      name="file-multiple-input"
                      multiple
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
