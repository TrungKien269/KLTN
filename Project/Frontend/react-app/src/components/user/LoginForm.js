import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { setUserSession } from "../../Utils/Commons";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleUserNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    const { match, location, history } = this.props;
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/Login/Signin",
      params: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then((res) => {
      setUserSession(res.data.token, res.data.obj);
      this.props.history.push("/");
    });
  };

  GetSession = (event) => {
    axios({
      url: "http://localhost:5000/api/Main/SessionInfo",
    }).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <section className="section__login">
        <div className="containter-fluid">
          <div className="row">
            <div className="col-md-6">
              <h1>Login</h1>
              <form
                method="post"
                id="loginForm"
                onSubmit={this.handleFormSubmit}
              >
                <div className="field-control">
                  <label>Username or Email</label>
                  <input
                    type="text"
                    required
                    className="col-md-8"
                    onChange={this.handleUserNameChange}
                  />
                </div>
                <div className="field-control">
                  <label>Password</label>
                  <input
                    type="password"
                    required
                    className="col-md-8"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="col-md-8 pad-0-0 mar-top-md">
                  <input type="submit" className="btn btn-fit btn--blue" />
                </div>
                <Link to="/login">Lost your password ?</Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
