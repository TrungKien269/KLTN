import React, { Component, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then((res) => {
      setCategories(res.data.obj);
    });
  }, []);

  const showListCategories = () => {
    if (categories) {
      return categories.map((v) => {
        return (
          <div className="col-md-3" key={v.id}>
            <Link to={`/collections/${v.name}`}>
              <h3>{t(v.name)}</h3>
            </Link>
          </div>
        );
      });
    }
    return null;
  };

  return <React.Fragment>{showListCategories()}</React.Fragment>;
};

export default withRouter(GetCategories);


