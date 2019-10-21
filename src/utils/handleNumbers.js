export function mobileValidator(rule, value, callback) {
  if (value) {
    const reg = /^1[3|4|5|6|7|8|9|0|2|1][0-9]{9}$/;
    if (!reg.test(value)) {
      callback("请输入正确的电话号码!");
    }
  }
  callback();
}
export function getUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const EventUtil = {
  addHandle: function(element, type, handle) {
    if (element.addEventListener) {
      element.addEventListener(type, handle);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handle);
    } else {
      element["on" + type] = handle;
    }
  },
  removeHandle: function(element, type, handle) {
    if (element.removeEventListener) {
      element.removeListener(type, handle);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handle);
    } else {
      element["on" + type] = null;
    }
  }
};
