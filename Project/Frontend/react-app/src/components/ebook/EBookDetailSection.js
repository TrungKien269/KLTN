import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useTranslation } from "react-i18next";

function EBookDetailSection(props) {
  const [data, setData] = useState(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios({
      method: "get",
      url: "http://localhost:5000/api/EBook/GetEBook/",
      params: {
        id: props.bookInfo
      }
    }).then((res) => {
      if (res.data.status) {
        setData(res.data.obj);
      }
    });
  }, []);

  const ShowDetail = (data) => {
    if (data) {
      if (data.authors === "") {
        return (
          <section className="section__detail">
            <div className="container">
              <div className="row">
                <div className="col-md">
                </div>
                <div className="col-md-10">
                  <div className="row">
                    <div className="col-md-5 mar-right-sm d-flex align-items-center">
                      <img src={data.image}></img>
                    </div>
                    <div className="col-md">
                      <div className="title-wrapper">
                        <h3>{data.name}</h3>
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <Link to={`/ebook/read/${data.id}`}
                            className="btn btn-fw btn--rounded btn--blue">
                            {t("Read")}
                          </Link>
                        </div>
                      </div>
                    </div>



                    <div className="product-table">
                      <table>
                        <tbody>
                          <tr className="title">
                            <td className="first">{t("Title")}</td>
                            <td>{data.name}</td>
                          </tr>
                          <tr className="type">
                            <td className="first">{t("Category")}</td>
                            <td>
                              {data.category}
                            </td>
                          </tr>
                          <tr className="title">
                            <td className="first">{t("Released Year")}</td>
                            <td>{data.releaseYear}</td>
                          </tr>
                          <tr className="weight">
                            <td className="first">{t("Size")}</td>
                            <td>{data.size} MB</td>
                          </tr>
                          <tr className="Pages">
                            <td className="first">{t("Number of pages")}</td>
                            <td>{data.numOfPage}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }
      else {
        return (
          <section className="section__detail">
            <div className="container">
              <div className="row">
                <div className="col-md">
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-5 mar-right-sm d-flex align-items-center">
                      <img src={data.image}></img>
                    </div>
                    <div className="col-md">
                      <div className="title-wrapper">
                        <h3>{data.name}</h3>
                      </div>
                      <div className="special-author text-dark">
                        {t('Authors')}: {data.authors}
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <Link to={`read/${data.id}`}
                            className="btn btn-fw btn--rounded btn--blue">
                            {t("Read")}
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="product-table">
                      <table>
                        <tbody>
                          <tr className="title">
                            <td className="first">{t("Title")}</td>
                            <td>{data.name}</td>
                          </tr>
                          <tr className="author">
                            <td className="first">{t("Authors")}</td>
                            <td>{data.authors}</td>
                          </tr>
                          <tr className="type">
                            <td className="first">{t("Category")}</td>
                            <td>
                              {data.category}
                            </td>
                          </tr>
                          <tr className="title">
                            <td className="first">{t("Released Year")}</td>
                            <td>{data.releaseYear}</td>
                          </tr>
                          <tr className="weight">
                            <td className="first">{t("Size")}</td>
                            <td>{data.size} MB</td>
                          </tr>
                          <tr className="Pages">
                            <td className="first">{t("Number of pages")}</td>
                            <td>{data.numOfPage}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }
    }
  }

  return (
    <React.Fragment>{ShowDetail(data)}</React.Fragment>
  );
}

export default EBookDetailSection
