import React, { useState, useMemo } from "react";
import BookForm from "./BookForm";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import BookView from "./BookView";

const BookManagement = (props) => {
  const [bookID, setBookID] = useState(null);
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSelectBookID = (id) => {
    setBookID(id);
  };

  const displayBookForm = useMemo(() => {
    return (
      <Col xs="12" md="12">
        <BookForm selectedID={bookID}></BookForm>
      </Col>
    );
  }, [bookID]);

  return (
    <div className="animated fadeIn">
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>{displayBookForm}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col xs="12" md="12">
          <Button className="mb-1" color="success" onClick={toggle}>
            Import/Update
          </Button>
          <BookView
            category=""
            onSelectBook={(id) => handleSelectBookID(id)}
          ></BookView>
        </Col>
        {displayBookForm}
      </Row>
    </div>
  );
};
export default BookManagement;
