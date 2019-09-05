export function mobileValidator(rule, value, callback) {
  if (value) {
    const reg = /^1[3|4|5|6|7|8|9|0|2|1][0-9]{9}$/;
    if (!reg.test(value)) {
      callback("请输入正确的电话号码!");
    }
  }
  callback();
}
