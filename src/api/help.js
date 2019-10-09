import { makeRequest, validations } from "./config";
import { Help, LOGIN } from "./url";
export const getVer = () => {
  return makeRequest(Help.select);
};
export const getDetail = name => {
  const params = new URLSearchParams();
  params.append("vername", name);
  return validations(Help.detail, params);
};
