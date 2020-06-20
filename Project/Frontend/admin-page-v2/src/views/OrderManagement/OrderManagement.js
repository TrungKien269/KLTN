import React from 'react';
import OrderPagination from './OrderPagination';

function OrderManagement() {
  return (
    <OrderPagination
      itemsCountPerPage={20}
      pageRangeDisplayed={10}>
    </OrderPagination>
  )
}

export default OrderManagement
