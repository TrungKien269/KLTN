import React, { Component, useState, useEffect, useMemo, useRef } from "react";
import { getToken, removeUserSession } from "../../Utils/Commons";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import { swal } from "sweetalert2/dist/sweetalert2.all";
import Footer from "../../components/Footer";
import Header from "../../components/header/Header";
import { useTranslation } from 'react-i18next';

function UserProfile(props) {
  const [userInfor, setUserInfor] = useState();
  const [fullName, setFullName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [currentPass, setCurrentpass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const fullNameRef = useRef(null);
  const birthDayRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const curPassRef = useRef(null);
  const newPassref = useRef(null);
  const confirmPassRef = useRef(null);

  const { t, i18n } = useTranslation();
  const GenderArr = [t('Male'), t('Female')];

  const handleNameChange = (event) => {
    setFullName(event.target.value);
  };
  const handleGenderChanged = (event) => {
    setGender(event.target.value);
  };
  const handleBirthday = (event) => {
    setBirthday(event.target.value);
  };
  const handlePhoneNumberChanged = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleAddressChanged = (event) => {
    setAddress(event.target.value);
  };
  const handlecurrentPass = (event) => {
    setCurrentpass(event.target.value);
  };
  const handleNewPass = (event) => {
    setNewPass(event.target.value);
  };
  const handleConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };

  useEffect(() => {
    axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/UserProfile/Profile",
    }).then((res) => {
      setUserInfor(res.data.obj);
      setFullName(res.data.obj.fullName);
      setPhoneNumber(res.data.obj.phoneNumber);
      setAddress(res.data.obj.address);
      setBirthday(res.data.obj.birthday);
      setGender(res.data.obj.gender);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "put",
      url: "http://localhost:5000/api/UserProfile/UpdateProfile",
      params: {
        fullName: fullName,
        gender: gender,
        birthday: birthday,
        phoneNumber: phonenumber,
        address: address,
        "accountRequest.Username": "asdasd",
        "accountRequest.Password": "asdasd",
        "accountRequest.Email": "asdas",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Update Profile successfully",
          });
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChangePass = (event) => {
    event.preventDefault();
    axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "post",
      url: "http://localhost:5000/api/UserProfile/CheckPassword",
      params: {
        current_password: currentPass,
      },
    }).then((res) => {
      if (res.data.status) {
        if (confirmPass === newPass) {
          axios({
            headers: {
              Authorization: "Bearer " + getToken(),
            },
            method: "post",
            url: "http://localhost:5000/api/UserProfile/ChangePassword",
            params: {
              new_password: newPass,
            },
          }).then((res) => {
            if (res.data.status) {
              Swal.fire({
                icon: "success",
                title: "Password change successfully",
                text: "Your password has been changed"
              });
              // removeUserSession();
              // props.history.push("/login");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your confirm password and new password are not same!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your current password is wrong!",
        });
      }
    });
  };

  const checkGender = (userInfor, gender) => {
    if (userInfor && gender === "Male") {
      return (
        <ul id="Gender">
          <li>
            <input
              type="radio"
              id="f-option"
              name="selector"
              value="Male"
              checked
              onClick={(e) => handleGenderChanged(e)}
            />
            <label for="f-option">{GenderArr[0]}</label>

            <div class="check"></div>
          </li>

          <li>
            <input
              type="radio"
              id="s-option"
              name="selector"
              value="Female"
              onClick={(e) => handleGenderChanged(e)}
            />
            <label for="s-option">{GenderArr[1]}</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
        </ul>
      );
    } else {
      return (
        <ul id="Gender">
          <li>
            <input
              type="radio"
              id="f-option"
              name="selector"
              value="Male"
              onClick={(e) => handleGenderChanged(e)}
            />
            <label for="f-option">{GenderArr[0]}</label>

            <div class="check"></div>
          </li>

          <li>
            <input
              type="radio"
              id="s-option"
              name="selector"
              value="Female"
              checked
              onClick={(e) => handleGenderChanged(e)}
            />
            <label for="s-option">{GenderArr[1]}</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
        </ul>
      );
    }
  };

  return (
    <React.Fragment>
      <section class="section__profile">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="title-wrapper">
                <h3>Profile</h3>
              </div>
              <form
                action=""
                class="profile-wrapper"
                onSubmit={(e) => handleSubmit(e)}
              >
                <label for="name">{t('Full name')}</label>
                <input
                  type="text"
                  id="name"
                  defaultValue={userInfor && fullName}
                  ref={fullNameRef}
                  onChange={(e) => handleNameChange(e)}
                />
                <label for="Gender">{t('Gender')}</label>
                {checkGender(userInfor, gender)}
                <label for="birthday">{t('Birthday')}</label>
                <input
                  type="date"
                  defaultValue={userInfor && birthday.slice(0, 10)}
                  ref={birthDayRef}
                  onChange={(e) => handleBirthday(e)}
                />
                <label for="phone">{t('Phone number')}</label>
                <input
                  defaultValue={userInfor && phonenumber}
                  type="number"
                  defaultValue={userInfor && userInfor.phoneNumber}
                  ref={phoneRef}
                  onChange={(e) => handlePhoneNumberChanged(e)}
                />
                <label for="address">{t('Address')}</label>
                <input
                  type="text"
                  defaultValue={userInfor && address}
                  ref={addressRef}
                  onChange={(e) => handleAddressChanged(e)}
                />
                <input
                  class="btn btn-fit btn--lg btn--rounded btn--blue"
                  type="submit"
                  value={t('Update')}
                />
              </form>
            </div>
            <div class="col-md-6">
              <div class="title-wrapper">
                <h3>{t('Change password')}</h3>
              </div>
              <form
                action=""
                class="profile-wrapper"
                onSubmit={(e) => handleChangePass(e)}
              >
                <label for="current">{t('Current password')}</label>
                <input
                  type="password"
                  id="current"
                  defaultValue=""
                  ref={curPassRef}
                  required
                  onChange={(e) => handlecurrentPass(e)}
                />
                <label for="new">{t('New password')}</label>
                <input
                  type="password"
                  id="new"
                  defaultValue=""
                  ref={newPassref}
                  onChange={(e) => handleNewPass(e)}
                  required
                />
                <label for="comfirm">{t('Confirm password')}</label>
                <input
                  type="password"
                  id="confirm"
                  defaultValue=""
                  ref={confirmPassRef}
                  onChange={(e) => handleConfirmPass(e)}
                  required
                />
                <input
                  class="btn btn-fit btn--lg btn--rounded btn--blue"
                  value={t('Change')}
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default withRouter(UserProfile);
