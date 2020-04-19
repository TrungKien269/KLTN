import React from "react";
import Index from "./pages/index/Index";
import NotFoundPage from "./pages/index/NotFoundPage";
import Collections from "./pages/index/Collections";
import BookDetail from "./pages/index/BookDetail";
import Login from "./pages/index/Login";
import ConfirmEmail from "./pages/index/ConfirmEmail";
import ResetPassword from "./pages/index/ResetPassword";
import UserCart from "./pages/index/UserCart";
import OrderStatus from "./components/order/OrderStatus";
import ProceedCheckout from "./components/order/ProceedCheckout";

const Routers = [
  {
    path: "/",
    exact: true,
    main: () => <Index></Index>,
  },
  {
    path: "/404",
    exact: false,
    main: () => <NotFoundPage></NotFoundPage>,
  },
  {
    path: "/collections/", // /collection/Romance
    exact: true,
    main: () => <Collections></Collections>,
  },
  {
    path: "/collections/:category", // /collection/Romance
    exact: true,
    main: () => <Collections></Collections>,
  },
  {
    path: "/book/:id",
    exact: true,
    main: () => <BookDetail />,
  },
  {
    path: "/confirmemail",
    exact: true,
    main: () => <ConfirmEmail />,
  },
  {
    path: "/resetpassword",
    exact: true,
    main: () => <ResetPassword />,
  },
];

export default Routers;
