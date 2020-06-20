import React from "react";
import { Header, Image, Table, Button } from "semantic-ui-react";
import Axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../Utils/Commons";

const BookCard = (props) => {
  const handleUpdate = (e) => {
    props.selectedBookID(props.id);
  };

  const handleDisable = () => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to disable this book?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, disable!",
    }).then((result) => {
      if (result.value) {
        Axios({
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          method: "post",
          url: "http://localhost:5000/api/Admin/DisableBook",
          params: {
            id: props.id
          },
        }).then((res) => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Disable this book",
              icon: "success",
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
          <Header.Subheader>
            Author: <strong>{props.author}</strong>
          </Header.Subheader>
        </Header.Content>
      </Table.Cell>
      <Table.Cell textAlign="center" >{props.status}</Table.Cell>
      <Table.Cell collapsing textAlign="right">
        <Button onClick={(e) => handleUpdate(e)}>Update</Button>
        <Button onClick={handleDisable}>Disable</Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default BookCard;
