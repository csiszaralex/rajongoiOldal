module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/../node_modules/bootstrap/scss/bootstrap.scss";`
      }
    }
  }
};
