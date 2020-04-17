import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = (props) => {

    const [password, setPassword] = useState("");
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const handlePasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const token = params.get('token');
        axios({
            headers: {
                "Authorization": "Bearer " + token
            },
            method: "post", 
            url: "http://localhost:5000/api/ForgotPassword/ResetPassword", 
            params: {
                newPassword: password
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data.status){
              Swal.fire({
                title: "Completely",
                text: "Password has been changed successfully",
                icon: "success",
              });
            }
        }).catch((err) => {
            if (err.response) {
                if(err.response.status === 401){
                  Swal.fire({
                    title: "Error",
                    text: "This session has expired!",
                    icon: "error",
                  });
                }
            }
            else{
              Swal.fire({
                title: "Error",
                text: err,
                icon: "error",
              });
            }
        });
    }

    return (
    <section className="section__login">
      <div className="containter-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Create new password</h1>
            <form
              method="post" id="resetForm"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <div className="field-control">
                <label>New Password</label>
                <input
                  type="password" 
                  required
                  className="col-md-8" 
                  autofocus="true"
                  onChange={(e) => handlePasswordChanged(e)}
                />
              </div>
              <div className="col-md-8 pad-0-0 mar-top-md">
                <input
                  type="submit"
                  className="btn btn-fit btn--blue"
                  value="Send"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    )
}

export default withRouter(ResetPassword)
