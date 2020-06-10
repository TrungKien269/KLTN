import React, {  } from "react";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function SpecialItemCard (props) {

  const { t, i18n } = useTranslation();

  return (
    <div className="special-item">
      <div
        className="special-wrapper"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.6113795860140931) 46%, rgba(0,0,0,0.05675773727459732) 100%),url(" +
            props.image +
            ")",
        }}
      >
        <div className="row">
          <div className="col-md-4 ">
            <img
              src={props.image}
              className="img-contain img-contain-25"
              alt=""
            />
          </div>
          <div className="col">
            <div className="special-text">
              <div className="special-title cut-text cut-text-1-line">
                {props.name}
              </div>
              <div className="special-price">{props.price}</div>
              <div className="special-author">
                {t('Authors')}: {props.author}
              </div>
              {/* <a href="#" className="btn btn--rounded btn-fit btn--white">
                view detail
              </a> */}
              <Link to={`/book/${props.id}`} className="btn btn--rounded btn-fit btn--white">
              {t('View Detail')}</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialItemCard;
