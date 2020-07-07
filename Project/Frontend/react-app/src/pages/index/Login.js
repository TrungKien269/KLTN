import React, { Component } from "react";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";
import { Breadcrumb } from "semantic-ui-react";
const Login = () => {
  const sections = [
    { key: "Home", content: "Home", href: "/" },
    { key: "Login", content: "Login or Register", active: true },
  ];

  return (
    <React.Fragment>
      <section className="container">
        <div className="section__login">
          <Breadcrumb
            icon="right angle"
            sections={sections}
            className="breadcrumb-section"
          />
          <div className="row">
            <LoginForm />
            <SignupForm />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
