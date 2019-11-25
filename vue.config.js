const path = require("path");

module.exports = {
  "transpileDependencies": [
  ],

  chainWebpack: config => {
    config.module
        .rule("vue")
        .use("vue-svg-inline-loader")
            .loader("vue-svg-inline-loader")
            .options({ /* ... */ });
}

}
