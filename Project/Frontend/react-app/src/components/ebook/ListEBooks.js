import React, { Component, lazy, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import EBookPagi from "./EBookPagi";

function ListEBooks(props) {

  const { category } = props;

  return (
    <React.Fragment>
      <EBookPagi
        category={encodeURI(category)}
        itemsCountPerPage={12}
        pageRangeDisplayed={3}
      />
    </React.Fragment>
  )
}

export default ListEBooks
