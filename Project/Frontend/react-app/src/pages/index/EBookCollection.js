import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import SideBarEBookCategories from '../../components/ebook/SideBarEBookCategories';
import ListEBooks from '../../components/ebook/ListEBooks';
import { useTranslation } from 'react-i18next';

function EBookCollection(props) {

    // const [category, setCategory] = useState(null);
    const { category = "" } = props.match.params;

    const { t, i18n } = useTranslation();

    return (
        <React.Fragment>
      <section className="section__product-list">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <SideBarEBookCategories />
            </div>
            <div className="col-md">
              <div className="title-wrapper">
                <h1>{category !== "" ? t(category) : t('All Products')}</h1>
              </div>
              <div className="col-xd-6">
                
              </div>
              <div className="row">
                <ListEBooks category={category} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
    )
}

export default withRouter(EBookCollection)
