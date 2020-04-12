import React, { Component, useState, useEffect } from "react";
import axios from "axios";

class GetCategories extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    const x = this;
    axios({
      method: "GET",
      url: "http://localhost:53788/api/Main/ListCategory",
    }).then(function (res) {
      //   console.log(res);
      x.setState({ categories: res.data.obj });
    });
  }

  showListCategories = (categories) => {
    console.log(categories.length);
    let result = "";
    if (Object.keys(categories).length > 0) {
      result = categories.map((category) => {
        return (
          <div>
            <h3 key={category.id}>{category.name}</h3>
          </div>
        );
      });
    }
    return result;
  };

  render() {
    return <ul>{this.showListCategories(this.state.categories)}</ul>;
  }
}

export default GetCategories;
