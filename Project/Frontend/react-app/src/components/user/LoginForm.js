import React, { Component, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { setUserSession } from "../../Utils/Commons";
import { UserContext } from "../../context/userContext";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { user, refreshUser } = useContext(UserContext);
  const { token, refreshToken } = useContext(UserContext);

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
    })
      .then((res) => {
        if (res.data.status) {
          setUserSession(res.data.token);
          // refreshUser();
          refreshToken();
          props.history.push("/");
        } else {
          alert("ERROR");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="section__login">
      <div className="containter-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Login</h1>
            <form
              method="post"
              id="loginForm"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="field-control">
                <label>Username or Email</label>
                <input
                  type="text"
                  required
                  className="col-md-8"
                  onChange={(e) => handleUserNameChange(e)}
                />
              </div>
              <div className="field-control">
                <label>Password</label>
                <input
                  type="password"
                  required
                  className="col-md-8"
                  onChange={(e) => handlePasswordChange(e)}
                />
              </div>
              <div className="col-md-8 pad-0-0 mar-top-md">
                <input
                  type="submit"
                  className="btn btn-fit btn--blue"
                  value="Login"
                />
              </div>
              <Link to="/login">Lost your password ?</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
