import React, { Component } from "react";

class SideBarPriceRange extends Component {
  render() {
    return (
      <React.Fragment>
        <select className="price-range">
          <option>All</option>
          <option>&lt;= 100.000</option>
          <option>100.000 - 500.000</option>
          <option>500.000 - 1.000.000</option>
          <option>1.000.000 - 1.500.000</option>
          <option>1.500.000 - 2.000.000</option>
          <option>2.000.000 - 2.500.000</option>
          <option>2.500.000 - 3.000.000</option>
          <option>3.000.000 - 3.500.000</option>
          <option>3.500.000 - 4.000.000</option>
          <option>4.000.000 - 4.500.000</option>
          <option>4.500.000 - 5.000.000</option>
        </select>
      </React.Fragment>
    );
  }
}

export default SideBarPriceRange;
