import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    if (localStorage.getItem("token")) {
      config.headers.Authorization = ('Bearer '+localStorage.getItem("token")) || "";
    }
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    if (res.status == 200) {
      return res.data;
    }
  },
  (err: AxiosError) => {
    const status: any = err.response && err.response.status;
    if (status === 400) {
      ElMessage("请求参数错误");
    }
    if (status === 401) {
      ElMessage("没有权限");
    }
    if (status === 403) {
      ElMessage("登录过期");
    }
    if (status === 404) {
      ElMessage("请求路径错误");
    }
    if (status === 500) {
      ElMessage("服务器出错");
    }
    if (status === 503) {
      ElMessage("服务器在维护");
    }
    return Promise.reject(err);
  }
);

export default service;
