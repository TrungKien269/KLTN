import React, { useEffect, useState, Component } from "react";
import Badge from "../utilities/Badge";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Container } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useTranslation } from 'react-i18next';

function EBookCard(props) {

  const { t, i18n } = useTranslation();

  const ViewEBook = (event) => {
    event.preventDefault();
    alert("READ");
  }

  return (
    <React.Fragment>
      <Link to={`/ebook/${props.id}`} title={props.name}>
        <div className="card display-on-hover">
          <img
            className="card-img-top img-contain img-contain-25"
            src={props.image}
            alt="Card image cap"
          />

          <div className="card-body">
            <h5 className="card__book-title">{props.name}</h5>

            <button
              className="btn btn--rounded btn-fw btn--blue item-display"
              onClick={ViewEBook}
            >
              {t('Read')}
            </button>
          </div>
        </div>
      </Link>
    </React.Fragment>
  )
}

export default EBookCard
