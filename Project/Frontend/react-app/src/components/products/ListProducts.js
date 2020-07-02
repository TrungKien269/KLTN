import React, { Component, lazy, useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

import Pagi from "./Pagi";

const Index = (props) => {
  const { category } = props;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const from = query.get("from");
  const to = query.get("to");

  const sortQuery = useQuery();
  const sortfield = sortQuery.get("sortfield");
  const sorttype = sortQuery.get("sorttype");

  const searchQuery = useQuery();
  const searchvalue = searchQuery.get("search");

  return (
    <React.Fragment>
      
      <Pagi
        query={{ from, to }}
        sortQuery={{ sortfield, sorttype }}
        searchQuery={searchvalue}
        category={encodeURI(category)}
        itemsCountPerPage={16}
        pageRangeDisplayed={3}
      />
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
