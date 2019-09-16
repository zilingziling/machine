//@flow
/* eslint-disable indent */
import React, { Component } from "react";
import { Icon, Tree } from "antd";
import "./deviceSelePage.scss";
import { observable, toJS } from "mobx";
import { observer, inject } from "mobx-react";
// import { Tree } from "@alifd/next";
import "@alifd/next/lib/tree/style";
const TreeNode = Tree.TreeNode;
const DirectoryTree = Tree.DirectoryTree;
const styles = {
  width: "12rem",
  display: "flex",
  color: " #fff",
  alignItems: "top",
  marginTop: "30px",
  height: "70vh",
  overflow: "auto",
  overflowY: "scroll"
};
@inject("DeviceState")
@observer
class DeviceSeleclass extends Component {
  @observable selected = [""];
  @observable expanded = [""];
  @observable CtrTree = [];
  componentDidMount() {
    let expanded = window.localStorage.getItem("deviceExpanded");
    let selected = window.localStorage.getItem("deviceSelected");
    if (expanded !== null && selected !== null) {
      this.selected = [selected];
      this.expanded = JSON.parse(expanded);
    }
  }
  render() {
    return (
      <div style={styles}>
        {/*deviceState tree*/}
        <Tree
          // multiple
          showLine
          onSelect={this.seleKey}
          onExpand={this.onExpand}
          selectedKeys={this.selected}
          expandedKeys={this.expanded}
        >
          {renderTreeNodes(toJS(this.props.DeviceState.list))}
        </Tree>
      </div>
    );
  }
  onExpand = (e: any, r) => {
    let select = r.node.props.dataref.row;
    this.expanded = e;
    let array = this.CtrTree;
    array.push(`${select.id}:${select.code}`);
    window.localStorage.setItem(
      "CtrSchoole",
      JSON.stringify([...new Set(array)])
    );
    window.localStorage.setItem("deviceExpanded", JSON.stringify(e));
  };
  //é€‰æ‹©
  seleKey = (key: Array<Object>, e: Object) => {
    this.selected = key;
    window.localStorage.setItem("deviceSelected", key);
    let array = this.CtrTree;
    if (e.selectedNodes.length > 0) {
      let obj = e.selectedNodes[0].props.dataref.row;
      this.props.renderValue(obj.id, e);
      window.localStorage.setItem("devicesStateschool", obj.parent);
      window.localStorage.setItem("devicesStateClassroomid", obj.id);
    }
  };
}

export default DeviceSeleclass;

const renderTreeNodes = data => {
  return data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataref={item}>
          {renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} dataref={item} />;
  });
};
