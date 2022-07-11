const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "scss/mixins.scss";
          @import "scss/variables.scss";
          @import "scss/functions.scss";
        `
      }
    }
  }
})