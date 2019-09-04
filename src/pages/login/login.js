// @flow
import React, { Component } from 'react';
import { Button, Input, Icon, Spin } from 'antd';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import SparkMD5 from 'spark-md5';
import { UpLogin, validation } from './../../api/login';
import Api from '../../api';
import './login.scss';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

type Props = {
	match: Object,
	history: Object,
	location: Object,
	userInfo: Function
}
const _width = { width: '15rem' };
const width_ = { width: '10rem' };
@inject('userInfo', 'Socke')
@observer
class Login extends Component<Props, State> {
	@observable user = '';
	@observable pass = '';
	@observable validation = '';
	@observable url = '';
	@observable text = ''
	@observable loading = false;
	componentDidMount() {
		this._checkout()
	}

	render() {
		return (
			<div className="login">
				{/*<div className="login-img">*/}
				{/*	<img src={require('../../assets/img/loginLog.png')} alt="" />*/}
				{/*	<span className="login-img-span">{window.title}</span>*/}
				{/*</div>*/}
				<div className="login-title">{window.title}</div>
				<Spin tip="登录中。。。" indicator={antIcon} spinning={this.loading} size="large">
					<div className="login-background">
						<span className="login-background-span">用户登录</span>
						<div className="login-background-up" onKeyPress={this.handleEnterKey}>
							<Input
								style={_width}
								maxLength={20}
								placeholder="请输入账号"
								className="login-background-up-user"
								onChange={(e) => { this.user = e.target.value; }}
								prefix={<img src={require('./../../assets/img/users.png')} />}
							/>
							<Input
								style={_width}
								maxLength={20}
								placeholder="请输入用户密码"
								type="password"
								onPaste={this.theForm}
								onCopy={this.theForm}
								onCut={this.theForm}
								className="login-background-up-pass"
								onChange={(e) => { this.pass = e.target.value; }}
								prefix={<img src={require('./../../assets/img/pass.png')} />}
							/>

							<div className="login-background-up-row">
								<Input
									style={width_}
									maxLength={4}
									placeholder="请输入验证码"
									className="login-background-up-row-validation"
									onChange={(e) => { this.validation = e.target.value; }}
									prefix={<img src={require('./../../assets/img/vertify.png')} />}
								/>
								<img className="login-background-up-row-img" onClick={this._checkout} src={this.url} />
							</div>

							<div className="login-background-up-login">
								<Button onClick={this.UpUser} className="login-background-up-login-btn" type="primary">登录</Button>
							</div>
							<span style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{this.text}</span>
						</div>
					</div>
				</Spin>
			</div>
		);
	}
	// 切换验证码
	_checkout = () => {
		const numbers = Math.floor(Math.random() * 10);
		let url = 'deviceapi/sys_user/create_verify_code?' + parseInt(numbers);
		this.url = url;
	}
	//登录
	UpUser = async () => {
		if (this.user !== '' && this.pass !== '') {
			if (this.validation !== '') {
				try {
					this.loading = true;
					let res = await Api.Login.UpLogin(this.user, SparkMD5.hash(this.pass), this.validation);
					if (res.code === 200) {
						this.props.userInfo.updateStatus(true, 'police', res.data, this.user, SparkMD5.hash(this.pass), res.data.name);
						window._guider.Utils.alert({
							message: res.msg,
							type: 'success'
						});
						this.loading = false;
					} else {
						this.loading = false;
						this.text = res.msg;
					}
				} catch (error) {
					this.text = '';
					this.loading = false;
					console.log(error);
				}
			} else {
				this.text = '请输入验证码';
			}
		} else {
			this.text = '请输入账号和密码';
		}
	}
	//回车键
	handleEnterKey = (e: Object) => {
		if (e.nativeEvent.charCode === 13) {
			if (!this.loading) {
				this.UpUser();
			}

		}
	}

	theForm = () => {
		return false;
	}
}
export default Login;