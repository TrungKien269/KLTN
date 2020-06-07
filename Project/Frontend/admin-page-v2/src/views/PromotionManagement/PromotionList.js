import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { getToken } from "../../Utils/Commons";

const PromotionLList = () => {
  const [listPromo, setListPromo] = useState();

  useEffect(() => {
    Axios({
      headers: {
        Authorization: "Bearer " + getToken(),
      },
      method: "get",
      url: "http://localhost:5000/api/Admin/ListPromotion",
    }).then((res) => {
      if (res.status) {
        setListPromo(res.data.obj);
      }
    });
  }, []);

  const showListPromo = useMemo(() => {
    var x = "";
    var results = "";
    if (listPromo) {
      x = listPromo.map((data) => {
        return data.promotionDetail;
      });
    }
    return x;
  }, [listPromo]);

  console.log(showListPromo);

  return <div>{}</div>;
};
export default PromotionLList;
