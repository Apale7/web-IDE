const { createProxyMiddleware } = require("http-proxy-middleware");
// 1.0以下 的版本用下面的方式引入模块
//const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3456/",
      changeOrigin: true,
    })
  );
  //......多个配置
  app.use(
    createProxyMiddleware("/upload", {
      target: "http://localhost:7777/",
      changeOrigin: true,
    })
  );
};
