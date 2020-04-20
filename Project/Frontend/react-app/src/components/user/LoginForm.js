import React, { Component, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { setUserSession } from "../../Utils/Commons";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, refreshToken } = useContext(UserContext);

  const handleUserNameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/Login/Signin",
      params: {
        username,
        password
      }
    })
      .then(res => {
        if (res.data.status) {
          Swal.fire({
            title: "Success",
            text: "Sign in  completely",
            icon: "success"
          }).then(() => {
            setUserSession(res.data.token);
            refreshToken();
            props.history.push("/");
          });
        } else {
          Swal.fire({
            title: "Error",
            text: res.data.message,
            icon: "error"
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error"
        });
      });
  };

  const handleFaceBookClicked = () => {
    // console.log("CLICK");
  };

  const responseFacebook = response => {
    if (response.status && response.status == "unknown") {
      Swal.fire({
        title: "Error",
        text: "Sign in with Facebook fail!",
        icon: "error"
      });
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/Login/FacebookSignin",
        params: {
          facebookID: response.id,
          fullName: response.name
        }
      })
        .then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Success",
              text: "Sign in completely",
              icon: "success"
            }).then(() => {
              setUserSession(res.data.token);
              refreshToken();
              props.history.push("/");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: res.data.message,
              icon: "error"
            });
          }
        })
        .catch(err => {
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error"
          });
        });
    }
  };

  const responseGoogle = response => {
    if (response.error) {
      Swal.fire({
        title: "Error",
        text: "Sign in with Google fail!",
        icon: "error"
      });
    } else {
      axios({
        method: "post",
        url: "http://localhost:5000/api/Login/GoogleSignin",
        params: {
          email: response.profileObj.email
        }
      })
        .then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Success",
              text: "Sign in completely",
              icon: "success"
            }).then(() => {
              setUserSession(res.data.token);
              refreshToken();
              props.history.push("/");
            });
          } else {
            Swal.fire({
              title: "Error",
              text: res.data.message,
              icon: "error"
            });
          }
        })
        .catch(err => {
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error"
          });
        });
    }
  };

  return (
    <div className="col-md-6">
      <h1>Login</h1>
      <form method="post" id="loginForm" onSubmit={e => handleFormSubmit(e)}>
        <div className="field-control">
          <label>Username or Email</label>
          <input
            type="text"
            required
            className="col-md-8"
            onChange={e => handleUserNameChange(e)}
          />
        </div>
        <div className="field-control">
          <label>Password</label>
          <input
            type="password"
            required
            className="col-md-8"
            onChange={e => handlePasswordChange(e)}
          />
        </div>
        <div className="col-md-8 pad-0-0 mar-top-md">
          <input
            type="submit"
            className="btn btn-fit btn--blue"
            value="Login"
          />
        </div>
        <Link to="/confirmemail">Forgot your password ?</Link>
      </form>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <FacebookLogin
              appId="465730364148971"
              autoLoad={false}
              fields="name, email, picture"
              scope="email"
              onClick={() => handleFaceBookClicked()}
              callback={e => responseFacebook(e)}
            />
          </div>
          <div className="col-md-12">
            <GoogleLogin
              clientId="595791710812-b26iddsr8lsqntdqrs6cpmpllq65obfd.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={e => responseGoogle(e)}
              onFailure={e => responseGoogle(e)}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
