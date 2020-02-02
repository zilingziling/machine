import React, { Component } from "react";
import { Button, Divider, Form, Input, Select, Table } from "antd";
import "../commonStyle/deviceNewPage.less";

const Option = Select;
const DeviceFunc = () => {
  const columns = [
    {
      title: "ID"
    },
    {
      title: "设备功能"
    },
    {
      title: "显示名称"
    },
    {
      title: "排序"
    },
    {
      title: "控制页显示"
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
        <span>设备类型：</span>
        <Select style={{ width: 200 }}>
          <Option value={1}>灯光</Option>
        </Select>
      </div>
      <Button type="primary" className="addB">
        新增
      </Button>
      <Table columns={columns} />
    </div>
  );
};

export default DeviceFunc;
