import React, { Component, lazy, useState, useEffect } from "react";
import axios from "axios";
import Pagi from "./Pagi";
import ProductCard from "./ProductCard";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:53788/api/ListBook/GetAll",
    }).then(function (res) {
      // console.log(res);
      setData(res.data.obj);
    });
  }, []);

  return (
    <React.Fragment>
      <Pagi data={data} itemsCountPerPage={16} pageRangeDisplayed={5} />
    </React.Fragment>
  );
};

export default Index;

// class ListProducts extends Component {
//   render() {

//     let elements = products.map((product, index) => {
//       let result = "";
//       if (product.status) {
//         result = (
//           <div className="col-sm-3 col-6">
//             <ProductCard
//               key={product.id}
//               name={product.name}
//               image={product.image}
//               price={product.price}
//             />
//           </div>
//         );
//       }
//       return result;
//     });
//     return <React.Fragment>{elements}</React.Fragment>;
//   }
// }

// export default ListProducts;
