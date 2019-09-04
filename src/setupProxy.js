const proxy = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(proxy('/deviceapi',
		{
			'target': 'http://172.16.3.207:8081',
			// 'target': 'http://172.16.389.207:8081',
			'secure': false,
			'changeOrigin': true
		}
	));
};