import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserContextProvider from "../src/context/userContext";
import I18nContextProvider from '../src/context/I18nContext';
import './i18next';

ReactDOM.render(
  <React.StrictMode>
    <I18nContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </I18nContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
