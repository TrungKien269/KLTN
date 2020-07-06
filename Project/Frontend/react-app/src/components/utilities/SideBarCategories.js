import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, withRouter, Redirect, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SideBarCategories(props) {
  const [categories, setCategories] = useState([]);

  const { t, i18n } = useTranslation();
  let history = useHistory();
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/Main/ListCategory",
    }).then(function (res) {
      setCategories(res.data.obj);
    });
  }, []);

  const handleSelectCategory = (e) => {
    let category = e.target.value;

    history.push(category);
  };
  const showListCategories = (cates) => {
    let result = [];
    if (cates && cates.length > 0) {
      result = cates.map((category) => {
        return (
          <li key={category.id}>
            <Link to={"/collections/" + category.name} className="pad-0-0">
              {t(category.name)}
            </Link>
          </li>
        );
      });
    }
    return result;
  };
  const showOptionsCategories = (cates) => {
    let result = [];
    if (cates && cates.length > 0) {
      result = cates.map((category) => {
        return (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        );
      });
    }
    return result;
  };

  return (
    <React.Fragment>
      <div className="sidebar-block hidden-md-elements">
        <h2>{t("Categories")}</h2>
        <ul className="list-unstyled sidebar-list sidebar-category">
          {showListCategories(categories)}
          <li>
            <Link to={"/collections/"}>{t("All Products")}</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-block display-md-elements">
        <select
          className="price-range"
          onChange={(e) => handleSelectCategory(e)}
        >
          {showOptionsCategories(categories)}
        </select>
      </div>
    </React.Fragment>
  );
}

export default SideBarCategories;
