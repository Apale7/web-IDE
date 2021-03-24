function set(k: string, v: string) {
    localStorage.setItem(`web_ide_${k}`, v);
  }
  
  function get(k: string) {
    const v = localStorage.getItem(`web_ide_${k}`);
    if (!v) return "";
    return v;
  }
  
  function storeLanguage(language: number) {
    set(`language`, `${language}`);
  }
  
  function getLanguage(): number {
    const l = get("language");
    if (l === "" || isNaN(Number(l))) return 0;
    return Number(l);
  }
  
  function storeCode(language: number, code: string) {
    set(String(language), code);
  }
  
  function getCode(language: number) {
    return get(String(language));
  }
  
  function setTokens(
    accessToken: string,
    accessExp: number,
    refreshToken: string,
    refreshExp: number
  ) {
    // console.log('setTokens called');
    
    set("access_token", accessToken);
    set("refresh_token", refreshToken);
    set("refresh_exp", String(refreshExp));
    set("access_exp", String(accessExp));
  }
  
  function getTokens() {
    const accessToken = get("access_token");
    const refreshToken = get("refresh_token");
    const accessExp = Number(get("access_exp"));
    const refreshExp = Number(get("refresh_exp"));
    return [accessToken, refreshToken, accessExp, refreshExp];
  }
  
  function getAccessToken() {
    const accessToken = get("access_token");
    return accessToken;
  }
  
  function getAuth() {
    if (get("auths") === "") return [];
    let auths: string[];
    auths = JSON.parse(get("auths"));
    return auths;
  }
  
  function setAuth(auths: string[]) {
    set("auths", JSON.stringify(auths));
  }
  
  function setUserID(userID: number) {
    set("user_id", userID.toString());
  }
  
  function getUserID() {
    return Number(get("user_id"))
  }
  
  export {
    storeLanguage,
    getLanguage,
    storeCode,
    getCode,
    setTokens,
    getTokens,
    getAccessToken,
    getAuth,
    setAuth,
    setUserID,
    getUserID
  };
  