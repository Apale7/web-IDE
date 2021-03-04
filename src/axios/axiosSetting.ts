/**
 * 网络请求配置
 */
import axios from "axios";
import { getTokens, setTokens, getAccessToken } from "../cache/cache";

// axios.defaults.timeout = 10000;

let isRefreshing = false;

const refresh = (refreshToken: string) => {
  console.log("refresh");

  axios
    .post("/api/user/refresh", {
      refresh_token: refreshToken,
    })
    .then((res) => {
      if (res.data.status_code === 0) {
        console.log("refresh success, res: ", res);
        setTokens(
          res.data.data.access_token,
          res.data.data.access_exp,
          res.data.data.refresh_token,
          res.data.data.refresh_exp
        );
      }

      isRefreshing = false;
    });
};

const autoRefresh = () => {
  const [accessToken, refreshToken, accessExp, refreshExp] = getTokens();
  const now = Date.parse(new Date().toString()) / 1000;
  if (accessToken && accessExp > now) {
    return;
  }
  if (!accessToken) {
    //跳转到登录
  }
  if (accessExp <= now || (refreshToken && refreshExp > now)) {
    isRefreshing = true;
    refresh(String(refreshToken));
  } else {
    //跳转到登录
  }
};

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    if (!isRefreshing) autoRefresh();

    config.data = JSON.stringify(config.data);

    config.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.code === 2005) {
      console.log("token error");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

export default axios;
