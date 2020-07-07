import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Breadcrumb } from "semantic-ui-react";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [cfpassword, setCFPassword] = useState("");
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const sections = [
    { key: "Home", content: "Home", href: "/" },
    { key: "Login", content: "Login", href: "/login" },
    { key: "ConfirmEmail", content: "Confirm your email", href: "/confirmemail" },
    { key: "ResetPassword", content: "Create new password", active: true },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChanged = (event) => {
    setCFPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    if(password != cfpassword){
      Swal.fire({
        title: "Error",
        text: "Your confirm password and new password are not same!",
        icon: "error",
      });
    }
    else{
      const token = params.get("token");
    axios({
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "post",
      url: "http://localhost:5000/api/ForgotPassword/ResetPassword",
      params: {
        newPassword: password,
      },
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Password change successfully",
            text: "Your password has been changed",
            confirmButtonText: "Back to the login page",
          });
          props.history.push("/login");
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            Swal.fire({
              title: "Error",
              text: "This session has expired!",
              icon: "error",
            });
          }
        } else {
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
          });
        }
      });
    }
  };

  return (
    <section className="section__login">
      <div className="container">
        <Breadcrumb
          icon="right angle"
          sections={sections}
          className="breadcrumb-section"
        />
        <div className="row">
          <div className="col-md-6">
            <h1>Create new password</h1>
            <form
              method="post"
              id="resetForm"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="field-control">
                <label>New password</label>
                <input
                  type="password"
                  required
                  className="col-md-8"
                  autofocus="true"
                  onChange={(e) => handlePasswordChanged(e)}
                />
              </div>
              <div className="field-control">
                <label>Confirm new password</label>
                <input
                  type="password"
                  required
                  className="col-md-8"
                  autofocus="true"
                  onChange={(e) => handleConfirmPasswordChanged(e)}
                />
              </div>
              <div className="col-md-8 pad-0-0 mar-top-md">
                <input
                  type="submit"
                  className="btn btn-fit btn--blue"
                  value="Change"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(ResetPassword);
