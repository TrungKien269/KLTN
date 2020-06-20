import React, { useState, useEffect, useMemo } from "react";
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
  Table,
} from "reactstrap";
import NumberFormat from "react-number-format";
import { CsvToHtmlTable } from 'react-csv-to-table';
import CSVReader from 'react-csv-reader'
import * as d3 from 'd3';
import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";

const Main = () => {

  const [listReceipt, setListReceipt] = useState([]);
  const [receiptOptions, setReceiptOptions] = useState();
  const [selectedReceiptID, setSelectedReceiptID] = useState();
  const [selectedReceipt, setSelectedReceipt] = useState();
  const [receiptData, setReceiptData] = useState();

  const [importedDate, setImportedDate] = useState();
  const [receiptID, setReceiptID] = useState();
  const [total, setTotal] = useState(0);
  const [fileInfo, setFileInfo] = useState();

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/ListReceipt",
    }).then((res) => {
      if (res.data.status) {
        setListReceipt(res.data.obj);

        var receiptArr = [];
        res.data.obj.map((receipt) => {
          let obj = {
            key: receipt.id,
            value: receipt.id,
            text: receipt.id
          };
          receiptArr.push(obj)
        });
        setReceiptOptions(receiptArr);
      }
    });
  }, []);

  const handleSelectReceipt = (event, field) => {
    let value = field.value;
    setSelectedReceiptID(value);
    setSelectedReceipt(listReceipt.find(x => x.id === value));

    var fileName = listReceipt.find(x => x.id === value).importDate
      .slice(0, 10).split('-').join('') + '_' + value + ".csv";

    var link = "http://localhost:5000/Files/ImportFile/" + fileName;
    d3.text(link).then(function (data) {
      // setReceiptData(data);
      var receiptDataObjs = [];
      var rows = data.split('\n');
      for (var i = 1; i < rows.length; i++) {
        if (rows[i] !== "") {
          let fields = rows[i].split(',')
          receiptDataObjs.push(fields);
        }
      }
      setReceiptData(receiptDataObjs);
    }).catch(function (err) {
      console.log(err);
    })
  }

  const ShowReceiptData = useMemo(() => {
    if (receiptData && receiptData.length > 0) {
      var result = receiptData.map((data) => {
        return (
          <tr style={{
            textAlign: "center"
          }}>
            <td>{data[0]}</td>
            <td style={{
              textAlign: "left"
            }}>{data[1]}</td>
            <td>
              <NumberFormat
                displayType="text"
                value={data[2]}
                thousandSeparator={true}
                suffix=" VND"
              ></NumberFormat>
            </td>
            <td>
              <NumberFormat
                displayType="text"
                value={data[3]}
                thousandSeparator={true}
              ></NumberFormat>
            </td>
            <td>
              <NumberFormat
                displayType="text"
                value={data[4]}
                thousandSeparator={true}
                suffix=" VND"
              ></NumberFormat>
            </td>
          </tr>
        )
      });
      return result;
    }
  }, [receiptData])

  const handleResetReceiptList = () => {
    setReceiptData(null);
    setSelectedReceipt(null);
    setSelectedReceiptID(null);
  }

  const LoadFileCSV = (e) => {
    setFileInfo(e.target.files[0])
  }

  const handleIDChange = (event) => {
    var value = event.target.value;
    if (value) {
      setReceiptID(value);
    }
  }

  const handleDateChange = (event) => {
    var value = event.target.value;
    if (value) {
      setImportedDate(value);
    }
  }

  const handleTotalChange = (event) => {
    var value = event.target.value;
    if (value) {
      setTotal(parseInt(value));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const bodyFormData = new FormData();
    bodyFormData.append('file', fileInfo);
    Swal.fire({
      title: "Confirm",
      text: "Do you want to import this receipt?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, import!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
            "Content-Type": "multipart/form-data"
          },
          method: "post",
          url: "http://localhost:5000/api/Admin/ImportReceipt",
          params: {
            id: receiptID,
            importDate: importedDate,
            total: parseInt(total)
          },
          data: bodyFormData,
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Upload Receipt successfully"
            });
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
  }

  return (
    <Row>
      <Col lg="6">
        <Card>
          <CardHeader>
            <strong>Import Receipt</strong>
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal" encType="multipart/form-data"
              onSubmit={handleSubmit}>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="date-input">Import Day</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    required
                    type="date"
                    id="date-input"
                    name="date-input"
                    placeholder="date"
                    onChange={handleDateChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Import Bill ID</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    required
                    id="text-input"
                    name="text-input"
                    placeholder="ID"
                    onChange={handleIDChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Total</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    required
                    type="number"
                    id="text-input"
                    name="text-input"
                    placeholder="Total"
                    onChange={handleTotalChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="book-select">Select file to import</Label>
                </Col>

                <Col md="9">
                  <Input type="file" multiple={false}
                    accept={".csv"}
                    onChange={LoadFileCSV} />
                </Col>
              </FormGroup>
              <Button className="mr-1" type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o"></i> Import
              </Button>
              <Button type="reset" size="sm" color="danger">
                <i className="fa fa-ban"></i> Reset
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>

      <Col lg="6">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> List Receipt
          </CardHeader>
          <CardBody>
            <Row className="mb-1">
              <Dropdown
                selection
                className="ml-1"
                placeholder="Select state"
                options={receiptOptions}
                onChange={handleSelectReceipt}
                value={selectedReceiptID ? selectedReceiptID : null}
              />
              <Button
                color="danger"
                className="btn ml-1"
                onClick={handleResetReceiptList}
              >
                <i className="fa fa-close"></i> Reset
              </Button>
            </Row>
            <Table responsive>
              <thead>
                <tr style={{
                  textAlign: "center"
                }}>
                  <th>ISBN</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ShowReceiptData}
              </tbody>
            </Table>
            <Row>
              <Col lg="6">
                <h5>Total: &nbsp;
                <strong>
                    <NumberFormat
                      displayType="text"
                      value={selectedReceipt ? selectedReceipt.total : "0"}
                      thousandSeparator={true}
                      suffix=" VND"
                    ></NumberFormat></strong>
                </h5>
              </Col>
              <Col lg="6">
                <h5>Imported Date: &nbsp;
                <strong>{selectedReceipt ? moment(selectedReceipt.importDate).format("DD-MM-YYYY") : ""}</strong>
                </h5>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Main;
