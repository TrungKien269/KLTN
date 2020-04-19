import React, { Component, useState, useMemo, useEffect } from "react";
import Axios from "axios";
import { getToken, setUserSession } from "../../Utils/Commons";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

const OrderStatus = () => {
  const [processingOrder, setProcessingOrder] = useState("");
  const [deliveringOrder, setDelivering] = useState("");
  const [deliveredOrder, setDelivered] = useState("");
  const [cancelledOrder, setCancelledOrder] = useState([]);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListProcessing"
    }).then(res => {
      if (res) {
        setProcessingOrder(res.data.obj);
      }
    });
  }, []);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListDelivery"
    }).then(res => {
      if (res) {
        setDelivering(res.data.obj);
      }
    });
  }, []);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListDelivered"
    }).then(res => {
      if (res.status) {
        setDelivered(res.data.obj);
      }
    });
  }, []);
  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken()
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListCanceled"
    }).then(res => {
      if (res.status) {
        setCancelledOrder(res.data.obj);
      }
    });
  }, []);

  const handleCancel = orderId => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action can't be reversed. Your order will be canceled!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if(result.value){
        let order = processingOrder.find(x => x.id == orderId);
        console.log(order)
        setProcessingOrder(processingOrder.filter(x => x.id != orderId));
        let newArr = [...cancelledOrder];
        newArr.unshift(order);
        setCancelledOrder(newArr);

        Axios({
          headers: {
            Authorization: "Bearer " + getToken()
          },
          method: "post",
          url: "http://localhost:5000/api/UserOrder/CancelOrder",
          params: {
            id: orderId
          }
        }).then(res => {
          if (res.data.status) {
            Swal.fire({
              title: "Done",
              text: "Your order was canceled completely",
              icon: "success",
            });
          }
          else{
            Swal.fire({
              title: "Error",
              text: res.data.message,
              icon: "error",
            });
          }
        }).catch((err) => {
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
          });
        });
      }
    });
  };

  const listOrderProcessing = useMemo(() => {
    let orderItem = [];
    let orderBlock = [];
    if (processingOrder && processingOrder.length > 0) {
      orderBlock = processingOrder.map(order => {
        let x = order.orderDetail;
        orderItem = x.map(item => {
          return (
            <tr>
              <td className="item-name">
                <div className="item-img">
                  <a href="#">
                    <img
                      src={item.book.image}
                      className="img-contain img-cover-10"
                      alt=""
                    />
                  </a>
                </div>
                <div className="item-title">
                  <a href="#">{item.book.name}</a>
                </div>
              </td>
              <td className="item-qty">
                <div className="quantity buttons_added d-flex justify-content-center">
                  <input
                    type="text"
                    step={1}
                    min={1}
                    max
                    name="quantity"
                    defaultValue={item.quantity}
                    title="Qty"
                    className="input-text qty text h-100"
                    size={4}
                    pattern
                    inputMode
                    disabled
                  />
                </div>
              </td>
              <td className="item-price">
                <p>
                  {
                    <NumberFormat
                      displayType="text"
                      value={item.book.originalPrice}
                      thousandSeparator={true}
                      prefix="VND "
                    ></NumberFormat>
                  }
                </p>
              </td>
              <td className="item-total">
                <p>
                  <NumberFormat
                    displayType="text"
                    value={item.book.originalPrice * item.quantity}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                </p>
              </td>
              <td className="action"></td>
            </tr>
          );
        });
        return (
          <div className="order-block">
            <button
              onClick={e => {
                handleCancel(order.id);
              }}
            >
              Cancel Order
            </button>
            <div className="title-wrapper">
              <h2>Date: {order.createdDate.slice(0, 10)}</h2>
              <h2>
                Total:{" "}
                {
                  <NumberFormat
                    displayType="text"
                    value={order.total}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                }
              </h2>
              <p>Amount: {order.orderDetail.length} items</p>
            </div>
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="item">Items</th>
                    <th className="qty">Qty</th>
                    <th className="price">Price</th>
                    <th className="total-price">Total</th>
                    <th className="remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{orderItem}</tbody>
              </table>
            </div>
          </div>
        );
      });
    } else {
      orderBlock.push(<h2>Nothing here</h2>);
    }
    return orderBlock;
  }, [processingOrder]);

  const listOrderDelivering = useMemo(() => {
    let orderItem = [];
    let orderBlock = [];
    if (deliveringOrder && deliveringOrder.length > 0) {
      orderBlock = deliveringOrder.map(order => {
        let x = order.orderDetail;
        orderItem = x.map(item => {
          return (
            <tr>
              <td className="item-name">
                <div className="item-img">
                  <a href="#">
                    <img
                      src={item.book.image}
                      className="img-contain img-cover-10"
                      alt=""
                    />
                  </a>
                </div>
                <div className="item-title">
                  <a href="#">{item.book.name}</a>
                </div>
              </td>
              <td className="item-qty">
                <div className="quantity buttons_added d-flex justify-content-center">
                  <input
                    type="text"
                    step={1}
                    min={1}
                    max
                    name="quantity"
                    defaultValue={item.quantity}
                    title="Qty"
                    className="input-text qty text h-100"
                    size={4}
                    pattern
                    inputMode
                    disabled
                  />
                </div>
              </td>
              <td className="item-price">
                <p>
                  {
                    <NumberFormat
                      displayType="text"
                      value={item.book.originalPrice}
                      thousandSeparator={true}
                      prefix="VND "
                    ></NumberFormat>
                  }
                </p>
              </td>
              <td className="item-total">
                <p>
                  <NumberFormat
                    displayType="text"
                    value={item.book.originalPrice * item.quantity}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                </p>
              </td>
              <td className="action"></td>
            </tr>
          );
        });
        return (
          <div className="order-block">
            <div className="title-wrapper">
              <h2>Date: {order.createdDate.slice(0, 10)}</h2>
              <h2>
                Total:{" "}
                {
                  <NumberFormat
                    displayType="text"
                    value={order.total}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                }
              </h2>
              <p>Amount: {order.orderDetail.length} items</p>
            </div>
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="item">Items</th>
                    <th className="qty">Qty</th>
                    <th className="price">Price</th>
                    <th className="total-price">Total</th>
                    <th className="remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{orderItem}</tbody>
              </table>
            </div>
          </div>
        );
      });
    } else {
      orderBlock.push(<h2>Nothing here</h2>);
    }
    return orderBlock;
  }, [deliveringOrder]);

  const listOrderDelivered = useMemo(() => {
    let orderBlock = [];
    let orderItem = [];
    if (deliveredOrder && deliveredOrder.length > 0) {
      orderBlock = deliveredOrder.map(order => {
        let x = order.orderDetail;
        orderItem = x.map(item => {
          return (
            <tr>
              <td className="item-name">
                <div className="item-img">
                  <a href="#">
                    <img
                      src={item.book.image}
                      className="img-contain img-cover-10"
                      alt=""
                    />
                  </a>
                </div>
                <div className="item-title">
                  <a href="#">{item.book.name}</a>
                </div>
              </td>
              <td className="item-qty">
                <div className="quantity buttons_added d-flex justify-content-center">
                  <input
                    type="text"
                    step={1}
                    min={1}
                    max
                    name="quantity"
                    defaultValue={item.quantity}
                    title="Qty"
                    className="input-text qty text h-100"
                    size={4}
                    pattern
                    inputMode
                    disabled
                  />
                </div>
              </td>
              <td className="item-price">
                <p>
                  {
                    <NumberFormat
                      displayType="text"
                      value={item.book.originalPrice}
                      thousandSeparator={true}
                      prefix="VND "
                    ></NumberFormat>
                  }
                </p>
              </td>
              <td className="item-total">
                <p>
                  <NumberFormat
                    displayType="text"
                    value={item.book.originalPrice * item.quantity}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                </p>
              </td>
              <td className="action"></td>
            </tr>
          );
        });
        return (
          <div className="order-block">
            <div className="title-wrapper">
              <h2>Date: {order.createdDate.slice(0, 10)}</h2>
              <h2>
                Total:{" "}
                {
                  <NumberFormat
                    displayType="text"
                    value={order.total}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                }
              </h2>
              <p>Amount: {order.orderDetail.length} items</p>
            </div>
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="item">Items</th>
                    <th className="qty">Qty</th>
                    <th className="price">Price</th>
                    <th className="total-price">Total</th>
                    <th className="remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{orderItem}</tbody>
              </table>
            </div>
          </div>
        );
      });
    } else {
      orderBlock.push(<h2>Nothing here</h2>);
    }
    return orderBlock;
  }, [deliveredOrder]);

  const listOrderCancelled = useMemo(() => {
    let orderBlock = [];
    let orderItem = [];
    if (cancelledOrder && cancelledOrder.length > 0) {
      orderBlock = cancelledOrder.map(order => {
        let x = order.orderDetail;
        orderItem = x.map(item => {
          return (
            <tr>
              <td className="item-name">
                <div className="item-img">
                  <a href="#">
                    <img
                      src={item.book.image}
                      className="img-contain img-cover-10"
                      alt=""
                    />
                  </a>
                </div>
                <div className="item-title">
                  <a href="#">{item.book.name}</a>
                </div>
              </td>
              <td className="item-qty">
                <div className="quantity buttons_added d-flex justify-content-center">
                  <input
                    type="text"
                    step={1}
                    min={1}
                    max
                    name="quantity"
                    defaultValue={item.quantity}
                    title="Qty"
                    className="input-text qty text h-100"
                    size={4}
                    pattern
                    inputMode
                    disabled
                  />
                </div>
              </td>
              <td className="item-price">
                <p>
                  {
                    <NumberFormat
                      displayType="text"
                      value={item.book.originalPrice}
                      thousandSeparator={true}
                      prefix="VND "
                    ></NumberFormat>
                  }
                </p>
              </td>
              <td className="item-total">
                <p>
                  <NumberFormat
                    displayType="text"
                    value={item.book.originalPrice * item.quantity}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                </p>
              </td>
              <td className="action"></td>
            </tr>
          );
        });
        return (
          <div className="order-block">
            <div className="title-wrapper">
              <h2>Date: {order.createdDate.slice(0, 10)}</h2>
              <h2>
                Total:{" "}
                {
                  <NumberFormat
                    displayType="text"
                    value={order.total}
                    thousandSeparator={true}
                    prefix="VND "
                  ></NumberFormat>
                }
              </h2>
              <p>Amount: {order.orderDetail.length} items</p>
            </div>
            <div className="cart-table">
              <table>
                <thead>
                  <tr>
                    <th className="item">Items</th>
                    <th className="qty">Qty</th>
                    <th className="price">Price</th>
                    <th className="total-price">Total</th>
                    <th className="remove">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>{orderItem}</tbody>
              </table>
            </div>
          </div>
        );
      });
    } else {
      orderBlock.push(<h2>Nothing here</h2>);
    }
    return orderBlock;
  }, [cancelledOrder]);

  return (
    <section className="section__order-status">
      <div className="cart-title">
        <h2>Orders</h2>
      </div>
      <div className="container">
        <ul className="nav nav-tabs nav-order" id="active-exp">
          <li className="">
            <a data-toggle="tab" href="#processing">
              Processing
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#delivering">
              Delivering
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#delivered">
              Delivered
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#cancel">
              Cancelled orders
            </a>
          </li>
        </ul>
        <div className="tab-content tab-content-order">
          <div id="processing" className="tab-pane fade active show">
            {listOrderProcessing}
          </div>
          <div id="delivering" className="tab-pane fade">
            {listOrderDelivering}
          </div>
          <div id="delivered" className="tab-pane fade ">
            {listOrderDelivered}
          </div>
          <div id="cancel" className="tab-pane fade ">
            {listOrderCancelled}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
