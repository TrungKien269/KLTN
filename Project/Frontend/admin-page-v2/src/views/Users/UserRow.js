import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";

function UserRow(props) {
  const user = props.user;
  const userLink = `/users/${user.id}`;

  const getBadge = (status) => {
    return status === "Available"
      ? "success"
      : status === "Inactive"
      ? "secondary"
      : status === "Pending"
      ? "warning"
      : status === "Banned"
      ? "danger"
      : "primary";
  };

  return (
    <tr key={user.id.toString()}>
      <th scope="row">
        <Link to={userLink}>{user.id}</Link>
      </th>
      <td>
        <Link to={userLink}>{user.fullName}</Link>
      </td>
      <td>{user.createdDateTime}</td>
      <td>{user.email}</td>
      <td>
        <Link to={userLink}>
          <Badge color={getBadge(user.state)}>{user.state}</Badge>
        </Link>
      </td>
    </tr>
  );
}

export default UserRow;
