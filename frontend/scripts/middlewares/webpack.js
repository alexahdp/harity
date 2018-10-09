const webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = function (compiler, publicPath) {
	return webpackDevMiddleware(compiler, {
		noInfo: true,
		publicPath,
		silent: true,
		stats: 'errors-only'
	});
};
