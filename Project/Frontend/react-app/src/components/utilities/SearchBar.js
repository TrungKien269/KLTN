import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="input__search-bar">
        <input type="text" placeholder="Search" />
        <i className="fas fa-search" />
      </div>
    );
  }
}

export default SearchBar;
