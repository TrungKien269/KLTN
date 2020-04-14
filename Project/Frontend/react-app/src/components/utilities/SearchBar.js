import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class SearchBar extends Component {

  state = {
    search: "",
  };

  Search = (event) => {
    if (event.key === "Enter") {
      let value = event.target.value;
      if(value != ""){
        let routeString = `?search=${value}`;
        this.props.history.push("/collections/" + routeString);
      }
    }
  }

  render() {
    return (
      <div className="input__search-bar">
        <input type="text" placeholder="Search" onKeyPress={this.Search} />
        <i className="fas fa-search" />
      </div>
    );
  }
}

export default withRouter(SearchBar);
