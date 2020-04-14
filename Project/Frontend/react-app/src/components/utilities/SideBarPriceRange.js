import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
class SideBarPriceRange extends Component {
  PriceChange = (event) => {
    let price = event.target.value;
    let routeString = "";
    routeString = `?from=${price.split(" ")[0]}&to=${price.split(" ")[1]}`;
    this.props.history.push(routeString);
  };

  render() {
    return (
      <React.Fragment>
        <div className="sidebar-block">
          <h2>Price range</h2>
          <select onChange={this.PriceChange} className="price-range">
            <option value={"-1 -1"}>All</option>
            <option value={"0 100000"}>0 - 100.000</option>
            <option value={"100000 500000"}>100.000 - 500.000</option>
            <option value={"500000 1000000"}>500.000 - 1.000.000</option>
            <option value={"1000000 1500000"}>1.000.000 - 1.500.000</option>
            <option value={"1500000 2000000"}>1.500.000 - 2.000.000</option>
            <option value={"2000000 2500000"}>2.000.000 - 2.500.000</option>
            <option value={"2500000 3000000"}>2.500.000 - 3.000.000</option>
            <option value={"3000000 3500000"}>3.000.000 - 3.500.000</option>
            <option value={"3500000 4000000"}>3.500.000 - 4.000.000</option>
            <option value={"4000000 4500000"}>4.000.000 - 4.500.000</option>
            <option value={"4500000 5000000"}>4.500.000 - 5.000.000</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SideBarPriceRange);
