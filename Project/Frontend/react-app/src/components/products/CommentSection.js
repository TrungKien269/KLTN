import React from "react";

const CommentSection = () => {
  return (
    <div className="container">
      <div className="section__list-cmt">
        <div className="d-flex justify-content-between">
          <h4>Comments</h4>
          <a href="#write-comment">Write your comment</a>
        </div>
        {/* comment card */}
        <ul className="nav nav-pills nav__tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#active"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Đang hoạt động
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#oldest"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Cũ nhất
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="contact-tab"
              data-toggle="tab"
              href="#votes"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Có lượt bình chọn cao
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          {/* Active tab */}
          <div
            className="tab-pane fade show active"
            id="active"
            role="tabpanel"
            aria-labelledby="active-tab"
          >
            {/* Comment block */}
            <div className="cmt__group">
              <div className="cmt__card">
                <div className="d-flex">
                  <div className="vote" id="vote-container">
                    <button className="button up" id="up">
                      <i className="fas fa-angle-up" />
                    </button>
                    <p className="vote" id="votecount">
                      0
                    </p>
                    <button className="button down" id="down">
                      <i className="fas fa-angle-down" />
                    </button>
                  </div>
                  <div className="cmt__block">
                    <div className="user__infor">
                      <div className="d-flex">
                        <div className="ava__block">
                          <img
                            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                            className="img__sm-ava"
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="user__sm-name">
                            Anonymous
                          </a>
                          <p className="xsm__text">3 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni necessitatibus beatae facere quam aspernatur,
                      quaerat alias vero iure quas saepe cupiditate aliquam,
                      ipsam totam? Ipsam dignissimos culpa debitis optio
                      delectus?
                    </p>
                    <div className="cmt__img-list">
                      <a data-fancybox="image" className="img__click">
                        <img
                          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                          className="img"
                        />
                      </a>
                    </div>
                    <div className="d-flex cmt__interact">
                      <button>
                        <i className="fas fa-share-square" />1
                      </button>
                      <button id="show-reply" className="show-reply">
                        <i className="fas fa-comment-alt" />2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reply" className="reply__group">
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <form action="submit" />
                <div className="input__reply">
                  <div className="ava__block">
                    <img
                      src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      className="img__sm-ava"
                      alt=""
                    />
                  </div>
                  <input type="text" placeholder="Write your reply" />
                </div>
              </div>
            </div>
          </div>
          {/* /Active tab */}
          {/* Oldest tab */}
          <div
            className="tab-pane fade"
            id="oldest"
            role="tabpanel"
            aria-labelledby="oldest-tab"
          >
            {/* Comment block */}
            <div className="cmt__group">
              <div className="cmt__card">
                <div className="d-flex">
                  <div className="vote" id="vote-container">
                    <button className="button plus" id="plus">
                      <i className="fas fa-angle-up" />
                    </button>
                    <p className="count" id="count">
                      0
                    </p>
                    <button className="button minus" id="minus">
                      <i className="fas fa-angle-down" />
                    </button>
                  </div>
                  <div className="cmt__block">
                    <div className="user__infor">
                      <div className="d-flex">
                        <div className="ava__block">
                          <img
                            src="data/diego-ph-fIq0tET6llw-unsplash.jpg"
                            className="img__sm-ava"
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="user__sm-name">
                            Anonymous
                          </a>
                          <p className="xsm__text">3 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni necessitatibus beatae facere quam aspernatur,
                      quaerat alias vero iure quas saepe cupiditate aliquam,
                      ipsam totam? Ipsam dignissimos culpa debitis optio
                      delectus?
                    </p>
                    <div className="cmt__img-list">
                      <a
                        data-fancybox="image"
                        href="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                        className="img__click"
                      >
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img"
                        />
                      </a>
                    </div>
                    <div className="d-flex cmt__interact">
                      <button>
                        <i className="fas fa-share-square" />1
                      </button>
                      <button id="show-reply" className="show-reply">
                        <i className="fas fa-comment-alt" />2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reply" className="reply__group">
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <form action="submit" />
                <div className="input__reply">
                  <div className="ava__block">
                    <img
                      src="data/IMG_20191221_185302.jpg"
                      className="img__sm-ava"
                      alt=""
                    />
                  </div>
                  <input type="text" placeholder="Write your reply" />
                </div>
              </div>
            </div>
            {/* Comment block */}
            <div className="cmt__group">
              <div className="cmt__card">
                <div className="d-flex">
                  <div className="vote" id="vote-container">
                    <button className="button plus" id="plus">
                      <i className="fas fa-angle-up" />
                    </button>
                    <p className="count" id="count">
                      0
                    </p>
                    <button className="button minus" id="minus">
                      <i className="fas fa-angle-down" />
                    </button>
                  </div>
                  <div className="cmt__block">
                    <div className="user__infor">
                      <div className="d-flex">
                        <div className="ava__block">
                          <img
                            src="data/diego-ph-fIq0tET6llw-unsplash.jpg"
                            className="img__sm-ava"
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="user__sm-name">
                            Anonymous
                          </a>
                          <p className="xsm__text">3 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni necessitatibus beatae facere quam aspernatur,
                      quaerat alias vero iure quas saepe cupiditate aliquam,
                      ipsam totam? Ipsam dignissimos culpa debitis optio
                      delectus?
                    </p>
                    <div className="cmt__img-list">
                      <a
                        data-fancybox="image"
                        href="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                        className="img__click"
                      >
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img"
                        />
                      </a>
                    </div>
                    <div className="d-flex cmt__interact">
                      <button>
                        <i className="fas fa-share-square" />1
                      </button>
                      <button id="show-reply" className="show-reply">
                        <i className="fas fa-comment-alt" />2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reply" className="reply__group">
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <form action="submit" />
                <div className="input__reply">
                  <div className="ava__block">
                    <img
                      src="data/IMG_20191221_185302.jpg"
                      className="img__sm-ava"
                      alt=""
                    />
                  </div>
                  <input type="text" placeholder="Write your reply" />
                </div>
              </div>
            </div>
          </div>
          {/* /Oldes tab */}
          {/* Votes tab */}
          <div
            className="tab-pane fade"
            id="votes"
            role="tabpanel"
            aria-labelledby="votes-tab"
          >
            {/* Comment block */}
            <div className="cmt__group">
              <div className="cmt__card">
                <div className="d-flex">
                  <div className="vote" id="vote-container">
                    <button className="button plus" id="plus">
                      <i className="fas fa-angle-up" />
                    </button>
                    <p className="count" id="count">
                      0
                    </p>
                    <button className="button minus" id="minus">
                      <i className="fas fa-angle-down" />
                    </button>
                  </div>
                  <div className="cmt__block">
                    <div className="user__infor">
                      <div className="d-flex">
                        <div className="ava__block">
                          <img
                            src="data/diego-ph-fIq0tET6llw-unsplash.jpg"
                            className="img__sm-ava"
                            alt=""
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a href="#" className="user__sm-name">
                            Anonymous
                          </a>
                          <p className="xsm__text">3 mins ago</p>
                        </div>
                      </div>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Magni necessitatibus beatae facere quam aspernatur,
                      quaerat alias vero iure quas saepe cupiditate aliquam,
                      ipsam totam? Ipsam dignissimos culpa debitis optio
                      delectus?
                    </p>
                    <div className="cmt__img-list">
                      <a
                        data-fancybox="image"
                        href="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                        className="img__click"
                      >
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img"
                        />
                      </a>
                    </div>
                    <div className="d-flex cmt__interact">
                      <button>
                        <i className="fas fa-share-square" />1
                      </button>
                      <button id="show-reply" className="show-reply">
                        <i className="fas fa-comment-alt" />2
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="reply" className="reply__group">
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <div className="reply__card">
                  <div className="user__infor">
                    <div className="d-flex">
                      <div className="ava__block">
                        <img
                          src="data/campaign-creators-yktK2qaiVHI-unsplash.jpg"
                          className="img__sm-ava"
                          alt=""
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a href="#" className="user__sm-name">
                          Anonymous_1
                        </a>
                        <p className="xsm__text">3 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni necessitatibus beatae facere quam aspernatur, quaerat
                    alias vero iure quas saepe cupiditate aliquam, ipsam totam?
                    Ipsam dignissimos culpa debitis optio delectus?
                  </p>
                  <div className="d-flex cmt__interact">
                    <button>Like</button>
                    <button>Reply</button>
                  </div>
                </div>
                <form action="submit" />
                <div className="input__reply">
                  <div className="ava__block">
                    <img
                      src="data/IMG_20191221_185302.jpg"
                      className="img__sm-ava"
                      alt=""
                    />
                  </div>
                  <input type="text" placeholder="Write your reply" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
