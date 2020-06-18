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
import "lightgallery.js/dist/css/lightgallery.css";
import Chatbot from "./components/Chatbot";
import EBookRented from './pages/index/EBookRented';
import ReadEBook from './pages//index/ReadEBook';

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
        <Header />
        <Switch>
          {showPage(Routers)}
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute path="/cart" component={UserCart} />
          <PrivateRoute path="/wishlist" component={UserWishList} />
          <PrivateRoute path="/orderstatus" component={OrderStatus} />
          <PrivateRoute path="/proceedcheckout" component={ProceedCheckout} />
          <PrivateRoute path="/rentebook" component={EBookRented} />
          <PrivateRoute path="/ebook/read/:id" component={ReadEBook} />
        </Switch>
        <Chatbot />
        <Footer />
      </React.Fragment>
    </Router>
  );
}

export default App;
