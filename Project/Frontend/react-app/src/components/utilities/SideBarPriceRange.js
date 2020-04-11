import React, { Component } from "react";

class SideBarPriceRange extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-block">
          <h2>Price Range</h2>
          <div className="d-flex align-items-center">
            <h4>Range:</h4>
            <input
              type="text"
              className="js-input-from input-min-price"
              defaultValue={0}
            />
            <h3>-</h3>
            <input
              type="text"
              className="js-input-to input-max-price"
              defaultValue={0}
            />
          </div>
          <div className="wrapper">
            <div className="range-slider">
              <input type="text" className="js-range-slider" defaultValue />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBarPriceRange;
