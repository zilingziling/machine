/* eslint-disable indent */
// @flow
/* global ActiveXObject */
import React, { Component, useState } from 'react';
import Hz from '../../assets/img/houzi.png';
import Pack from '../../assets/img/Pack.png';
import Police from '../../assets/img/police.png';
import Cp from '../../assets/img/cp.png';
import Device from '../../assets/img/ctrn.png';
import More from '../../assets/img/more.png';
import Fd from '../../assets/img/fangda.png';
//icon
import update from './../../assets/img/update.png';
import { Divider, Dropdown, Menu, Icon, Avatar, Badge, Modal } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import { observable, autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import Api from '../../api';
import './header.scss';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const confirm = Modal.confirm;

type Props = {
	match: Object,
	history: Object,
	location: Object,
	Socke: Function,
	DeviceState: Function
};
type State = {
	styles: any,
	show: number,
	dx: Boolean,
	title: String
};
const fonts = {
	color: '#fff',
	lineHeight: '40px'
};
const ActiveLink = {
	borderBottom: '2px solid rgba(234,190,54,1)',
	borderRight: '1px',
	paddingBottom: '0.6rem',
};
const HeadetStyle = {
	marginLeft: '20px',
};
const Icon_ = {
	marginRight: '1rem',
	cursor: 'pointer'
};
@inject('Socke', 'DeviceState', 'userInfo', 'Police', 'Devices', 'DeviceDetection')
@observer
class Home extends Component<Props, State> {
	state = {
		styles: null,
		dx: false,
		title: '功能菜单',
		_info: []
	};
	async componentDidMount() {
		this.props.Devices.validation(); //设备类型
		this.props.DeviceState.schoolList(); //学校treelist
		this.props.Police.list(0, 1); //报警查看数据，放在这里可以在别的页面超看报警数据
		if (window.localStorage.getItem('routerName') !== null) {
			this.setState({ title: window.localStorage.getItem('routerName') });
		}
		/**
				// if (this.props.DeviceState.dictionaryList === null) {
				// 	this.props.DeviceState._allDictionary();
				// }
				// window.addEventListener('online', () => {
				// 	// window.location.reload();
				// 	// this.props.Socke.Socke();
				// 	console.log('上线');
		
				// });
				// window.addEventListener('offline', function () {
				// 	console.log('离线');
				// });
				*/
	}

	componentWillReceiveProps(nextProps: any, prevState: any) {
		if (this.props.IndexRouter !== nextProps.IndexRouter) {
			if (nextProps.IndexRouter.length > 0) {
				let array = [];
				nextProps.IndexRouter.forEach(e => {
					array.push(e.route);
				});
				this.setState({ _info: array });
			}
		}
	}

	render() {
		return (
			<div className="header">
				<div className="header-top">
					<div className="header-top-left">
						<img  src={Hz} />
						<span>{window.title}</span>
					</div>
					<div className="header-top-right">
						<img
							src={Fd}
							onClick={this.siezof.bind(this, document.documentElement)}
							style={Icon_} />
						<Divider className="header-top-right-shu" type="vertical" />

						<div className="av" onClick={this.outLog}>
							<Avatar
								className="avTou"
								size="large"
								src={require('../../assets/img/userImg.png')}
							/>
							<span className="header-top-right-span">{window.localStorage.getItem('name')}</span>
						</div>

						<div className="help" onClick={this.openNewWindow}>
							帮助
						</div>

					</div>
				</div>
				<div className="header-second">
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Dropdown
							trigger={['click']} onVisibleChange={this._Change} overlay={this.Menus()}>
							<div style={this.state.styles} className="header-second-nav">
								<img src={Pack} />
								<span>{this.state.title}</span>
							</div>
						</Dropdown>
						<Divider className="header-second-nav-shu" type="vertical" />
					</div>
					<div style={{ display: 'flex', width: '100%', height: '50px', lineHeight: '50px', justifyContent: 'space-around' }}>
						<NavLink
							to="/police"
							exact strict
							activeStyle={ActiveLink}
							onClick={this._pushPage.bind(this, '/police', '报警查看')}
						>
						<div className="header-second-second">
							<Badge className="current" count={this.props.Police.untreated} offset={[15]} showZero className="AAAAAAAAAAAA">
									<img src={Police} />
									<span>报警查看</span>
							</Badge>
						</div>
						</NavLink>
						<NavLink
							to="/devicesate"
							exact strict
							activeStyle={ActiveLink}
							onClick={this._pushPage.bind(this, '/devicesate', '设备状态')}
						>
						<div className="header-second-second">

								<img src={Cp} />
								<span>设备状态</span>
						</div>
						</NavLink>
						<NavLink
							to="/devicectl"
							exact strict
							activeStyle={ActiveLink}
							onClick={this._pushPage.bind(this, '/devicectl', '设备控制')}
						>
						<div className="header-second-second">

								<img src={Device} />
								<span>设备控制</span>
						</div>
						</NavLink>
						<NavLink to='/operating'
								 exact strict
								 activeStyle={ActiveLink}
								 onClick={this._pushPage.bind(this, '/operating', '运营管理')}>
						<div className="header-second-second">
								<img src={More} />
								<span>运营管理</span>
						</div>
						</NavLink>

					</div>
				</div>
			</div>
		);
	}
	openNewWindow = () => {
		window.open('http://www.aiyijan.com/col.jsp?id=119');
	}
	//处理title在右边显示
	_click = (e: Object<string>) => {
		window.localStorage.setItem('routerName', e.key);
		this.setState({ title: e.key });
	}
	//跳转
	_pushPage = (mark: string, routerName: String) => {
		this.setState({ mark, title: routerName });
		window.localStorage.setItem('routerName', routerName);

	}
	//F11全屏
	siezof = (element: any) => {
		if (!this.state.dx) {
			launchFullscreen(element);
		} else {
			exitFullscreen();
		}
		this.setState({ dx: !this.state.dx });
		// try {
		// 	// 判断各种浏览器，找到正确的方法
		// 	if (this.state.dx === false) {
		// 		this.setState({ dx: true });
		// 		var requestMethod = element.requestFullScreen || //W3C
		// 			element.webkitRequestFullScreen || //Chrome等
		// 			element.mozRequestFullScreen || //FireFox
		// 			element.msRequestFullScreen; //IE11
		// 		if (requestMethod) {
		// 			requestMethod.call(element);
		// 		} else
		// 			if (typeof window.ActiveXObject !== 'undefined') { //for Internet Explorer
		// 				let wscript = new ActiveXObject('WScript.Shell');
		// 				if (wscript !== null) {
		// 					wscript.SendKeys('{F11}');
		// 				}
		// 			}

		// 	} else {
		// 		this.setState({ dx: false });
		// 		// 判断各种浏览器，找到正确的方法
		// 		var exitMethod = document.exitFullscreen || //W3C
		// 			document.mozCancelFullScreen || //Chrome等
		// 			document.webkitExitFullscreen || //FireFox
		// 			document.webkitExitFullscreen; //IE11
		// 		if (exitMethod) {
		// 			exitMethod.call(document);
		// 		} else if (typeof window.ActiveXObject !== 'undefined') { //for Internet Explorer
		// 			let wscript = new ActiveXObject('WScript.Shell');
		// 			if (wscript !== null) {
		// 				wscript.SendKeys('{F11}');
		// 			}
		// 		}

		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	}
	_Change = (e: Object, ) => {
		if (!e) {
			this.setState({ styles: null });
		} else {
			this.setState({
				styles: {
					background: 'rgba(36, 175, 255, 1)'
				}
			});
		}
	};
	//导航栏
	Menus = () => {
		const { _info } = this.state;
		return (
			<Menu
				onClick={this._click}
				className="menu-bodys">
				<Menu.Item disabled className="menu-bodys-item itmes" key='常用功能'><img
					className='menu-bodys-item-img'
					src={require('./../../assets/img/devices.png')} />常用功能<img
						style={HeadetStyle}
						src={require('./../../assets/img/jiantou.png')}
					/></Menu.Item>
				<Menu.Item className="menu-bodys-item" key='报警查看'>
					<Link to="/police" style={fonts}>报警查看</Link>
				</Menu.Item>
				<Menu.Item className="menu-bodys-item" key='设备状态'>
					<Link to="/devicesate" style={fonts}>设备状态</Link>
				</Menu.Item>
				<Menu.Item className="menu-bodys-item" key='设备控制'>
					<Link to="/devicectl" style={fonts}>设备控制</Link>
				</Menu.Item>
				<Menu.Item className="menu-bodys-item" key='运营管理'>
					<Link to="/operating" style={fonts}>运营管理</Link>
				</Menu.Item>
				{/* 设备管理 */}

				{shoHid(_info, ['devicesele', 'device']) ? //这些是你router地址 
					<Menu.Item disabled className="menu-bodys-item itmes" key='设备管理'>
						<img
							className='menu-bodys-item-img'
							src={require('./../../assets/img/configs.png')} />设备管理
						<img
							style={{ marginLeft: '20px' }}
							src={require('./../../assets/img/jiantou.png')} /></Menu.Item>
					: null}
				{_info.includes('devicesele') ?
					<Menu.Item className="menu-bodys-item" key='设备配置'>
						<Link to='/devicesele' style={fonts}>设备配置</Link>
					</Menu.Item>
					: null}

				{_info.includes('device') ?
					<Menu.Item className="menu-bodys-item" key='管理码库'>
						<Link to='/device' style={fonts}>管理码库</Link>
					</Menu.Item>
					: null}

				{/*高级设置*/}
				{shoHid(_info, ['role', 'user', 'menu', 'region']) ? //这些是你router地址
					<Menu.Item disabled className="menu-bodys-item itmes" key='高级设置'>
						<img
							className='menu-bodys-item-img'
							src={require('./../../assets/img/permissions.png')} />高级设置
						<img
							style={{ marginLeft: '20px' }}
							src={require('./../../assets/img/jiantou.png')} /></Menu.Item>
					: null}
				{_info.includes('role') ?
					<Menu.Item className="menu-bodys-item" key='角色管理'>
						<Link to='/role' style={fonts}>角色管理</Link>
					</Menu.Item>
					: null}
				{_info.includes('user') ?
					<Menu.Item className="menu-bodys-item" key='用户管理'>
						<Link to='/user' style={fonts}>用户管理</Link>
					</Menu.Item>
					: null}

				{_info.includes('region') ?
					<Menu.Item className="menu-bodys-item" key='区域管理'>
						<Link to='/region' style={fonts}>区域管理</Link>
					</Menu.Item>
					: null}

				{_info.includes('menu') ?
					<Menu.Item className="menu-bodys-item" key='菜单管理'>
						<Link to='/menu' style={fonts}>菜单管理</Link>
					</Menu.Item>
					: null}
				{/*中控升级*/}
				{shoHid(_info, ['update', 'TouchUpdate', 'aiUpdate']) ?  //这些是你router地址
					<Menu.Item disabled className="menu-bodys-item itmes" key='中控模块'>
						<img
							className='menu-bodys-item-img'
							src={require('./../../assets/img/updates.png')} />中控模块
						<img
							style={{ marginLeft: '20px' }}
							src={require('./../../assets/img/jiantou.png')} /></Menu.Item>
					: null}
				{_info.includes('update') ?
					<Menu.Item className="menu-bodys-item" key='中控升级' >
						<Link to='/update' style={fonts}>中控升级</Link>
					</Menu.Item>
					: null}
				{_info.includes('TouchUpdate') ?
					<Menu.Item className="menu-bodys-item" key='触摸屏升级' >
						<Link to='/TouchUpdate' style={fonts}>触摸屏升级</Link>
					</Menu.Item>
					: null}
				{_info.includes('aiUpdate') ?
					<Menu.Item className="menu-bodys-item" key='AI升级' >
						<Link to='/aiUpdate' style={fonts}>AI升级</Link>
					</Menu.Item>
					: null}
				{_info.includes('ceshi') ?
					<Menu.Item className="menu-bodys-item" key='ceshi' >
						<Link to='/ceshi' style={fonts}>ceshi</Link>
					</Menu.Item>
					: null}
			</Menu>
		);
	};
	//退出登录
	outLog = () => {
		confirm({
			centered: true,
			// title: `确定注销${window.localStorage.getItem('name')}吗？`,
			title:'确定退出当前用户登录？',
			onOk: () => {
				this.props.userInfo.outLogin(true);
			},
			onCancel() { },
		});

	}

}
export default Home;

const shoHid = (array, valarray) => {
	let off;
	valarray.find(function (element) {
		if (array.includes(element) === true) {
			off = true;
		}
	});
	return off;
};

//退出全屏
const exitFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
};

//全屏
const launchFullscreen = (element) => {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	}
}; 