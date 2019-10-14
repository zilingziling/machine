import React from "react";
import { Table } from "antd";
const data = [
  {
    key: "1",
    user: "哈哈",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    user: "哈哈",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    user: "哈哈",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];
const column = [
  {
    title: "时间",
    dataIndex: "time"
  },
  {
    title: "用户",
    dataIndex: "user"
  },
  {
    title: "IP"
  },
  {
    title: "操作内容"
  },
  {
    title: "操作结果"
  },
  {
    title: "操作ID"
  }
];
const Content = () => {
  return (
    <Table
      columns={column}
      dataSource={data}
      className="table"
      rowClassName="device-tables-tableRow"
    />
  );
};
export default Content;
