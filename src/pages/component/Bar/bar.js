//@flow
import React, { Component } from 'react';
import Api from '../../../api/index';
import { observable, toJS } from 'mobx';
import { observer, inject, } from 'mobx-react';
import { Tree, } from 'antd';
import './bar.scss';
const DirectoryTree = Tree.DirectoryTree;
type Props = {
	match: Object,
	history: Object,
	location: Object,
	Seleshcool: Function,
};
type State = {
	selected: object,
	expandedKeys: object
}
const TreeNode = Tree.TreeNode;

@inject('DeviceState')
@observer
class Bar extends Component<Props, State> {
	state = {
		selected: [''],
		expandedKeys: [],
	}
	componentDidMount() {
		let stateEKeys =JSON.parse(window.localStorage.getItem('stateE'))
		let selected = window.localStorage.getItem('CtrClassrommid');
		if (stateEKeys&&selected !== null) {
			this.setState({
				selected: [selected],
				expandedKeys:[...new Set(stateEKeys)]
			});
		}
	}
	render() {
		const { selected, expandedKeys } = this.state;
		console.log(expandedKeys)
		return (
			<div className="bar">
				<div className="devicesele-selects">
					{/* deviceControl tree deviceEquip tree*/}
					<DirectoryTree
						// multiple
						motion={null}
						showLine
						openAnimation={false}
						showIcon={false}
						onSelect={this.seleKey}
						onExpand={this.onExpand}
						selectedKeys={selected}
						expandedKeys={expandedKeys}
					>
						{renderTreeNodes(toJS(this.props.DeviceState.classRoomList))}
					</DirectoryTree>
				</div>
			</div >
		);
	}

	onExpand = (e: any, obj: object) => {
		console.log(e)
		this.setState({ expandedKeys: e });
		window.localStorage.setItem('CtrSchoole', JSON.stringify(e));
		window.localStorage.setItem('stateE', JSON.stringify(e));
	}
	seleKey = (e: Array<number>, data: object) => {
		this.setState({ selected: e });
		if (data.selectedNodes.length > 0) {
			this.props.Seleshcool(e[0], data.selectedNodes[0].props.dataRef.row);
			let obj = data.selectedNodes[0].props.dataRef.row;
			window.localStorage.setItem('classroomid', obj.id);
			window.localStorage.setItem('school', obj.schoolId);
			window.localStorage.setItem('CtrClassrommid', e);
		}
	}

}
export default Bar;
const renderTreeNodes = (data: Array) => {
	// console.table(data)
	return data.map((item, index) => {
		if (item.children) {
			return (
				<TreeNode title={item.title} key={item.key} dataRef={item}>
					{renderTreeNodes(item.children)}
				</TreeNode>
			);
		}
		return <TreeNode {...item} dataRef={item} />;
	});
};
