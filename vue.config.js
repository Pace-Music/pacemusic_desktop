const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir : "assets",
  productionSourceMap : false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, // Add this line
      builderOptions: {
        // Other electron-builder options...
      }
    }
  }
})
