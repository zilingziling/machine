const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/deviceapi", {
      target: "http://172.16.3.21:8099",
      // target: "http://172.16.3.207:8099",
      secure: false,
      changeOrigin: true
    })
  );
};
