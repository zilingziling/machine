import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { HashRouter, Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import Headr from './../pages/Header/Headr';
import router from './config';
import Historys from './../utils/history';
import Redirctlogin from './../containers/RedirectLogin';
import { RouteIsSHow } from '../pages/component/function/routerPmi';
import Userinfo from '../stores/userinfo.js';
import { toJS, autorun, Reaction, observable } from 'mobx';
import { observer } from 'mobx-react';
import UserStore from '../stores/userinfo.js';
@observer
class Routes extends Component {
	@observable Index = []
	componentDidMount() { //处理登录过后返回过来的Router

		autorun(() => {
			if (Userinfo.data.length === 0) {
				let res = JSON.parse(window.localStorage.getItem('data'));
				this.Index = RouteIsSHow(res);
			} else {
				this.Index = RouteIsSHow(toJS(Userinfo.data));
			}
		});
	}
	render() {
		return (
			<Router history={Historys.history}>
				<Switch>
					<Route exact path="/" component={router.Login()} />
					<Route exact path="/login" component={router.Login()} />
					<Redirctlogin>
						<Headr IndexRouter={toJS(this.Index)} />
						<Route exact path="/" component={router.police()} />
						{this.Index.map(_RouterIndex)}
					</Redirctlogin>
					<Redirect from="*" to="/" />
					<Route path="/404" component={router.NoMatch} />
				</Switch>
			</Router>
		);
	}
}
export default Routes;

const _RouterIndex = (res, index) => {  //如果新增加了页面需要在Config.js 注册Router
	try {
		let routerName = res.route;
		var func = router[routerName];
		var CP = func();
		return (
			<Route key={index} exact path={`/${res.route}`} component={CP} />
		);
	} catch (error) {
		console.log(error);
		// UserStore.outLogin();    //如果发现新增页面获取直接闪退说明 你配置的router不对，
		// 可以把这个函数去掉看看哪里报错。 这个函数目的就是清楚缓存在本地的router，很久没退登录无法拉取最新的数据
	}

};

// {/* <Route exact path="/home" component={router.Home()} />
// 					<Route exact path="/update" component={router.update()} />
// 					<Route exact path="/TouchUpdate" component={router.TouchUpdate()} />
// 					<Route exact path="/updateTable" component={router.updateTable()} />
// 					<Route exact path="/TouchUpdateTable" component={router.TouchUpdateTable()} />
// 					<Route exact path="/device" component={router.device()} />
// 					<Route exact path="/deviceScene/:query?" component={router.deviceScene()} />
// 					<Route exact path="/devicesate" component={router.devicesate()} />
// 					<Route exact path="/devicesele" component={router.devicesele()} />
// 					<Route exact path="/deviceAdd/:data?" component={router.deviceAdd()} />
// 					<Route exact path="/devicectl/:query?" component={router.devicectl()} />
// 					<Route exact path="/operating" component={router.operating()} />
// 					<Route exact path="/police" component={router.police()}/>
// 					<Route exact path="/role" component={router.role()}/>
// 					<Route exact path="/jurisd" component={router.jurisd()}/>
// 					<Route exact path="/user" component={router.user()}/>
// 					<Route exact path="/school" component={router.school()}/>
// 					<Route exact path="/menu" component={router.menu()}/>
// 					<Route exact path="/classroom" component={router.classroom()}/> */}