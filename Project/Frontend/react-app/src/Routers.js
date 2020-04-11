import React from "react";
import Index from "./pages/index/Index";
import NotFoundPage from "./pages/index/NotFoundPage";
import Collections from "./pages/index/Collections";
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
    path: "/collections",
    exact: false,
    main: () => <Collections></Collections>,
  },
];

export default Routers;
