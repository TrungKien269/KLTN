import React, {
  Component,
  useMemo,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, withRouter } from "react-router-dom";
import GetCategories from "../utilities/GetCategories";
import SearchBar from "../utilities/SearchBar";
import { removeUserSession, getToken } from "../../Utils/Commons";
import { UserContext } from "../../context/userContext";

function Header(props) {
  // const { user, refreshUser } = useContext(UserContext);
  const { token, refreshToken } = useContext(UserContext);

  const handleLogout = () => {
    removeUserSession();
    // refreshUser();
    refreshToken();
    props.history.push("/");
  };

  const loginNav = useMemo(() => {
    if (token) {
      // if (user) {
      return (
        <div className="hidden-md-elements nav__social-icon">
          <div>
            <Link
              to="/wishlist"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Wish list"
            >
              <i className="fas fa-heart"></i>
            </Link>
          </div>

          <div className="dropdown">
            <Link to="/cart">
              <i className="fas fa-shopping-cart" />
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
              <i className="far fa-user" />
            </a>
            <div
              className="dropdown-menu mega-menu mega-menu-sm "
              aria-labelledby="navbarDropdownMenuLink4"
            >
              <div className="row">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderstatus">Your Orders</Link>
                  </li>
                  {/*<li>
                    <Link to="#">Limited Offer Time</Link>
                  </li>
                  <li>
                    <Link to="#">FAQs</Link>
                  </li>*/}
                  <li>
                    <a onClick={handleLogout}>Log out</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="hidden-md-elements nav__social-icon">
          <Link to="/login">
            <i className="fas fa-sign-in-alt"></i>
          </Link>
        </div>
      );
    }
  }, [token]);

  return (
    <React.Fragment>
      <nav className="navbar navbar-shadow justify-content-between">
        <div className="container">
          <Link to="/" className="navbar-sm-brand">
            <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
          </Link>
          <SearchBar />

          {loginNav}
        </div>
      </nav>
      <nav className="navbar navbar-pad-sm navbar-expand-lg bg-light hidden-lg-elements">
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
          <span className="navbar-toggler-icon" />
        </button>
        {/* Collapsible content */}
        <div
          className="collapse navbar-collapse d-flex justify-content-center"
          id="navbarSupportedContent2"
        >
          {/* Links */}
          <ul className="navbar-nav">
            {/* Magazine */}
            <li className="nav-item mega-dropdown">
              <Link to="/news.html" className="nav-link dropdown-toggle">
                Magazines
              </Link>
            </li>
            {/* Textbooks */}
            <li className="nav-item dropdown mega-dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink3"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
                <i className="fa fa-angle-down hidden-xs" />
              </Link>
              <div
                className="dropdown-menu mega-menu"
                aria-labelledby="navbarDropdownMenuLink3"
              >
                <div className="row">
                  <GetCategories />
                </div>
              </div>
            </li>
            {/* Audio book */}
            <li className="nav-item mega-dropdown">
              <Link
                to="/collections/productX.html"
                className="nav-link dropdown-toggle"
              >
                Audio books
              </Link>
            </li>
            {/* recommended */}
            <li className="nav-item mega-dropdown">
              <Link
                to="/collections/productX.html"
                className="nav-link dropdown-toggle"
              >
                Recommended
              </Link>
            </li>
            {/* Sale */}
            <li className="nav-item mega-dropdown">
              <Link to="#" className="nav-link dropdown-toggle">
                Sale
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
}

export default withRouter(Header);
