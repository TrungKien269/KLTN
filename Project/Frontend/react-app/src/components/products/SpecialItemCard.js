import React, { Component } from "react";

class SpecialItemCard extends Component {
  render() {
    return (
      <div className="special-item">
        <div
          className="special-wrapper"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.6113795860140931) 46%, rgba(0,0,0,0.05675773727459732) 100%),url(" +
              this.props.image +
              ")",
          }}
        >
          <div className="row">
            <div className="col-md-4 ">
              <img
                src={this.props.image}
                className="img-contain img-contain-25"
                alt=""
              />
            </div>
            <div className="col">
              <div className="special-text">
                <div className="special-title cut-text cut-text-1-line">
                  {this.props.name}
                </div>
                <div className="special-price">{this.props.price}</div>
                <div className="special-author">
                  Author: {this.props.author}
                </div>
                <a href="#" className="btn btn--rounded btn-fit btn--white">
                  view detail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpecialItemCard;
