import React, { Component } from "react";

class SideBarBrand extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-block">
          <h2>Brand</h2>
          <ul className="list-unstyled sidebar-list">
            <li>
              <input type="checkbox" id="check1" className="check__box" />
              <label htmlFor="check1" className="checkmark" />
              <label htmlFor="check1">accesi</label>
            </li>
            <li>
              <input type="checkbox" id="check2" className="check__box" />
              <label htmlFor="check2" className="checkmark" />
              <label htmlFor="check2">bikis</label>
            </li>
            <li>
              <input type="checkbox" id="check3" className="check__box" />
              <label htmlFor="check3" className="checkmark" />
              <label htmlFor="check3">elle</label>
            </li>
            <li>
              <input type="checkbox" id="check4" className="check__box" />
              <label htmlFor="check4" className="checkmark" />
              <label htmlFor="check4">gondo</label>
            </li>
            <li>
              <input type="checkbox" id="check5" className="check__box" />
              <label htmlFor="check5" className="checkmark" />
              <label htmlFor="check5">jeana</label>
            </li>
            <li>
              <input type="checkbox" id="check6" className="check__box" />
              <label htmlFor="check6" className="checkmark" />
              <label htmlFor="check6">ladora</label>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBarBrand;
