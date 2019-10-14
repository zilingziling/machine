import React, { Component } from "react";
import Search from "./components/search";
import Content from "./components/table";
import "./opeLog.less";
const OpeLog = () => {
  return (
    <div className="wrapper">
      <Search />
      <Content />
    </div>
  );
};

export default OpeLog;
