//app.js
// var mockData = require('/assets/utils/mock/data.js');
var API_HOST = "https://www.youtasc.com";
var DEBUG = false;//切换数据入口
// var Mock = require('/assets/utils/mock/mock.js')
// var http = require('/assets/utils/mock/login.js')
App({
  data:{
    h_url: API_HOST,
    load:true
  },
  onLaunch: function () {

  },
  //模拟数据
  ajax: function (url = '', fn, method = "get", data = {}) {
      if (!DEBUG) {
        wx.request({
          url: API_HOST + url,
          method: method ? method : 'get',
          data: data ? data : {},
          header: this.header ? this.header : { "Content-Type": "application/json" },
          success: function (res) {
            fn(res);
          }
        });
      } else {
        // 模拟数据
        var res = Mock.mock(mockData.data[url])
        // 输出结果
        // console.log(JSON.stringify(res, null, 2))
        fn(res)
      }
  },
  globalData: {
    userInfo: null
  }
})