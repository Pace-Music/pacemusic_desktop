const { defineConfig } = require('@vue/cli-service')
const packageJson = require('./package.json');

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir : "assets",
  productionSourceMap : false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].PACKAGE_VERSION = JSON.stringify(packageJson.version);
      return args;
    });
  }
})
