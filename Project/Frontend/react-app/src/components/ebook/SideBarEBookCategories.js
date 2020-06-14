import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function SideBarEBookCategories() {

  const [categories, setCategories] = useState([]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/EBook/ListEBookCategory",
    }).then(function (res) {
      setCategories(res.data.obj);
    });
  }, []);

  const showListCategories = (cates) => {
    let result = [];
    if (cates && cates.length > 0) {
      result = cates.map((category) => {
        return (
          <li key={cates.indexOf(category)}>
            <Link to={category.name} className="pad-0-0">
              {t(category.name)}
            </Link>
          </li>
        );
      });
    }
    return result;
  };

  return (
    <React.Fragment>
      <div className="sidebar-block">
        <h2>{t('Categories')}</h2>
        <ul className="list-unstyled sidebar-list sidebar-category">
          {showListCategories(categories)}
          <li>
            <Link to={"/ebooks/"}>{t('All Products')}</Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default SideBarEBookCategories
