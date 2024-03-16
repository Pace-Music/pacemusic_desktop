const { defineConfig } = require('@vue/cli-service');
const packageJson = require('./package.json');

const protocolName = packageJson.protocol

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "assets",
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: `${protocolName}://`,
      protocols: [
        {
          name: 'Pace Music Protocol',
          schemes: [protocolName],
        },
      ],
      builderOptions: {
        appId: 'vkidik.com.pacemusic',
        productName: "Pace Music",
        compression: "maximum",
        publish: ['github'],
        win: {
            icon: 'icons/512.png'
        },
        directories: {
          output: "dist_electron"
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'].PACKAGE_VERSION = JSON.stringify(packageJson.version);
      return args;
    });
  }
})
