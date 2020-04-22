import React, { useState, useMemo, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import { getToken } from "../../Utils/Commons";
import Swal from "sweetalert2";

const CommentExampleComment = (props) => {
  const { id } = props;
  const [data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/BookInfo/ListComment",
      params: {
        bookID: id,
      },
    }).then((response) => {
      if (response.data.status) {
        setData(response.data.obj);
        // let diffTime = Math.abs(new Date(moment()) - new Date(response.data.obj[0].dateTime));
        // console.log(Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
      }
    });
    if (getToken()) {
      setIsLogin(true);
    }
  }, []);

  const handleInputChange = (e) => {
    setUserComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (getToken() === null || getToken() === undefined) {
      Swal.fire({
        title: "Error",
        text: "You have to sign in for this action!",
        icon: "error",
      });
    } else {
      axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "post",
        url: "http://localhost:5000/api/BookInfo/Comment",
        params: {
          bookID: id,
          text: document.getElementById("txtComment").value,
        },
      }).then((res) => {
        if (res.data.status) {
          var newComment = {
            id: parseInt(res.data.obj.id),
            bookId: res.data.obj.bookId,
            text: res.data.obj.text,
            dateTime: moment(res.data.obj.dateTime).format(
              "MM-DD-YYYY, hh:mm:ss"
            ),
            user: {
              name: "You",
            },
          };
          setData((prev) => [newComment, ...data]);
        }
      });
    }
  };

  const listComment = useMemo(() => {
    let commentArr = [];
    let comments = [];
    if (data.length > 0) {
      commentArr = data.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
      });
      comments = commentArr.map((cmt) => {
        return (
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <Comment.Content>
              <Comment.Author as="a">
                {Object.keys(cmt).length > 0
                  ? isLogin
                    ? "You"
                    : cmt.user.fullName
                  : ""}
              </Comment.Author>
              <Comment.Metadata>
                {Object.keys(cmt).length > 0
                  ? moment(new Date(cmt.dateTime)).format(
                      "MM-DD-YYYY, hh:mm:ss"
                    )
                  : ""}
              </Comment.Metadata>
              <Comment.Text>
                <p>{Object.keys(cmt).length > 0 ? cmt.text : ""}</p>
              </Comment.Text>
              {/* <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions> */}
            </Comment.Content>
          </Comment>
        );
      });
    }
    return comments;
  }, [data]);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {listComment}

      <Form reply onSubmit={(e) => handleSubmit(e)}>
        <Form.TextArea
          id="txtComment"
          required
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          content="Add Comment"
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form>
    </Comment.Group>
  );
};

export default CommentExampleComment;
