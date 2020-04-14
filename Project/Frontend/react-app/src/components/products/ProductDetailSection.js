import React, { Component, useEffect, useState, useMemo } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";

class ProductDetailSection extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    const v = this;
    axios({
      method: "get",
      url: `http://localhost:5000/api/BookInfo/Book/${this.props.bookInfo}`,
    }).then(function (response) {
      console.log(response);
      v.setState({ data: response.data.obj });
    });
  }

  showDetail = (data) => {
    return (
      <section className="section__detail">
        <div className="container">
          <div className="row">
            <div className="col-md">
              <div className="row">
                <div className="col-md-5 mar-right-sm d-flex align-items-center">
                  {/*Carousel-slide*/}
                  <div className="container-fluid">
                    {/*Carousel Wrapper*/}
                    <div className="badge sale__badge">SALE</div>
                    <div
                      id="carousel-example-1z"
                      className="carousel slide carousel-slide pointer-event "
                      data-ride="carousel"
                      data-interval={0}
                    >
                      {/*Slides*/}
                      <div className="carousel-inner" role="listbox">
                        {/*First slide*/}
                        <div
                          className="carousel-item active cursor-zoom"
                          data-image={data.image}
                          data-toggle="zoom"
                          style={{ position: "relative", overflow: "hidden" }}
                        >
                          <div className="card">
                            <img
                              src={data.image}
                              className="card-img-top img-cover"
                              alt="..."
                            />
                          </div>
                          <img
                            role="presentation"
                            alt=""
                            src={data.image}
                            className="zoomImg"
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              opacity: 0,
                              width: "270px",
                              height: "380px",
                              border: "none",
                              maxWidth: "none",
                              maxHeight: "none",
                            }}
                          />
                        </div>
                        {/*/First slide*/}
                        {/*Second slide*/}
                        <div
                          className="carousel-item cursor-zoom"
                          data-image="img/img__product-1-front.webp"
                          data-toggle="zoom"
                        >
                          <div className="card">
                            <img
                              src="data/book6.webp"
                              className="card-img-top img-cover"
                              alt="..."
                            />
                          </div>
                        </div>
                        {/*/Second slide*/}
                        {/*Third slide*/}
                        <div
                          className="carousel-item cursor-zoom"
                          data-image="data/book6.webp"
                          data-toggle="zoom"
                          style={{ position: "relative", overflow: "hidden" }}
                        >
                          <div className="card">
                            <img
                              src="data/book6.webp"
                              className="card-img-top img-cover"
                              alt="..."
                            />
                          </div>
                          <img
                            role="presentation"
                            alt=""
                            src="data/book6.webp"
                            className="zoomImg"
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              opacity: 0,
                              width: "270px",
                              height: "380px",
                              border: "none",
                              maxWidth: "none",
                              maxHeight: "none",
                            }}
                          />
                        </div>
                        {/*/Third slide*/}
                        {/*Fourth slide*/}
                        <div
                          className="carousel-item cursor-zoom"
                          data-image="data/book6.webp"
                          data-toggle="zoom"
                          style={{ position: "relative", overflow: "hidden" }}
                        >
                          <div className="card">
                            <img
                              src="data/book6.webp"
                              className="card-img-top img-cover"
                              alt="..."
                            />
                          </div>
                          <img
                            role="presentation"
                            alt=""
                            src="data/book6.webp"
                            className="zoomImg"
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              opacity: 0,
                              width: "270px",
                              height: "380px",
                              border: "none",
                              maxWidth: "none",
                              maxHeight: "none",
                            }}
                          />
                        </div>
                        {/*/Fourth slide*/}
                      </div>
                      {/*/.Slides*/}
                      {/*Indicators*/}
                      <ol className="carousel-indicators carousel-indicators-dark">
                        <li
                          data-target="#carousel-example-1z"
                          data-slide-to={0}
                          className="active"
                          style={{ backgroundImage: 'url("data/book6.webp")' }}
                        ></li>
                        <li
                          data-target="#carousel-example-1z"
                          data-slide-to={1}
                          style={{ backgroundImage: 'url("data/book6.webp")' }}
                        />
                        <li
                          data-target="#carousel-example-1z"
                          data-slide-to={2}
                          style={{ backgroundImage: 'url("data/book6.webp")' }}
                        />
                        <li
                          data-target="#carousel-example-1z"
                          data-slide-to={3}
                          style={{ backgroundImage: 'url("data/book6.webp")' }}
                        />
                      </ol>
                      {/*/.Indicators*/}
                    </div>
                    {/*/.Carousel Wrapper*/}
                  </div>
                  {/*/Carousel-slide*/}
                </div>
                <div className="col-md">
                  <div className="title-wrapper">
                    <h3>{data.name}</h3>
                  </div>
                  <div className="special-author text-dark">{}</div>
                  <h2>
                    <NumberFormat
                      value={data.currentPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"VND "}
                    ></NumberFormat>
                  </h2>
                  <div className="detail__describe">{data.summary}</div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="quantity buttons_added d-flex flex-row mar-top-2">
                        <input
                          type="button"
                          defaultValue="-"
                          className="minus quantity__button"
                        />
                        <input
                          type="text"
                          step={1}
                          min={1}
                          max
                          name="quantity"
                          defaultValue={1}
                          title="Qty"
                          className="input-text qty text h-100"
                          size={4}
                          pattern
                          inputMode
                        />
                        <input
                          type="button"
                          defaultValue="+"
                          className="plus quantity__button"
                        />
                      </div>
                    </div>
                    <div className="col-md-5">
                      <a href="#" className="btn btn-fw btn--rounded btn--blue">
                        Add to cart
                      </a>
                    </div>
                  </div>
                  <div className="detail__link">
                    <a href="#">add to wishlish</a>
                    <a href="#">add to compare</a>
                  </div>
                  <div className="detail__social">
                    <a
                      href="#"
                      className="detail__social-icon detail__social-icon-twitter"
                    >
                      <i className="fab fa-twitter" />
                      twitter
                    </a>
                    <a
                      href="#"
                      className="detail__social-icon detail__social-icon-fb"
                    >
                      <i className="fab fa-facebook-f" />
                      facebook
                    </a>
                    <a
                      href="#"
                      className="detail__social-icon detail__social-icon-gg"
                    >
                      <i className="fab fa-google-plus-g" />
                      google +
                    </a>
                  </div>
                </div>
                <div className="product-table">
                  <table>
                    <tbody>
                      <tr className="title">
                        <td className="first">Book Title</td>
                        <td>{data.name}</td>
                      </tr>
                      <tr className="author">
                        <td className="first">Author</td>
                        <td>{}</td>
                      </tr>
                      <tr className="type">
                        <td className="first">Type</td>
                        <td>Classic</td>
                      </tr>
                      <tr className="title">
                        <td className="first">Date published</td>
                        <td> Mar 13, 2017</td>
                      </tr>
                      <tr className="provider">
                        <td className="first">Provider</td>
                        <td>Harper Collins</td>
                      </tr>
                      <tr className="publisher">
                        <td className="first">Publisher</td>
                        <td>William Morrow</td>
                      </tr>
                      <tr className="weight">
                        <td className="first">Weight</td>
                        <td>William Morrow</td>
                      </tr>
                      <tr className="Size">
                        <td className="first">Size</td>
                        <td>19.1 x 4.5 x 10.6</td>
                      </tr>
                      <tr className="Pages">
                        <td className="first">Number of pages</td>
                        <td>784</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container-fluid d-flex pad-0-0 mar-top-md">
                  <ul className="nav nav-tabs nav-tabs-table" id="active-exp">
                    <li className="nav-tab-item active">
                      <a data-toggle="tab" href="#home">
                        Description
                      </a>
                    </li>
                    <li className="nav-tab-item">
                      <a data-toggle="tab" href="#menu1">
                        Specifications
                      </a>
                    </li>
                    <li className="nav-tab-item">
                      <a data-toggle="tab" href="#menu2">
                        Video
                      </a>
                    </li>
                    <li className="nav-tab-item">
                      <a data-toggle="tab" href="#menu3">
                        Review
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content tab-detail">
                    <div id="home" className="tab-pane fade in active show">
                      <div className="detail__describe mar-0-0">
                        Our new{" "}
                        <p className="font-weight-bold d-inline">
                          HPB12 / A12 battery
                        </p>{" "}
                        is rated at 2000mAh and designed to power up Black and
                        Decker / FireStorm line of 12V tools allowing users to
                        run multiple devices off the same battery pack. The
                        HPB12 is compatible with the following Black and Decker
                        power tool models
                      </div>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <ul>
                        <li>Chemistry: Ni-CD</li>
                        <li>Voltage: 12V</li>
                        <li>AmpHours: 2000mAh</li>
                        <li>Dimensions: 109.75x79.55x62.20mm</li>
                      </ul>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                      <p>
                        <iframe
                          src="//www.youtube.com/embed/QZd7015XaTQ"
                          height={350}
                          width="100%"
                        ></iframe>
                      </p>
                    </div>
                    <div id="menu3" className="tab-pane fade">
                      <h3>Menu 3</h3>
                      <p>
                        Eaque ipsa quae ab illo inventore veritatis et quasi
                        architecto beatae vitae dicta sunt explicabo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  render() {
    return <div>{this.showDetail(this.state.data)}</div>;
  }
}

export default ProductDetailSection;

// const Index = (props) => {
//   const { bookInfo } = props;
//   const [data, setData] = useState(null);
//   //   console.log(bookInfo);

//   useEffect(() => {
//     axios({
//       method: "get",
//       url: `http://localhost:5000/api/BookInfo/Book/${bookInfo}`,
//     }).then(function (response) {
//       setData(response.data.obj);
//     });
//   }, [bookInfo]);
//   return <div></div>;
// };

// export default Index;
