import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
const PromotionDetail = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <i className="fa fa-align-justify"></i> Promotion id : (Promotion ID)
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book name</th>
                <th>Discount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>111111</td>
                <td>example</td>
                <td>10%</td>
                <td>
                  <Badge color="success">Active</Badge>
                </td>
              </tr>
            </tbody>
          </Table>
          <Pagination>
            <PaginationItem>
              <PaginationLink previous tag="button"></PaginationLink>
            </PaginationItem>
            <PaginationItem active>
              <PaginationLink tag="button">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink tag="button">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink tag="button">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink tag="button">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next tag="button"></PaginationLink>
            </PaginationItem>
          </Pagination>
        </CardBody>
      </Card>
    </div>
  );
};
export default PromotionDetail;
