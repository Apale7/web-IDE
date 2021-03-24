import { getTokens } from "../cache/cache";

const isLogin = () => {
  // return true; // in dev env
  const [accessToken, refreshToken, accessExp, refreshExp] = getTokens()
  const now = Date.parse(new Date().toString()) / 1000;
  return accessToken && accessExp > now;
};

export { isLogin };
