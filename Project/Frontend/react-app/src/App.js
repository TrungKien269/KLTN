import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Routers from "./Routers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import { getToken } from "./Utils/Commons";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import Login from "./pages/index/Login";
import UserProfile from "./pages/index/UserProfile";
import UserCart from "./pages/index/UserCart";
import UserWishList from "./pages/index/UserWishList";
import OrderStatus from "./components/order/OrderStatus";
import ProceedCheckout from "./components/order/ProceedCheckout";
import AdminPage from "./components/admin/AdminPage";

const showPage = (Routers) => {
  var result = null;
  if (Routers.length > 0) {
    result = Routers.map((value, index) => {
      return (
        <Route
          key={index}
          path={value.path}
          exact={value.exact}
          component={value.main}
        ></Route>
      );
    });
  }

  return result;
};

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          {showPage(Routers)}
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/cart" component={UserCart} />
          <PrivateRoute path="/wishlist" component={UserWishList} />
          <PrivateRoute path="/orderstatus" component={OrderStatus} />
          <PrivateRoute path="/proceedcheckout" component={ProceedCheckout} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
