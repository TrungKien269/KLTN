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
        console.log(data);
        var d = data.promotionDetail;
        results = d.map((da) => {
          return <div key={da.book.id}>{da.book.name}</div>;
        });
        return (
          <div>
            <strong>Promo: {data.description}</strong>
            {results}
          </div>
        );
      });
    }
    return x;
  }, [listPromo]);

  // console.log(showListPromo);

  return <div>{showListPromo}</div>;
};
export default PromotionLList;
