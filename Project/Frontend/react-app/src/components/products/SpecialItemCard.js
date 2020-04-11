import React from "react";

function SpecialItemCard() {
  return (
    <div className="special-item">
      <div
        className="special-wrapper"
        style={{ background: 'url("img/orange-bg.webp")' }}
      >
        <div className="row">
          <div className="col-sm-3 special-img">
            <img
              src="data/special-book-2.webp"
              className="img-contain"
              alt=""
            />
          </div>
          <div className="col">
            <div className="special-text">
              <div className="special-title cut-text cut-text-1-line">
                Children of the god - Uprising
              </div>
              <div className="special-price">$120.00</div>
              <div className="special-author">Author: Jessica therrien</div>
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

export default SpecialItemCard;
