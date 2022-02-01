const path = require("path");

module.exports = {
  "transpileDependencies": [
  ],

  publicPath: process.env.NODE_ENV === 'production'
  ? '/adele/'
  : '/',

  //css: { extract: false },

  chainWebpack: config => {
    config.module
        .rule("vue")
        .use("vue-svg-inline-loader")
            .loader("vue-svg-inline-loader")
            .options({ /* ... */ });
}

}
