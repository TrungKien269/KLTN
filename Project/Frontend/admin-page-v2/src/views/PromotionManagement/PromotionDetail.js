import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import PromotionDetailForm from "./PromotionDetailForm";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import PromotionForm from "./PromotionForm";
const PromotionDetail = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Promotion</ModalHeader>
        <ModalBody>
          <PromotionDetailForm></PromotionDetailForm>
        </ModalBody>
      </Modal>
      <Card>
        <CardHeader className="d-flex justify-content-lg-between">
          <span>
            {" "}
            <i className="fa fa-align-justify"></i> Promotion id : (Promotion
            ID)
          </span>

          <Button.Group size="mini">
            <Button positive onClick={toggle}>
              Add
            </Button>
            <Button.Or text="or" />
            <Button onClick={toggle}>Update</Button>
            <Button.Or text="or" />
            <Button negative>Delete</Button>
          </Button.Group>
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
