import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

const GetCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then((res) => {
      setCategories(res.data.obj);
    });
  }, []);

  const showListCategories = (categories) => {
    // console.log(categories.length);
    if (categories.length > 0) {
      return categories.map((v) => {
        return (
          <div className="col-md-3" key={v.id}>
            <Link to={`/collections/${v.name}`}>
              <h3>{v.name}</h3>
            </Link>
          </div>
        );
      });
    }
    return null;
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

  return <React.Fragment>{showListCategories(categories)}</React.Fragment>;
};

export default withRouter(GetCategories);
