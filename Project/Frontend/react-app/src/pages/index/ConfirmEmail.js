import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ConfirmEmail = (props) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "get",
      url: "http://localhost:5000/api/ForgotPassword/ConfirmEmail",
      params: {
        email: email,
      },
    })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Confirmed",
            text: "You can check your email to change your password",
            icon: "info",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "This email was not used in system!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        });
      });
  };

  return (
    <section className="section__login">
      <div className="containter-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Confirm via Email</h1>
            <form
              method="post"
              id="confirmForm"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="field-control">
                <label>Email</label>
                <input
                  type="text"
                  id="txtEmail"
                  required
                  className="col-md-8"
                  autofocus="true"
                  onChange={(e) => handleEmailChange(e)}
                />
              </div>
              <div className="col-md-8 pad-0-0 mar-top-md">
                <input
                  type="submit"
                  className="btn btn-fit btn--blue"
                  value="Send"
                />
              </div>
              <Link to="/login">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(ConfirmEmail);
