import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class SideBarPriceSort extends Component {
  Sort = (event) => {
    let value = event.target.value;
    let routeString = "";
    let field = value.split(" ")[0];
    let type = value.split(" ")[1];
    routeString = `?sortfield=${field}&sorttype=${type}`;
    this.props.history.push(routeString);
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="sidebar-block">
            <select
              onChange={this.Sort}
              className="price-range"
              defaultValue=""
            >
              <option value="" selected disabled hidden>
                Sort
              </option>
              <option value={"Price ASC"}>Giá tăng dần</option>
              <option value={"Price DESC"}>Giá giảm dần</option>
              <option value={"Name ASC"}>A -> Z</option>
              <option value={"Name DESC"}>Z -> A</option>
            </select>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(SideBarPriceSort);
