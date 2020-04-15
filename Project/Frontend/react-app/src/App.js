import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Routers from "./Routers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import { getToken } from "./Utils/Commons";

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

  return <Switch>{result}</Switch>;
};

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header></Header>
        {showPage(Routers)}
        <Footer />
      </React.Fragment>
    </Router>
  );
}

export default App;
