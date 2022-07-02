const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist/app/salmi/',
  publicPath: '/app/salmi/', // (1) https://medium.com/js-dojo/how-to-solve-vue-js-prod-build-assets-relative-path-problem-71f91138dd79
  pwa: {
    manifestOptions: {
      version: '0.1',
      orientation: 'any',
      // screenshots : [
      //   {
      //     "src": "screenshot1.webp",
      //     "sizes": "1280x720",
      //     "type": "image/webp",
      //     "platform": "wide",
      //     "label": "Homescreen of Awesome App"
      //   },
      //   {
      //     "src": "screenshot2.webp",
      //     "sizes": "1280x720",
      //     "type": "image/webp",
      //     "platform": "wide",
      //     "label": "List of Awesome Resources available in Awesome App"
      //   }
      // ],
      // shortcuts : [
      //   {
      //     "name": "Today's agenda",
      //     "url": "/today",
      //     "description": "List of events planned for today"
      //   },
      //   {
      //     "name": "New event",
      //     "url": "/create/event"
      //   },
      //   {
      //     "name": "New reminder",
      //     "url": "/create/reminder"
      //   }
      // ]
    }
  }
})
