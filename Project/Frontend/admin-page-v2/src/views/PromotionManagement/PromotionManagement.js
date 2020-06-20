import React from "react";
import PromotionForm from "./PromotionForm";
import { Row, Col } from "reactstrap";
import PromotionList from "./PromotionList";
import PromotionPagination from './PromotionPagination';

const PromotionManagement = () => {
  return (
    <div>
      <Row>
        <Col md="6" xs="12">
          <PromotionForm></PromotionForm>
        </Col>
        <Col md="12" xs="12">
          <PromotionPagination
            itemsCountPerPage={20}
            pageRangeDisplayed={10} />
        </Col>
      </Row>
    </div>
  );
};
export default PromotionManagement;
