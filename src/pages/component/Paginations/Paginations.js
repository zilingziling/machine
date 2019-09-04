// @flow

import React, { Component } from 'react';
import { Pagination, } from 'antd';
type Props = {
	match: Object,
	history: Object,
	location: Object,
	page: Number,
	total: String,
	paging: Function,
	current: any
};
export default class Paint extends Component<Props> {
	render() {
		return (
			<div>
				<Pagination
					className="pages"
					style={{marginTop:'1rem', float:'right', marginRight: '2rem'}}
					current={this.props.current} //当前页数
					total={this.props.total}			//总数量
					showQuickJumper
					// pageSize={2}
					onChange={e => {
						this.props.paging(e);
					}}
				/>

			</div>
		);
	}
}
