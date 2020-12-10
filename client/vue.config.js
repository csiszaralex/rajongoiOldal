module.exports = {
  // Hiba nélküli távoli teszthez kell csak, de ilyenkor nincs http://localhost:8080 a fejlesztő gépen
  // A frontend fordítását újra kell indítani!
  // Az ip számot írd át a frontend Network címére és portjára, pl.:
  // devServer: {
  //   host: "192.168.1.68",
  //   port: 8080
  // },
  configureWebpack: config => {
    config.devtool = "source-map";
  }
};
