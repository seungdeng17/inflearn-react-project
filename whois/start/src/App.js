import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "antd/dist/antd.css";
import Search from "./search/container/Search";
import User from "./user/container/User";
import Login from "./auth/container/Login";
import Signup from "./auth/container/Signup";

export default function App() {
  useEffect(() => {
    const bodyEl = document.getElementsByTagName("body")[0];
    const loadingEl = document.getElementById("init-loading");
    bodyEl.removeChild(loadingEl);
  }, []);

  return (
    <>
      <Route exact path="/" component={Search}></Route>
      <Route path="/user/:name" component={User}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/signup" component={Signup}></Route>
    </>
  );
}
