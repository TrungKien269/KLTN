import React, { Component } from "react";
import LoginForm from "../../components/user/LoginForm";
import SignupForm from "../../components/user/SignupForm";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="section__login">
          <div className="containter-fluid">
            <div className="row">
              <LoginForm />
              <SignupForm />
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Login;
