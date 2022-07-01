const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist/app/salmi/',
  publicPath: '/app/salmi/', // (1) https://medium.com/js-dojo/how-to-solve-vue-js-prod-build-assets-relative-path-problem-71f91138dd79
  pwa: {
    manifestOptions: {
      version: '0.1',
    }
  }
})
