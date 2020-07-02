import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SideBarPriceSort(props) {
  const { t, i18n } = useTranslation();

  const Sort = (event) => {
    let value = event.target.value;
    let routeString = "";
    let field = value.split(" ")[0];
    let type = value.split(" ")[1];
    routeString = `?sortfield=${field}&sorttype=${type}`;
    props.history.push(routeString);
  };

  return (
    <div className="sidebar-block">
      <h2>{t("Sort options")}</h2>
      <select onChange={Sort} className="price-range" defaultValue="">
        <option value="" disabled hidden>
          {t("Sort")}
        </option>
        <option value={"Price ASC"}>{t("Price Ascending")}</option>
        <option value={"Price DESC"}>{t("Price Descending")}</option>
        <option value={"Name ASC"}>{"A -> Z"}</option>
        <option value={"Name DESC"}>{"Z -> A"}</option>
      </select>
    </div>
  );
}

export default withRouter(SideBarPriceSort);
