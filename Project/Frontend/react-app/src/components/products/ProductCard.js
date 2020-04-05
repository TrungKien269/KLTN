import React from "react";

function ProductCard() {
  return (
    <React.Fragment>
      <div className="card display-on-hover">
        <a href="#">
          <img
            className="card-img-top"
            src="data/book1.webp"
            alt="Card image cap"
          />
        </a>
        <div className="card-body">
          <a href="#">
            <h5 className="card__book-title">Product example #1</h5>
            <p className="card__book-price">$120.00</p>
            <div
              id="rating"
              className="rating__section mar-0-0 w-100 align-items-center"
            >
              <div className="star__rating" id="rating" data-value-star={4}>
                <input type="radio" name="rating" defaultValue={5} />
                <label className="full" title="Awesome - 5 stars" />
                <input type="radio" name="rating" defaultValue={4} />
                <label className="full" title="Pretty good - 4 stars" />
                <input type="radio" name="rating" defaultValue={3} />
                <label className="full" title="Meh - 3 stars" />
                <input type="radio" name="rating" defaultValue={2} />
                <label className="full" title="Kinda bad - 2 stars" />
                <input type="radio" name="rating" defaultValue={1} />
                <label className="full" title="Sucks big time - 1 star" />
              </div>
            </div>
          </a>
          <a
            href="#"
            className="btn btn--rounded btn-fw btn--blue item-display"
          >
            Add to cart
          </a>
        </div>
        <div className="badge badge__utilities item-display">
          <a href="#" className="badge__utilities-blue">
            <i className="fas fa-heart" />
          </a>
          <a
            href="#"
            className="badge__utilities-blue"
            data-toggle="modal"
            data-target="#modalQuickview"
          >
            <i className="fas fa-search" />
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductCard;
