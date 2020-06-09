import React from "react";
import PromotionForm from "./PromotionForm";
import { Row, Col } from "reactstrap";
import PromotionLList from "./PromotionList";

const PromotionManagement = () => {
  return (
    <div>
      <Row>
        <Col md="6" xs="12">
          <PromotionForm></PromotionForm>
        </Col>
        <Col md="12" xs="12">
          <PromotionLList></PromotionLList>
        </Col>
      </Row>
    </div>
  );
};
export default PromotionManagement;
