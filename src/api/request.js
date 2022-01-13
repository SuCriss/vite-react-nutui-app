import axios from "axios";
import _ from "lodash";
import config from "../../config";
import { stringify } from "qs";
import { Toast } from "@nutui/nutui-react";
const MODE = import.meta.env.MODE;

const base = config[MODE];
const _request = axios.create({
  baseURL: base.baseUri,
  timeout: base.timeout ? base.timeout : 6000,
});
_request.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      // "Content-Type":'application/x-www-form-urlencoded',//传参方式表单
      "Content-Type": "application/json;charset=UTF-8", //传参方式json
      //   token: "80c483d59ca86ad0393cf8a98416e2a1",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

_request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出但不是在2xx范围
      //   showMessage(response.status);
      return Promise.reject(response.data);
    } else {
      Toast.warn("网络连接异常，请稍后再试！");
    }
  }
);

const getRequest = (method) => {
  return (url, params, options = {}) => {
    return _request({
      method,
      url,
      ...(method === "POST"
        ? {
            data: options.string ? stringify(params) : params,
          }
        : {}),
      params: method === "GET" ? params : options.params,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": options.string
          ? "application/x-www-form-urlencoded"
          : "application/json",
        ...options.headers,
      },
      withCredentials: true,
    })
      .then((res) => {
        if (typeof res.data !== "object") {
          console.log("Response struct error", res.data);
          return Promise.reject(res);
        }
        return res.data;
      })
      .catch((err) => {
        console.log("internal error", "X(");
        return Promise.reject(err);
      });
  };
};

export const get = getRequest('GET')
export const post = getRequest('POST')