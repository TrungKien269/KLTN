import React from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";

const BookCard = (props) => {

  const handleUpdate = (e) => {
    props.selectedBookID(props.id)
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={props.image} rounded size="massive"></Image>
        </Header>
      </Table.Cell>
      <Table.Cell>
        <strong>{props.id}</strong>
      </Table.Cell>
      <Table.Cell>
        <Header.Content>
          Book name: <strong>{props.name}</strong>
          <Header.Subheader>
            Published year: <strong>{props.publishedyear}</strong>
          </Header.Subheader>
          <Header.Subheader>
            Price: <strong>{props.price}</strong>
          </Header.Subheader>
        </Header.Content>
      </Table.Cell>
      <Table.Cell>{props.status}</Table.Cell>
      <Table.Cell collapsing textAlign="right">
        <Button onClick={(e) => handleUpdate(e)}>Update</Button>
        <Button>Disable</Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default BookCard;
