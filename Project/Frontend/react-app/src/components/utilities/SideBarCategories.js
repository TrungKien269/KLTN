import React, { Component, Fragment } from "react";

class SideBarCategories extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar-block">
          <h2>Categories</h2>
          <ul className="list-unstyled sidebar-list sidebar-category">
            <li>
              <a href="#" className="pad-0-0">
                Art &amp; Photography
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Biographies &amp; Memoirs
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Children's Books
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Cookbook. Food &amp; Wine
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                History
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Literature &amp; Fiction
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Mystery &amp; Suspense
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Romance
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Sci-Fi &amp; Fantasy
              </a>
            </li>
            <li>
              <a href="#" className="pad-0-0">
                Teen &amp; Young Adult
              </a>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default SideBarCategories;
