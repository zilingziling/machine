// @flow

import { notification } from "antd";
import NProgress from "nprogress"; // https://github.com/rstacruz/nprogress
import "nprogress/nprogress.css";

// Loding progress bar globally
export const loading: Object = {
  start() {
    NProgress.start();
  },
  set(n) {
    NProgress.set(n);
  },
  inc(n) {
    NProgress.inc(n);
  },
  done() {
    NProgress.done();
  }
};

export const alert: Function = (data: {
  message: string,
  type: string,
  i: number,
  datas: number
}) => {
  notification[data.type]({
    message: "提示",
    description: data.message,
    duration: data.type === "warning" || data.type === "error" ? 3.5 : 2,
    key: data.key ? data.key : null
  });
};
