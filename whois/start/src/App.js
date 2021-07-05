import React from "react";
import { Route } from "react-router-dom";
import "antd/dist/antd.css";
import Search from "./search/container/Search";
import User from "./user/container/User";

export default function App() {
  return (
    <>
      <Route exact path="/" component={Search}></Route>
      <Route path="/user/:name" component={User}></Route>
    </>
  );
}
