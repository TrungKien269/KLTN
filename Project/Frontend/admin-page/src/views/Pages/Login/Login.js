import React, { Component, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setUserSession } from "../../../Utils/Commons";
import { UserContext } from "../../../context/userContext";
import { withRouter } from "react-router";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { token, refreshToken } = useContext(UserContext);
  // const [imageUrl, setImageUrl] = useState("");

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/Login/Signin",
      params: {
        username,
        password,
      },
    }).then((res) => {
      if (res.data.status) {
        setUserSession(res.data.token);
        // refreshToken();
        props.history.push("/");
      } else {
        alert("sikesss !");
      }
    });
  };
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={(e) => handleFormSubmit(e)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => handleUserNameChange(e)}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => handlePasswordChange(e)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
