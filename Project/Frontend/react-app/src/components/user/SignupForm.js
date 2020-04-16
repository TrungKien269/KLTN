import React, { Component, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { setUserSession } from "../../Utils/Commons";
import { UserContext } from "../../context/userContext";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [fullname, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const { token, refreshToken } = useContext(UserContext);

  const handleUserNameChanged = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChanged = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChanged = (event) => {
    setEmail(event.target.value);
  };

  const handleFullNameChanged = (event) => {
    setFullName(event.target.value);
  };

  const handleGenderChanged = (event) => {
    setGender(event.target.value);
  };

  const handleBirthdayChanged = (event) => {
    setBirthday(event.target.value);
  };

  const handlePhoneNumberChanged = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleAddressChanged = (event) => {
    setAddress(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/Login/Signup",
      params: {
        fullName: fullname,
        gender: gender,
        birthday: birthday,
        phoneNumber: phonenumber,
        address: address,
        "accountRequest.Username": username,
        "accountRequest.Password": password,
        "accountRequest.Email": email,
      },
    })
      .then((res) => {
        if (res.data.status) {
          alert("Sign up successfully");
          setUserSession(res.data.token);
          refreshToken();
          props.history.push("/");
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="col-md-6">
      <form id="signupForm" onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Register</h1>
        <div class="field-control">
          <label>Username</label>
          <input
            type="text"
            class="col-md-8"
            onChange={(e) => handleUserNameChanged(e)}
          />
        </div>

        <div class="field-control">
          <label>Password</label>
          <input
            type="password"
            class="col-md-8"
            onChange={(e) => handlePasswordChanged(e)}
          />
        </div>

        <div class="field-control">
          <label>Email</label>
          <input
            type="email"
            class="col-md-8"
            onChange={(e) => handleEmailChanged(e)}
          />
        </div>

        <div class="field-control">
          <label>Full Name</label>
          <input
            type="text"
            class="col-md-8"
            onChange={(e) => handleFullNameChanged(e)}
          />
        </div>
        <div class="field-control">
          <label>Gender</label>
          <div>
            <ul>
              <li>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onClick={(e) => handleGenderChanged(e)}
                />
                <label for="male">Male</label>
                <div class="check"></div>
              </li>
              <li>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onClick={(e) => handleGenderChanged(e)}
                />
                <label for="female">Female</label>
                <div class="check">
                  <div class="inside"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="field-control">
          <label>Birthday</label>
          <input
            type="date"
            class="col-md-8"
            onChange={(e) => handleBirthdayChanged(e)}
          />
        </div>
        <div class="field-control">
          <label>Phone Number</label>
          <input
            type="text"
            class="col-md-8"
            onChange={(e) => handlePhoneNumberChanged(e)}
          />
        </div>
        <div class="field-control">
          <label>Address</label>
          <input
            type="text"
            class="col-md-8"
            onChange={(e) => handleAddressChanged(e)}
          />
        </div>

        <div class="col-md-8 pad-0-0 mar-top-md">
          <input type="submit" value="Signup" class="btn btn-fit btn--blue" />
        </div>
      </form>
    </div>
  );
};

export default withRouter(Signup);
