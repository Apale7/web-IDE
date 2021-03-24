import axios from "axios";
import { setAuth, setTokens, setUserID } from "../cache/cache";

interface loginInfo {
  username: string;
  password: string;
}

interface loginResult {
  result: boolean;
  message: string;
}
const login = async (info: loginInfo) => {
  if (!valid(info))
    return { result: false, message: "invalid username or password" };

  const res = await axios.post("/api/user/login", {
    username: info.username,
    password: info.password,
  });
  let result: loginResult = { result: false, message: "" };
  if (!res) {
    console.log("服务器错误");
    result.message = "服务器错误";
    return result;
  }

  if (res.data.status_code !== 0) {
    console.log("用户名或密码错误");
    result.message = "用户名或密码错误";
    return result;
  }
  console.log(res);
  result.message = "登录成功";
  result.result = true;
  setTokens(
    res.data.data.access_token,
    res.data.data.access_exp,
    res.data.data.refresh_token,
    res.data.data.refresh_exp
  );

  console.log(
    `exp after ${
      (res.data.data.access_exp - Date.parse(new Date().toString()) / 1000) / 60
    } minutes`
  );
  console.log(res.data.data.auth);
  setAuth(res.data.data.auth);
  setUserID(res.data.data.user_id);
  return result;
};

const valid = (info: loginInfo) => {
  return info.username !== "" && info.password !== "";
};

export { login };
