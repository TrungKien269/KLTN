import React, { Component, lazy, useState, useEffect } from "react";

import Pagi from "./Pagi";

const Index = (props) => {
  const {category} = props
  
  return (
    <React.Fragment>
      <Pagi category={encodeURI(category)} itemsCountPerPage={20} pageRangeDisplayed={5} />
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
