import React, { useMemo, useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import GetCategories from "../utilities/GetCategories";
import SearchBar from "../utilities/SearchBar";
import { removeUserSession, getToken } from "../../Utils/Commons";
import { UserContext } from "../../context/userContext";
import Axios from "axios";
import useDarkMode from "use-dark-mode";
import { Trans, useTranslation } from "react-i18next";

const Header = (props) => {
  const { token, refreshToken } = useContext(UserContext);
  const [user, setUser] = useState();

  const darkMode = useDarkMode(false);

  const { t, i18n } = useTranslation();
  // const { t, changeLanguage } = useContext(I18nContext);

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    // changeLanguage(lang);
  };

  const handleLogout = () => {
    removeUserSession();
    refreshToken();
    props.history.push("/");
  };

  useEffect(() => {
    if (token) {
      Axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "get",
        url: "http://localhost:5000/api/UserProfile/Profile",
      }).then((res) => {
        setUser(res.data.obj);
      });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      Axios({
        headers: {
          Authorization: "Bearer " + getToken(),
        },
        method: "get",
        url: "http://localhost:5000/api/UserProfile/Profile",
      }).then((res) => {
        setUser(res.data.obj);
      });
    }
  }, [token]);

  const ScrollToRecommendSection = () => {
    if (token) {
      var i = 10;
      var int = setInterval(function () {
        window.scrollTo({ top: i, left: 0, behavior: "smooth" });
        i += 10;
        if (i >= 1380) clearInterval(int);
      }, 5);
    } else {
      var i = 10;
      var int = setInterval(function () {
        window.scrollTo({ top: i, left: 0, behavior: "smooth" });
        i += 10;
        if (i >= 1440) clearInterval(int);
      }, 5);
    }
  };

  const loginNav = useMemo(() => {
    if (token) {
      return (
        <Trans i18nKey="user">
          <div className="d-flex flex-row align-items-center">
            <div>
              <Link
                to="/wishlist"
                data-toggle="tooltip"
                data-placement="bottom"
                title={"Wish list"}
              >
                <i className="fab fa-gratipay"></i>
              </Link>
            </div>

            <div className="dropdown">
              <Link
                to="/cart"
                data-toggle="tooltip"
                data-placement="bottom"
                title={"Cart"}
              >
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </div>

            <div className="dropdown ">
              <a
                className=""
                id="navbarDropdownMenuLink4"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user__ava-signin d-flex align-items-center">
                  <div className="d-flex flex-nowrap">
                    {user && user.fullName}
                  </div>
                  <span className="header-avatar">
                    <img
                      className="img img-cover"
                      src="../img/19-512.png"
                      title={user && user.fullName}
                    />
                  </span>
                </div>
              </a>
              <div
                className="dropdown-menu mega-menu mega-menu-sm "
                aria-labelledby="navbarDropdownMenuLink4"
              >
                <div className="row">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/profile">{"Profile"}</Link>
                    </li>
                    <li>
                      <Link to="/orderstatus">{"Your Orders"}</Link>
                    </li>
                    <li>
                      <a onClick={handleLogout}>{"Log out"}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Trans>
      );
    } else {
      return (
        <Trans i18nKey="visitor">
          <React.Fragment>
            <Link
              to="/login"
              data-toggle="tooltip"
              data-placement="bottom"
              title={"Log in"}
            >
              <i className="fas fa-sign-in-alt"></i>
            </Link>
            <div></div>
          </React.Fragment>
        </Trans>
      );
    }
  }, [token, user]);

  return (
    <React.Fragment>
      <nav className="navbar navbar-shadow">
        <div className="container-fluid d-flex flex-row justify-content-around flex-md-nowrap">
          <Link to="/" className="navbar-sm-brand">
            <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
          </Link>
          <SearchBar />
          <div className="hidden-md-elements nav__social-icon">
            <div className="dropdown ">
              <a
                className=""
                id="navbarDropdownMenuLink2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                title={"Language"}
              >
                <i className="fa fa-language"></i>
              </a>
              <div
                className="dropdown-menu mega-menu mega-menu-sm "
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <div className="row">
                  <ul className="list-unstyled">
                    <li>
                      <a onClick={() => handleClick("en")}>{t("English")}</a>
                    </li>
                    <li>
                      <a onClick={() => handleClick("vn")}>{t("Vietnamese")}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dropdown ">
              <a
                className=""
                id="navbarDropdownMenuLink1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                title={"Theme"}
              >
                <i className="fa fa-palette"></i>
              </a>
              <div
                className="dropdown-menu mega-menu mega-menu-sm "
                aria-labelledby="navbarDropdownMenuLink1"
              >
                <div className="row">
                  <ul className="list-unstyled">
                    <li>
                      <a onClick={darkMode.disable}>{t("Light")}</a>
                    </li>
                    <li>
                      <a onClick={darkMode.enable}>{t("Dark")}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <>{loginNav}</>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-pad-sm bg-light">
        {/* Collapse button */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent2"
          aria-controls="navbarSupportedContent2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon d-flex align-items-center">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        {/* Collapsible content */}
        <div
          className="collapse navbar-collapse d-lg-flex justify-content-md-center"
          id="navbarSupportedContent2"
        >
          {/* Links */}
          <ul className="navbar-nav">
            {/* Textbooks */}
            <li className="nav-item dropdown mega-dropdown active">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
                <span className="sr-only">(current)</span>
              </a>
              <div
                className="dropdown-menu mega-menu v-2 z-depth-1  py-5 px-3 text-center"
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <div className="row">
                  <GetCategories />
                </div>
              </div>
            </li>
            {/* Audio book */}
            <li className="nav-item mega-dropdown">
              <Link to="/ebooks/" className="nav-link dropdown-toggle">
                {t("Ebooks")}
              </Link>
            </li>
            {/* recommended */}
            <li className="nav-item mega-dropdown">
              <a
                className="nav-link dropdown-toggle"
                onClick={ScrollToRecommendSection}
              >
                {t("Recommend")}
              </a>
            </li>
            {/* Sale */}
            <li className="nav-item mega-dropdown">
              <Link to="#" className="nav-link dropdown-toggle">
                {t("Sale")}
              </Link>
            </li>
            {/*Pages*/}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink4"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Pages
                <i className="fa fa-angle-down hidden-xs" />
              </a>
              <div
                className="dropdown-menu mega-menu mega-menu-sm "
                aria-labelledby="navbarDropdownMenuLink4"
              >
                <div className="row">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/contact.html">Contact us</Link>
                    </li>
                    <li>
                      <Link to="/about.html">About</Link>
                    </li>
                    <li>
                      <Link to="/authors.html">Author</Link>
                    </li>
                    <li>
                      <Link to="#">Limited Offer Time</Link>
                    </li>
                    <li>
                      <Link to="#">FAQs</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
          {/* Links */}
        </div>
        {/* Collapsible content */}
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Header);
