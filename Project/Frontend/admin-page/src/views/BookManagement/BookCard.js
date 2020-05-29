import React from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";

const BookCard = (props) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={props.image} rounded size="massive"></Image>
        </Header>
      </Table.Cell>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.price}</Table.Cell>
      <Table.Cell>
        <Button>Update</Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default BookCard;
