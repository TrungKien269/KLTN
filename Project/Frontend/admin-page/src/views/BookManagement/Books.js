import React, { useState, useEffect, useMemo } from "react";
import faker from "faker";
import _ from "lodash";
import qs from 'qs';
import { Dropdown } from "semantic-ui-react";
import {
  Table,
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
  const [authorList, setAuthorList] = useState([]);
  const [imageList, setImageList] = useState([]);

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
      setFormList(res.data.obj);
    });

    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPublisher",
    }).then((res) => {
      setPublisherList(res.data.obj);
    });

    await Axios({
      method: "get",
      url: "http://localhost:5000/api/Admin/ListSupplier",
    }).then((res) => {
      setSupplierList(res.data.obj);
    });
  }, []);

  const showListCategory = useMemo(() => {
    var categoryOption = _.map(categoryList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id,
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
    );
  }, [categoryList]);

  const showListFormBook = useMemo(() => {
    var formOption = _.map(formList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id,
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
    );
  }, [formList]);

  const showListPublisher = useMemo(() => {
    var publisherOption = _.map(publisherList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id,
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
    );
  }, [publisherList]);

  const showListSupplier = useMemo(() => {
    var supplierOption = _.map(supplierList, (item, index) => ({
      key: item.id,
      text: item.name,
      value: item.id,
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
    );
  }, [supplierList]);

  const showListAuthors = useMemo(() => {
    if (authorList && authorList.length > 0) {
      var authors = authorList.map((author) => {
        return (
          <tr>
            <td>{authorList.indexOf(author) + 1}</td>
            <td>{author}</td>
            <td>
              <Button type="button" color="danger"
                onClick={(e) => handleRemoveAuthor(e, author)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      });
      return authors;
    }
    else {
      return (
        <td>No author</td>
      );
    }
  }, [authorList]);

  const handleAddAuthors = (e) => {
    var author = document.getElementById("author").value;
    if (author !== "") {
      var check = authorList.find((x) => x === author)
      if (check === undefined) {
        setAuthorList((prev) => [...prev, author]);
      }
    }
  };

  const handleRemoveAuthor = (e, author) => {
    setAuthorList(authorList.filter((x) => x !== author));
  };

  const showListImage = useMemo(() => {
    if (imageList && imageList.length > 0) {
      var images = imageList.map((image) => {
        return (
          <tr>
            <td>{imageList.indexOf(image) + 1}</td>
            <td>{image}</td>
            <td>
              <Button type="button" color="danger"
                onClick={(e) => handleRemoveImage(e, image)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      });
      return images;
    }
    else {
      return (
        <td>No images</td>
      );
    }
  }, [imageList]);

  const handleAddImage = (e) => {
    var image = document.getElementById("image").value;
    if (image !== "") {
      var check = imageList.find((x) => x === image)
      if (check === undefined) {
        setImageList((prev) => [...prev, image]);
      }
    }
  };

  const handleRemoveImage = (e, image) => {
    setImageList(imageList.filter((x) => x !== image));
  };

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

  const ResetAll = (e) => {
    document.getElementById("product-id").value = "";
    document.getElementById("book-name").value = "";
    document.getElementById("orprice-input").value = "";
    document.getElementById("curprice-input").value = "";
    document.getElementById("date-input").value = "";
    document.getElementById("page-input").value = "";
    document.getElementById("weight-input").value = "";
    document.getElementById("author").value = "";
    document.getElementById("image").value = "";
    document.getElementById("textarea-input").value = "";
    document.getElementById("thumbnail-input").value = "";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // alert("Submit");
    // console.log(imageList)

    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      url: "http://localhost:5000/api/Admin/InsertUpdateBook",
      method: "post",
      params:{
        id: id,
        name: bookname,
        originalPrice: parseInt(orPrice),
        currentPrice: parseInt(curPrice),
        releaseYear: parseInt(pubYear),
        weight: parseFloat(weight),
        numOfPage: parseInt(numPage),
        image: thumbnail,
        summary: summary,
        status: "Available",
        cateID: parseInt(category),
        formID: parseInt(form),
        supplierID: parseInt(supplier),
        publisherID: parseInt(publisher),
        images: imageList
      },
      data: authorList,
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  };

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
                onSubmit={(e) => handleFormSubmit(e)}
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
                    <Label htmlFor="author">Authors</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      type="text"
                      id="author"
                      name="author"
                      placeholder="Author"
                    ></Input>
                  </Col>
                  <Col xs="12" md="2">
                    <Button color="primary" onClick={(e) => handleAddAuthors(e)}>
                      Add
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="authorList">List Authors</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>{showListAuthors}</tbody>
                    </Table>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="images">List Images</Label>
                  </Col>
                  <Col xs="12" md="7">
                    <Input
                      type="text"
                      id="image"
                      name="image"
                      placeholder="Image"
                    ></Input>
                  </Col>
                  <Col xs="12" md="2">
                    <Button color="primary" onClick={(e) => handleAddImage(e)}>
                      Add
                    </Button>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="authorList">List Images</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Link</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>{showListImage}</tbody>
                    </Table>
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
                      id="thumbnail-input"
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
                <Button type="submit" size="sm" color="primary">
                  <i className="fa fa-dot-circle-o"></i> Add/Update
                </Button>
                <Button type="reset" size="sm" color="danger"
                onClick={(e) => ResetAll(e)}>
                  <i className="fa fa-ban"></i> Reset
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Books;
