import React, { Component } from "react";
import axios from "axios";
class SideBarBrand extends Component {
  state = {
    publishers: [],
  };

  componentDidMount = () => {
    const x = this;
    axios({
      method: "get",
      url: "http://localhost:5000/api/Main/FamousPublisher",
    }).then(function (res) {
      x.setState({
        publishers: res.data.obj,
      });
    });
  };
  showListPublisher = (publishers) => {
    let result = "";
    if (Object.keys(publishers).length > 0) {
      result = publishers.map((publisher) => {
        return (
          <li>
            {" "}
            <label>
              <input type="checkbox" id={publisher.id} className="check__box" />
              <label htmlFor={publisher.id} className="checkmark" />
              <label htmlFor={publisher.id}>{publisher.name}</label>
            </label>
          </li>
        );
      });
    }
    return result;
  };
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-block">
          <h2>Publishers</h2>
          <ul className="list-unstyled sidebar-list">
            {this.showListPublisher(this.state.publishers)}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBarBrand;
