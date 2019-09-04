/* eslint-disable indent */
//@flow

import React, { Component } from 'react';
import Api from './../../api';
import Bar from '../component/Bar/deviceSeleclass';
import Pagination from '../component/Paginations/Paginations';
import { Table, Button, Badge } from 'antd';
import { observable, toJS, autorun } from 'mobx';
import { observer, inject, } from 'mobx-react';
import('./update.scss');

type Props = {
  match: Object,
  history: Object,
  location: Object
};

@inject('UpdateTouch')
@observer
class DeviceSele extends Component<Props> {
  @observable school = null;
  @observable classid = null;
  @observable columns = [
    { title: '位置', dataIndex: 'school_room', key: 'school_room' },
    { title: '中控ID号', dataIndex: 'imei_no', key: 'imei_no' },
    { title: '当前固件版本', dataIndex: 'versionname', key: 'versionname' },
  ];
  @observable count = null;
  @observable selectedRowKeys = [];
  async componentDidMount() {
    let school = window.localStorage.getItem('devicesStateClassroomid');
    let classid = window.localStorage.getItem('devicesStateschool');
    let url = window.location.pathname;
    if (school !== null && classid !== null) {
      this.props.UpdateTouch._list(school, '2', 1);
      this.classid = classid;
      this.school = school;
    }
    autorun(() => {
      this.selectedRowKeys = toJS(this.props.UpdateTouch.selid).map(Number);
    });
  }

  render() {
    const { total, listData, current } = this.props.UpdateTouch;
    const { selectedRowKeys } = this;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div className='UpdateTable'>
        <Bar renderValue={this.onchang} />
        <div className='UpdateTable-left'>
          <Badge className='UpdateTable-left-number' count={this.count}>
            <Button onClick={this._UpdateSeve} type="primary" className='UpdateTable-left-number-button'>保存</Button>
          </Badge>
          <Button onClick={this._UpdategoBanck} type="primary" className='UpdateTable-left-number-button rights'>返回升级页面</Button>

          <Table
            rowSelection={rowSelection}

            className="device-tables-table"
            rowClassName="device-tables-tableRow"
            columns={this.columns}
            dataSource={listData}
            bordered
            pagination={false}
          />
          <Pagination
            current={current}
            total={total}
            paging={e => {
              this.props.UpdateTouch.current = e;
              this.props.UpdateTouch._list(this.school, '2', e);
            }}
          />
        </div>
      </div>
    );
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.selectedRowKeys = selectedRowKeys;
    this.count = selectedRowKeys.length;
  }
  //选择
  onchang = (id: Number) => {
    this.school = id;
    if (typeof (id) !== 'undefined') {
      this.props.UpdateTouch._list(id, '2', 1);
      this.count = null;
      this.selectedRowKeys = [];
    } else {
      this.props.UpdateTouch.listData = [];
      this.props.UpdateTouch.total = null;
    }
  }
  //保存
  _UpdateSeve = async () => {
    if (this.selectedRowKeys.length > 0) {
      try {
        let res = await Api.Device.upgrade_room(this.selectedRowKeys, 2);
        console.log(res);
        if (res.code === 200) {
          window._guider.Utils.alert({
            message: res.msg,
            type: 'success'
          });
        }
        // this.selectedRowKeys = [];
        // this.count = null;
      } catch (error) {
        console.log(error);
      }
    } else {
      window._guider.Utils.alert({
        message: '请选择升级的区域',
        type: 'warning'
      });
    }

  }

  _UpdategoBanck = () => {
    this.props.history.replace({
      pathname: '/TouchUpdate'
    });
  }

}

export default DeviceSele;