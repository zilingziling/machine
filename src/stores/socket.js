/* eslint-disable no-mixed-spaces-and-tabs */
import { observable, computed, useStrict, action } from "mobx";
import { observer } from "mobx-react";
import { notification, Modal, Divider } from "antd";

import {
  decodeUtf8,
  Bytes2Str
} from "../pages/component/function/formatDateReturn";
import DeviceDetection from "./deviceDetection";
import _userinfo from "./userinfo";
import Police from "./police";
import { skip } from "../api/device";
const dst = "ytj_logic"; //后端
const { confirm } = Modal;

class Socke {
  constructor() {
    // if (window.localStorage.getItem('userName') !== null && window.localStorage.getItem('password') !== null) {}
    if (window.location.pathname !== "/login") {
      this.Socke();
    }
  }
  @observable my_id = window.localStorage.getItem("userName");
  @observable seqno = 0;
  @observable reconnectionNumber = 0;

  @action Socke = () => {
    try {
      let ws = new WebSocket(window.url);
      window.ws = ws;
      ws.onopen = () => {
        try {
          ws.binaryType = "arraybuffer";
          this.send(
            ws,
            {},
            window.proto.com.yj.itgm.protocol.MSGTYPE.HANDSHAKE
          ); //
        } catch (error) {
          console.log(error);
        }
      };
      ws.onmessage = evt => {
        try {
          let msg = new window.proto.com.yj.itgm.protocol.BaseMsg.deserializeBinary(
            evt.data
          ); //deserializeBinary（）序列 接受消息
          let res = new window.proto.com.yj.itgm.protocol.BaseDataMsg.deserializeBinary(
            msg.getData()
          );
          let obj = new window.proto.com.yj.itgm.protocol.EquipLoginReturn.deserializeBinary(
            res.getData()
          );
          // console.log(res.getCommand());
          console.log(obj.getLoginFail());
          if (res.getCommand() === 1256) {
            this.wslogin();
          } else if (obj.getLoginFail() === 0) {
            console.log("连接socket成功");
            this.onMsg();
          } else if (obj.getLoginFail() === 1) {
            console.log("通行服务器连接失败");
            //判断于socket到底登录失败是否是储存的账号和密码存在不, 如果不存在就跳转到登录页面从新登录
            if (
              window.localStorage.getItem("userName") !== null &&
              window.localStorage.getItem("password") !== null
            ) {
              setTimeout(() => {
                this.reconnectionNumber = this.reconnectionNumber + 1;
                if (this.reconnectionNumber <= 5) {
                  //避免无线的请求socket
                  this.Socke();
                }
              }, 2000);
            } else {
              // _userinfo.outLogin(); //返回登录
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      ws.onerror = e => {
        console.log(e);
        console.log("WebSocket发生错误: " + e.code);
      };
      ws.onclose = e => {
        console.log(
          "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        );
        let time = window.localStorage.getItem("time");
        console.log(time);
        console.log(e);
        if (e.code === 4900) {
          console.log("被挤下线了");
          if (time === e.reason) {
            this.LoginOfline();
            _userinfo.outLogin();
          }
        } else if (e.code === 1006) {
          // notification['warning']({
          // 	message: '提示！',
          // 	duration: 10,
          // 	description:
          // 		'通行服务器已经断开，正在重新连接',
          // });
        }
      };
    } catch (error) {
      console.log(error);
    }
  };

  //这里全局消息监听~~~~~
  @action onMsg = () => {
    if (window.localStorage.getItem("userName") !== null) {
      window.ws.onmessage = evt => {
        try {
          let msg = new window.proto.com.yj.itgm.protocol.BaseMsg.deserializeBinary(
            evt.data
          );
          let dataMsg = new window.proto.com.yj.itgm.protocol.BaseDataMsg.deserializeBinary(
            msg.getData()
          );
          console.log(dataMsg.getCommand());
          if (dataMsg.getCommand() === 2001) {
            let obj = new window.proto.com.yj.itgm.protocol.EquipStatusReport.deserializeBinary(
              dataMsg.getData()
            );
            console.log(obj.toObject().detailList);
            if (obj.getStatusType() === "classes_report") {
              DeviceDetection.list(
                DeviceDetection.classroomId,
                DeviceDetection.pageNo
              );
            } else if (obj.getStatusType() === "fault_report") {
              Police.list(0, 1);
              // window._guider.History.history.push({  //设备报警跳转
              // 	pathname: '/police'
              // });
            } else if (
              obj.getAccount() === window.localStorage.getItem("userName")
            ) {
              this.LoginOfline();
              _userinfo.outLogin();
            }
          } else if (dataMsg.getCommand() === 2002) {
            // console.log(dataMsg.getCommand());
            let obj = new window.proto.com.yj.itgm.protocol.IntercomCall.deserializeBinary(
              dataMsg.getData()
            );
            let detailList = obj.toObject().detailList;
            console.log("wsreturn");
            this.jumpCtr(detailList);
          }
        } catch (error) {
          console.log(error);
        }
        window.ws.onerror = evt => {
          console.log(evt);
        };
        window.ws.onclose = evt => {
          console.log(
            "websocket 断开: " +
              evt.code +
              " " +
              evt.reason +
              " " +
              evt.wasClean
          );
          console.log(evt);
          let time = window.localStorage.getItem("time");
          if (evt.code === 4900) {
            if (time !== evt.reason) return;
            this.LoginOfline();
            _userinfo.outLogin();
          }
        };
      };
    }
  };
  //鉴权发送
  @action send = (ws, jsonObj, datatype) => {
    //HANDSHAKE
    if (ws && ws.readyState === 1) {
      let timestamp = Date.parse(new Date());
      window.localStorage.setItem("time", JSON.stringify(timestamp)); //储存时间
      let baseMsg_ = new window.proto.com.yj.itgm.protocol.BaseDataMsg();
      baseMsg_.setCommand(1000);
      var baseMsg = new window.proto.com.yj.itgm.protocol.BaseMsg();
      baseMsg.setSrc(window.localStorage.getItem("userName"));
      baseMsg.setDstList([dst]);
      baseMsg.setMsgType(datatype);
      baseMsg.setSeqNo(this.seqno++);
      baseMsg.setData(baseMsg_.serializeBinary());
      baseMsg.setCrc(str2Uint8Buff("crcdata" + "___" + timestamp)); //记录当前时间，如果出现错误就在onclose判断时间是否相同，相同就退出登录
      ws.send(baseMsg.serializeBinary());
    } else {
      console.log("send error, websocket is not ready");
    }
  };
  //登录websocket
  @action wslogin = () => {
    if (window.ws && window.ws.readyState === 1) {
      let baseInof = new window.proto.com.yj.itgm.protocol.EquipLogin();
      let baseMsg_ = new window.proto.com.yj.itgm.protocol.BaseDataMsg();
      var baseMsg = new window.proto.com.yj.itgm.protocol.BaseMsg();
      baseInof.setUsername(window.localStorage.getItem("userName"));
      baseInof.setPassword(window.localStorage.getItem("password"));
      baseMsg_.setCommand(1001);
      baseMsg_.setData(baseInof.serializeBinary()); //serializeBinary() 提交返序列
      baseMsg.setSrc(window.localStorage.getItem("userName"));
      baseMsg.setDstList([dst]);
      baseMsg.setMsgType(window.proto.com.yj.itgm.protocol.MSGTYPE.DATA);
      baseMsg.setSeqNo(this.seqno++);
      baseMsg.setData(baseMsg_.serializeBinary());
      baseMsg.setCrc(str2Uint8Buff("crcdata"));

      window.ws.send(baseMsg.serializeBinary());
    }
  };

  //登录被挤下线
  LoginOfline = () => {
    notification["warning"]({
      message: "提示！",
      duration: 10,
      description: "该账号已下线，请重新登录"
    });
  };

  //开始学习红外、 send数据
  _sendHardware = dst => {
    if (window.ws && window.ws.readyState === 1) {
      let baseDataMsg_ = new window.proto.com.yj.itgm.protocol.BaseDataMsg();
      baseDataMsg_.setCommand(391);
      baseDataMsg_.hasData(false);
      let baseMsg = new window.proto.com.yj.itgm.protocol.BaseMsg();
      baseMsg.setSrc(window.localStorage.getItem("userName"));
      baseMsg.setMsgType(window.proto.com.yj.itgm.protocol.MSGTYPE.DATA);
      baseMsg.setDstList([dst]);
      baseMsg.setSeqNo(this.seqno++); //Math.ceil(Math.random() * 1000);随机数字
      baseMsg.setCrc(str2Uint8Buff("1"));
      baseMsg.setNeedAck(0); //window.proto.com.yj.itgm.protocol.MSGTYPE.ACK
      baseMsg.setData(baseDataMsg_.serializeBinary());
      window.ws.send(baseMsg.serializeBinary());
    }
  };

  //跳转到设备控制
  @action jumpCtr = async (detailList, mark) => {
    console.log("tiaoyong");
    let timer_ = 30;
    let last = detailList[detailList.length - 1];
    let array = [];
    detailList.forEach(element => {
      // array.push(element.id + ":" + element.code);
      array.push(element.idcode);
    });
    let schoolInfo =
      detailList.length > 0
        ? detailList.find(i => i.code === "school_academic_building")
        : null;
    let p = {
      buildingid: schoolInfo && schoolInfo.id,
      schoolid: window.localStorage.getItem("schoolid"),
      account: window.localStorage.getItem("userName")
    };
    let res = await skip(p);
    if (res.code === 200 && res.data === 1) {
      let Conf = confirm({
        centered: true,
        title: `是否需要跳转到${last.name}教室吗?`,
        onOk() {
          array.pop();
          window.localStorage.setItem("CtrSchoole", JSON.stringify(array));
          window.localStorage.setItem("stateE", JSON.stringify(array));
          console.log("keys", array);
          window.localStorage.setItem(
            "CtrClassrommid",
            last.id + ":" + last.code
          );
          console.log(last.id + ":" + last.code);
          window.localStorage.setItem("classroomid", last.id);
          if (mark === 1) {
            window.location.reload();
          } else {
            window._guider.History.history.push({
              //设备控制
              pathname: "/devicectl"
            });
          }
        },
        onCancel() {}
      });
      let Time = setInterval(() => {
        timer_--;
        Conf.update({
          cancelText: `取消(${timer_})`
        });
        if (timer_ <= 0) {
          Conf.destroy();
          timer_ = 30;
          clearInterval(Time);
        }
      }, 1000);
    }
  };
}

const str2Uint8Buff = strData => {
  //发送格式数据
  var x2 = new Uint8Array(strData.length);
  for (var i = 0; i < strData.length; i++) {
    x2[i] = strData.charCodeAt(i);
  }
  return x2;
};
export default new Socke();

// @observable heartCheck = {
// 	timeout: 5000,
// 	timeoutObj: null,
// 	serverTimeoutObj: null,
// 	reset: function(){
// 		clearTimeout(this.timeoutObj);
// 		clearTimeout(this.serverTimeoutObj);
// 		this.start();
// 	},
// 	start:()=>{
// 		this.timeoutObj = setTimeout(()=>{
// 			console.log('心跳中');
// 			let ws = new WebSocket('ws://172.16.3.207:18880/room');
// 			// window.ws = ws;
// 			this.Socke();
// 			// this.send(ws, {}, window.proto.com.yj.itgm.protocol.MSGTYPE.HANDSHAKE); //握手
// 			this.serverTimeoutObj = setTimeout(function(){
// 				ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
// 			}, this.timeout);
// 		}, this.timeout);
// 	},
// }
