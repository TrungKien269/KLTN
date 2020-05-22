import React, { useState, useEffect, useMemo } from "react";
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
  const [orPrice, setOrPrice] = useState(0);
  const [curPrice, setCurPrice] = useState(0);
  const [pubYear, setPubYear] = useState(0);
  const [numPage, setNumPage] = useState(0);
  const [weight, setWeight] = useState(0);
  const [summary, setSummary] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState(0);
  const [form, setForm] = useState(0);
  const [publisher, setPublisher] = useState(0);
  const [supplier, setSupplier] = useState(0);

  const [categoryList, setCategoryList] = useState([]);
  const [formList, setFormList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);

  useEffect(async () => {
    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListSubCategory",
    }).then((res) => {
      setCategoryList(res.data.obj);
    });

    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListFormBook",
    }).then((res) => {
      setFormList(res.data.obj)
    });

    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPublisher",
    }).then((res) => {
      setPublisherList(res.data.obj)
    });

    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListSupplier",
    }).then((res) => {
      setSupplierList(res.data.obj)
    });

  }, []);

  const showListCategory = useMemo(() => {
    var categoryOption = _.map(categoryList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id
    }));
    return (
      <Dropdown
        placeholder="Categories"
        fluid
        multiple
        text
        selection
        options={categoryOption}
        onChange={(e, data) => handleSelectCategory(e, data)}
      />
    )
  }, [categoryList])

  const showListFormBook = useMemo(() => {
    var formOption = _.map(formList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id
    }));
    return (
      <Dropdown
        placeholder="Book's form"
        fluid
        multiple
        text
        selection
        options={formOption}
        onChange={(e, data) => handleSelectForm(e, data)}
      />
    )
  }, [formList])

  const showListPublisher = useMemo(() => {
    var publisherOption = _.map(publisherList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id
    }));
    return (
      <Dropdown
        placeholder="Publishers"
        fluid
        multiple
        text
        selection
        options={publisherOption}
        onChange={(e, data) => handleSelectPublisher(e, data)}
      />
    )
  }, [publisherList])

  const showListSupplier = useMemo(() => {
    var supplierOption = _.map(supplierList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id
    }));
    return (
      <Dropdown
        placeholder="Suppliers"
        fluid
        multiple
        text
        selection
        options={supplierOption}
        onChange={(e, data) => handleSelectSupplier(e, data)}
      />
    )
  }, [supplierList])

  const handleSelectCategory = (e, data) => {
    if (data.value[0]) {
      setCategory(parseInt(data.value[0]));
    }
  };

  const handleSelectForm = (e, data) => {
    if (data.value[0]) {
      setForm(parseInt(data.value[0]));
    }
  };

  const handleSelectPublisher = (e, data) => {
    if (data.value[0]) {
      setPublisher(parseInt(data.value[0]));
    }
  };

  const handleSelectSupplier = (e, data) => {
    if (data.value[0]) {
      setSupplier(parseInt(data.value[0]));
    }
  };

  const handleTypeID = (e) => {
    setID(e.target.value);
  };

  const handleTypeName = (e) => {
    setBookname(e.target.value);
  };

  const handleTypeOriginalPrice = (e) => {
    setOrPrice(parseInt(e.target.value));
  };

  const handleTypeCurrentPrice = (e) => {
    setCurPrice(parseInt(e.target.value));
  };

  const handleTypePublisherYear = (e) => {
    setPubYear(parseInt(e.target.value));
  };

  const handleTypeNumOfPage = (e) => {
    setNumPage(parseInt(e.target.value));
  };

  const handleTypeWeight = (e) => {
    setWeight(parseInt(e.target.value));
  };

  const handleTypeSummary = (e) => {
    setSummary(e.target.value);
  };

  const handleTypeThumbnail = (e) => {
    setThumbnail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("SUBMIT")
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="12">
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
                onSubmit={handleFormSubmit}
              >
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="product-id">Book ISBN</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="product-id"
                      name="product-id"
                      placeholder="ID"
                      onChange={(e) => handleTypeID(e)}
                    ></Input>
                    <FormText className="help-block">
                      Please enter the book's isbn
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="book-name">Book Title</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="book-name"
                      name="book-name"
                      placeholder="Book Name"
                      onChange={(e) => handleTypeName(e)}
                    />
                    <FormText className="help-block">
                      Please enter the book's title
                    </FormText>
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
                      onChange={(e) => handleTypeOriginalPrice(e)}
                    />
                    <FormText className="help-block">
                      Please enter the book's original price
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
                      onChange={(e) => handleTypeCurrentPrice(e)}
                    />
                    <FormText className="help-block">
                      Please enter the book's current price
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
                      onChange={(e) => handleTypePublisherYear(e)}
                    />
                    <FormText className="help-block">
                      Please enter the publisher year of book
                    </FormText>
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
                      onChange={(e) => handleTypeNumOfPage(e)}
                    />
                    <FormText className="help-block">
                      Please enter the number of book's page
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="orprice-input">Weight</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="number"
                      id="weight-input"
                      name="weight-input"
                      placeholder="Enter The Book's Weight"
                      onChange={(e) => handleTypeWeight(e)}
                    />
                    <FormText className="help-block">
                      Please enter the book's weight
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="categories-input">Categories</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {showListCategory}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="booksform-input">Book's Form</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {showListFormBook}
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="publishers-input">Publishers</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {showListPublisher}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="suppliers-input">Suppliers</Label>
                  </Col>
                  <Col xs="12" md="9">
                    {showListSupplier}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Summary</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="textarea"
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                      onChange={(e) => handleTypeSummary(e)}
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
                      onChange={(e) => handleTypeThumbnail(e)}
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
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Submit
              </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban"></i> Reset
              </Button>
                </CardFooter>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Books;
