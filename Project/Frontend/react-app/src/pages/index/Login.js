import React, { Component } from "react";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="container">
          <div className="section__login">
            <div className="row">
              <LoginForm />
              <SignupForm />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Login;
