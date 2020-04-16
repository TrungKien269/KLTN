import React, { Component } from "react";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";

class Login extends Component {
  render() {
    return (
      <section className="section__login">
        <div className="containter-fluid">
          <div className="row">
            <LoginForm />
            <SignupForm />
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
