const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, disableEsLint } = require('customize-cra');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = override(
	disableEsLint(),

	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		javascriptEnabled: true,
		// modifyVars: { '@primary-color': '#2D57BE' },
	}),

	addDecoratorsLegacy(),
);

// const PrerenderSPAPlugin = require('prerender-spa-plugin');
// const path = require('path');
// module.exports = (config, env) => {
// 	if (env === 'production') {
// 		config.plugins = config.plugins.concat([
// 			new PrerenderSPAPlugin({
// 				routes: [
// 					'/', '/login', '/role', '/user', '/update', '/TouchUpdate', '/devicesele', '/device', '/police', '/devicesate', '/devicectl', '/operating',
// 					'/TouchUpdateTable', '/updateTable', '/deviceScene', '/menu', '/deviceAdd', '/region', '/aiUpdate', '/updateTableAi'
// 				],
// 				staticDir: path.join(__dirname, 'build'),
// 			}),
// 		]);
// 	}

// 	return config;
// };
