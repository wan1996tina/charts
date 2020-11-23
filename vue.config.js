module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,

    proxy: {
      '/api': {
        // target: 'https://data.wra.gov.tw/Service/OpenData.aspx?format=json&id=2D09DB8B-6A1B-485E-88B5-923A462F475C', // 這裡後台的地址模擬的，應該填寫真實的後台api
        target: 'http://192.168.14.107:5000/getdata/predict_demo',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }
}
