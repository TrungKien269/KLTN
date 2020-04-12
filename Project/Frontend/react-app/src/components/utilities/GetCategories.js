import React, { Component, useState, useEffect, Link } from "react";
import axios from "axios";

class GetCategories extends Component {
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
          <div className="col-md-3">
            <h3 key={category.id}>{category.name}</h3>
            <ul>
              <li>asdasd</li>
            </ul>
          </div>
        );
      });
    }
    return result;
  };

  //   showListSubCategory = (categories) => {
  //     let result = "";
  //     for (let i = 0; i < categories.length; i++) {
  //       result = categories[i].map((category) => {
  //         console.log(result);
  //         return (
  //           <React.Fragment>
  //             <li>{category.subCategory.name}</li>
  //           </React.Fragment>
  //         );
  //       });
  //     }
  //     return result;
  //   };

  render() {
    return (
      <React.Fragment>
        {this.showListCategories(this.state.categories)}
      </React.Fragment>
    );
  }
}

export default GetCategories;
