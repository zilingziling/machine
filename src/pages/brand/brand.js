import React, { Component } from "react";
import { Button, Divider, Form, Input, Table } from "antd";
import "../commonStyle/deviceNewPage.less";
const Brand = () => {
  const columns = [
    {
      title: "ID"
    },
    {
      title: "品牌名称（中文）"
    },
    {
      title: "品牌名称（英文）"
    },
    {
      title: "排序"
    },
    {
      title: "操作",
      render: text => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a>删除</a>
        </>
      )
    }
  ];
  return (
    <div className="brandNew">
      <div className="flex">
        <span>品牌名称：</span>
        <Input style={{ width: 200 }} />
        <Button type="primary">搜索</Button>
      </div>
      <Button type="primary" className="addB">
        新增
      </Button>
      <Table columns={columns} />
    </div>
  );
};

export default Brand;
