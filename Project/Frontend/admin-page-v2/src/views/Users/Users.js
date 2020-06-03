import React from 'react';
import UserPagination from './UserPagination';

function Users() {

  return (
    <UserPagination
      itemsCountPerPage={20}
      pageRangeDisplayed={10}>
    </UserPagination>
  )
}

export default Users;
