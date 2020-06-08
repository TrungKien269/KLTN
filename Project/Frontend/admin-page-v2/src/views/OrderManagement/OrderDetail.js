import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";

const OrderDetail = (props) => {

  const [order, setOrder] = useState("");

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get", 
      url: "http://localhost:5000/api/Admin/GetOrderDetails",
      params: {
        orderID: props.match.params.id
      }
    }).then((res) => {
      console.log(res.data.obj)
      setOrder(res.data.obj)
    })
  }, [])

  return <div>Hi</div>;
};
export default OrderDetail;
