/**
 * 网络请求配置
 */
 import axios from "axios";
 import { AxiosRequestConfig } from "axios";
 import { getAccessToken, getTokens, setTokens } from "../cache/cache";
 import { createBrowserHistory } from "history";
 // axios.defaults.timeout = 10000;
 const axiosForRefresh = axios.create()
 const history = createBrowserHistory();
 const refresh = async (refreshToken: string) => {
 
   const res = await axiosForRefresh.post("/api/user/refresh", {
     refresh_token: refreshToken,
   });
   console.log('refresh res', res);
   
   if (!res || res.data.status_code !== 0) {
     history.push("/login");
     return;
   }
   console.log("refresh success, res: ", res);
   setTokens(
     res.data.data.access_token,
     res.data.data.access_exp,
     res.data.data.refresh_token,
     res.data.data.refresh_exp
   );
 };
 
 const autoRefresh = async () => {
   const [accessToken, refreshToken, accessExp, refreshExp] = getTokens();
   const now = Date.parse(new Date().toString()) / 1000;
   if (accessToken && accessExp > now) {
     return;
   }
   if (!accessToken) {
     history.push("/login");
     return;
   }
   if (accessExp <= now || (refreshToken && refreshExp > now)) {
     await refresh(String(refreshToken));
   } else {
     //refreshToken不存在或已过期
     history.push("/login");
     return;
   }
 };
 
 /**
  * http request 拦截器
  */
 axios.interceptors.request.use(
   async (config) => {
     await autoRefresh();
 
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
 
 const get = (url: string, config: AxiosRequestConfig | undefined) => {
   if (config)
     config.headers = {
       "Content-Type": "multipart/from-data",
       // Authorization: `Bearer ${getAccessToken()}`,
     };
   return axios.get(url, config);
 };
 
 export default axios;
 export { get };
 