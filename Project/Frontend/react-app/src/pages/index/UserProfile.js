import React, { Component, useState, useEffect, useMemo } from "react";
import { getToken } from "../../Utils/Commons";
import axios from "axios";
function UserProfile() {
  const [userInfor, setUserInfor] = useState();
  useEffect(() => {
    const token = getToken();
    axios({
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "get",
      url: "http://localhost:5000/api/UserProfile/Profile",
    }).then((res) => {
      setUserInfor(res.data.obj);
    });
  }, []);

  const showUserInfor = useMemo((userInfor) => {
    return;
  });

  return (
    <section class="section__profile">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="title-wrapper">
              <h3>Profile</h3>
            </div>
            <form action="" class="profile-wrapper">
              <label for="name">{showUserInfor}</label>
              <input type="text" id="name" value="Dang Thanh The" disabled />
              <label for="Gender">Gender</label>
              <ul id="Gender">
                <li>
                  <input type="radio" id="f-option" name="selector" />
                  <label for="f-option">Male</label>

                  <div class="check"></div>
                </li>

                <li>
                  <input type="radio" id="s-option" name="selector" />
                  <label for="s-option">Female</label>

                  <div class="check">
                    <div class="inside"></div>
                  </div>
                </li>
              </ul>
              <label for="birthday">Birthday</label>
              <input type="date" value="29/09/1998" />
              <label for="phone">Phone number</label>
              <input type="number" placeholder="Phone number" />
              <label for="address">Address</label>
              <input type="text" placeholder="Address" />
              <button class="btn btn-fit btn--lg btn--rounded btn--blue">
                Save
              </button>
            </form>
          </div>
          <div class="col-md-6">
            <div class="title-wrapper">
              <h3>Change password</h3>
            </div>
            <form action="" class="profile-wrapper">
              <label for="current">Current password</label>
              <input type="password" id="current" required />
              <label for="new">New password</label>
              <input type="password" id="new" required />
              <label for="comfirm">Confirm password</label>
              <input type="password" id="confirm" required />
              <button class="btn btn-fit btn--lg btn--rounded btn--blue">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
