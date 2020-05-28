import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Commons";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

export default PublicRoute;
