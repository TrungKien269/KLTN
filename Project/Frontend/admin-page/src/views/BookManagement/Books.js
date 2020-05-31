import React, {useState, useMemo} from "react";
import BookForm from "./BookForm";
import BookCard from "./BookCard";
import { Row, Col } from "reactstrap";
import BookView from "./BookView";

const BooksManagement = () => {

  const [bookID, setBookID] = useState(null);

  const handleSelectBookID = (id) => {
    setBookID(id);
  };

  const displayBookForm = useMemo(() => {
    return (
      <Col xs="12" md="12">
        <BookForm selectedID={bookID}></BookForm>
      </Col>
    )
  }, [bookID])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" md="12">
        <BookView category="" onSelectBook={(id) => handleSelectBookID(id)}></BookView>
        </Col>
        {displayBookForm}
      </Row>
    </div>
  );
};
export default BooksManagement;
