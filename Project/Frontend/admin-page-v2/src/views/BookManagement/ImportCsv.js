import React from "react";
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
const Main = () => {
  return (
    <Row>
      <Col lg="6">
        <Card>
          <CardHeader>
            <strong>Create promotion</strong>
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal">
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
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="book-select">Select file to import</Label>
                </Col>

                <Col md="9">
                  <Input type="file" id="file-input" name="file-input" />
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
      </Col>

      <Col lg="6">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i> View CSV
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123</td>
                  <td>Book name</td>
                  <td>Price</td>
                  <td>Amount</td>
                  <td>Total</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default Main;
