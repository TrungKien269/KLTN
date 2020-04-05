import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-shadow justify-content-between">
        <div className="container">
          <Link to="/" className="navbar-sm-brand">
            <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" />
          </Link>
          <div className="input__search-bar">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search" />
          </div>
          <div className="hidden-md-elements nav__social-icon">
            <a
              href="#"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Wish list"
            >
              <i className="far fa-heart" />
            </a>
            <div className="dropdown">
              <a href="/cart.html">
                <i className="fas fa-shopping-cart" />
              </a>
            </div>
            <a href="/login.html">
              <i className="far fa-user" />
            </a>
          </div>
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
            {/* Books */}
            <li className="nav-item dropdown mega-dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink2"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Books
                <span className="sr-only">(current)</span>
                <i className="fa fa-angle-down hidden-xs" />
              </a>
              <div
                className="dropdown-menu mega-menu"
                aria-labelledby="navbarDropdownMenuLink2"
              >
                <div className="row">
                  <div className="col-md-3">
                    <h2>Collections</h2>
                    <div className="card">
                      <a href="/collections.html">
                        <img
                          className="card-img-top"
                          src="data/book8.webp"
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card__book-title">
                            Product example #2
                          </h5>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h2>Products</h2>
                    <div className="card">
                      <a href="/detail.html">
                        <img
                          className="card-img-top"
                          src="data/book2.webp"
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card__book-title">
                            Product example #2
                          </h5>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h2>Bestseller</h2>
                    <div className="card">
                      <a href="/detail.html">
                        <img
                          className="card-img-top"
                          src="data/book12.webp"
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card__book-title">
                            Product example #2
                          </h5>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <h2>Clearance Sale</h2>
                    <div className="card">
                      <a href="/detail.html">
                        <img
                          className="card-img-top"
                          src="data/book11.webp"
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card__book-title">
                            Product example #2
                          </h5>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* Magazine */}
            <li className="nav-item mega-dropdown">
              <a href="/news.html" className="nav-link dropdown-toggle">
                Magazines
              </a>
            </li>
            {/* Textbooks */}
            <li className="nav-item dropdown mega-dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink3"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Textbooks
                <i className="fa fa-angle-down hidden-xs" />
              </a>
              <div
                className="dropdown-menu mega-menu"
                aria-labelledby="navbarDropdownMenuLink3"
              >
                <div className="row">
                  <div className="col-md-3">
                    <h3>All Genre</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <h3>All Genre</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a
                          href="/collections/productX.html"
                          className="pad-0-0"
                        >
                          Art &amp; Photography
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <h3>All Genre</h3>
                    <ul className="list-unstyled">
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                      <li>
                        <a href="#" className="pad-0-0">
                          Art &amp; Photography
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-3">
                    <h3>Banner image</h3>
                    <img src="data/book7.webp" className="img-cover" alt="" />
                  </div>
                </div>
              </div>
            </li>
            {/* Audio book */}
            <li className="nav-item mega-dropdown">
              <a
                href="/collections/productX.html"
                className="nav-link dropdown-toggle"
              >
                Audio books
              </a>
            </li>
            {/* recommended */}
            <li className="nav-item mega-dropdown">
              <a
                href="/collections/productX.html"
                className="nav-link dropdown-toggle"
              >
                Recommended
              </a>
            </li>
            {/* Sale */}
            <li className="nav-item mega-dropdown">
              <a href="#" className="nav-link dropdown-toggle">
                Sale
              </a>
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
                      <a href="/contact.html">Contact us</a>
                    </li>
                    <li>
                      <a href="/about.html">About</a>
                    </li>
                    <li>
                      <a href="/authors.html">Author</a>
                    </li>
                    <li>
                      <a href="#">Limited Offer Time</a>
                    </li>
                    <li>
                      <a href="#">FAQs</a>
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

export default Header;
