import React, { Component, Fragment } from "react";
import axios from "axios";
class SideBarCategories extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    const x = this;
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then(function (res) {
      //   console.log(res);
      x.setState({ categories: res.data.obj });
    });
  }

  showListCategories = (categories) => {
    // console.log(categories.length);
    let result = "";
    if (Object.keys(categories).length > 0) {
      result = categories.map((category) => {
        // console.log(categories[1].subCategory);

        return (
          <li key={category.id}>
            <a href="/" className="pad-0-0">
              {category.name}
            </a>
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
          <h2>Categories</h2>
          <ul className="list-unstyled sidebar-list sidebar-category">
            {this.showListCategories(this.state.categories)}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBarCategories;
