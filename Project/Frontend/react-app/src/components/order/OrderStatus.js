import React, { Component, useState, useMemo, useEffect } from "react";
import Axios from "axios";
import { getToken, setUserSession } from "../../Utils/Commons";
import NumberFormat from "react-number-format";

const OrderStatus = () => {
  const [processingOrder, setProcessingOrder] = useState("");
  const [deliveringOrder, setDelivering] = useState("");
  const [deliveredOrder, setDelivered] = useState("");

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListProcessing",
    }).then((res) => {
      if (res) {
        setProcessingOrder(res.data.obj);
      }
    });
  }, []);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListDelivery",
    }).then((res) => {
      if (res) {
        setDelivering(res.data.obj);
      }
    });
  }, []);

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/UserOrder/ListDelivered",
    }).then((res) => {
      if (res.status) {
        setDelivered(res.data.obj);
      }
    });
  }, []);

  //   for (let i = 0; i < processingOrder.length; i++) {
  //     for (let j = 0; j < processingOrder[i].orderDetail.length; j++) {
  //       console.log(processingOrder[i].orderDetail[j]);
  //     }
  //   }
  const listOrderProcessing = useMemo(() => {
    let orderItem = [];
    let orderBlock = [];
    if (processingOrder && processingOrder.length > 0) {
      orderBlock = processingOrder.map((order) => {
        console.log(order.orderDetail);
        let x = order.orderDetail;
        orderItem = x.map((item) => {
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
    }
    return orderBlock;
  }, [processingOrder]);

  const listOrderDelivering = useMemo(() => {
    let orderItem = [];
    let orderBlock = [];
    if (deliveringOrder && deliveringOrder.length > 0) {
      orderBlock = deliveringOrder.map((order) => {
        console.log(order.orderDetail);
        let x = order.orderDetail;
        orderItem = x.map((item) => {
          console.log(item);
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
      //   for (let i = 0; i < deliveredOrder.length; i++) {
      //     const order = deliveredOrder[0];
      //     console.log(order.orderDetail);
      //     for (let j = 0; j < order.orderDetail.length; j++) {
      //       const item = order.orderDetail[j];
      //       orderItem.push(
      //         <tr key={order.orderId}>
      //           <td className="item-name">
      //             <div className="item-img">
      //               <a href="#">
      //                 <img
      //                   src={item.book.image}
      //                   className="img-contain img-cover-10"
      //                   alt=""
      //                 />
      //               </a>
      //             </div>
      //             <div className="item-title">
      //               <a href="#">{item.book.name}</a>
      //             </div>
      //           </td>
      //           <td className="item-qty">
      //             <div className="quantity buttons_added d-flex justify-content-center">
      //               <input
      //                 type="text"
      //                 step={1}
      //                 min={1}
      //                 max
      //                 name="quantity"
      //                 defaultValue={item.quantity}
      //                 title="Qty"
      //                 className="input-text qty text h-100"
      //                 size={4}
      //                 pattern
      //                 inputMode
      //                 disabled
      //               />
      //             </div>
      //           </td>
      //           <td className="item-price">
      //             <p>
      //               {
      //                 <NumberFormat
      //                   displayType="text"
      //                   value={item.book.originalPrice}
      //                   thousandSeparator={true}
      //                   prefix="VND "
      //                 ></NumberFormat>
      //               }
      //             </p>
      //           </td>
      //           <td className="item-total">
      //             <p>
      //               <NumberFormat
      //                 displayType="text"
      //                 value={item.book.originalPrice * item.quantity}
      //                 thousandSeparator={true}
      //                 prefix="VND "
      //               ></NumberFormat>
      //             </p>
      //           </td>
      //           <td className="action"></td>
      //         </tr>
      //       );
      //     }
      //   }
    }
    return orderBlock;
  }, [deliveringOrder]);

  const listOrderDelivered = useMemo(() => {
    let orderBlock = [];
    let orderItem = [];
    if (deliveredOrder && deliveredOrder.length > 0) {
      orderBlock = deliveredOrder.map((order) => {
        let x = order.orderDetail;
        orderItem = x.map((item) => {
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
      //   for (let i = 0; i < deliveredOrder.length; i++) {
      //     const order = deliveredOrder[0];
      //     console.log(order.orderDetail);
      //     for (let j = 0; j < order.orderDetail.length; j++) {
      //       const item = order.orderDetail[j];
      //       orderItem.push(
      //         <tr key={order.orderId}>
      //           <td className="item-name">
      //             <div className="item-img">
      //               <a href="#">
      //                 <img
      //                   src={item.book.image}
      //                   className="img-contain img-cover-10"
      //                   alt=""
      //                 />
      //               </a>
      //             </div>
      //             <div className="item-title">
      //               <a href="#">{item.book.name}</a>
      //             </div>
      //           </td>
      //           <td className="item-qty">
      //             <div className="quantity buttons_added d-flex justify-content-center">
      //               <input
      //                 type="text"
      //                 step={1}
      //                 min={1}
      //                 max
      //                 name="quantity"
      //                 defaultValue={item.quantity}
      //                 title="Qty"
      //                 className="input-text qty text h-100"
      //                 size={4}
      //                 pattern
      //                 inputMode
      //                 disabled
      //               />
      //             </div>
      //           </td>
      //           <td className="item-price">
      //             <p>
      //               {
      //                 <NumberFormat
      //                   displayType="text"
      //                   value={item.book.originalPrice}
      //                   thousandSeparator={true}
      //                   prefix="VND "
      //                 ></NumberFormat>
      //               }
      //             </p>
      //           </td>
      //           <td className="item-total">
      //             <p>
      //               <NumberFormat
      //                 displayType="text"
      //                 value={item.book.originalPrice * item.quantity}
      //                 thousandSeparator={true}
      //                 prefix="VND "
      //               ></NumberFormat>
      //             </p>
      //           </td>
      //           <td className="action"></td>
      //         </tr>
      //       );
      //     }
      //   }
    }
    return orderBlock;
  }, [deliveredOrder]);
  return (
    <section className="section__order-status">
      <div className="cart-title">
        <h2>Orders</h2>
      </div>
      <div className="container">
        <ul className="nav nav-tabs nav-order" id="active-exp">
          <li className="active">
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
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
