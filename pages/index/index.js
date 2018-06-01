// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
    ],
    topNum:0,
    load:false,
    hotSaleData:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pagenum:1,
    navData: [
      {
        name: "拼团",
        id:"b8a17abfd04a40739f17b1722f8e0f06",
        imgUrl: "../../assets/images/pt.png"
      },
      {
        name: "家纺",
        id: "76b96799ca6545baa81a9ca76f71b03e",
        imgUrl: "../../assets/images/jf.png"
      }, {
        name: "家居",
        id: "7798ed1a828e4f80b62fc3104e8ad725",
        imgUrl: "../../assets/images/jj.png"
      }, {
        name: "运动",
        id: "3ce13ad77e2b4321923558e6b97a6f04",
        imgUrl: "../../assets/images/yd.png"
      }, {
        name: "美妆",
        id: "4ab179fa47234d53919a101bae7390f1",
        imgUrl: "../../assets/images/mz.png"
      }, {
        name: "生活",
        id: "5e8b886939c143c2acce17ba1dfde00f",
        imgUrl: "../../assets/images/sh.png"
      }, {
        name: "食品",
        id: "d6d50543e0bb47099252480172fa674c",
        imgUrl: "../../assets/images/sp.png"
      }, {
        name: "母婴",
        id: "075aaacb99854db6b1fc345515c542e5",
        imgUrl: "../../assets/images/muy.png"
      }, {
        name: "手机",
        id: "f9631fafc54d4d728b512054202acf46",
        imgUrl: "../../assets/images/sj.png"
      }, {
        name: "家电",
        id: "622e39135eb540a98b982911a8fbdc52",
        imgUrl: "../../assets/images/jd.png"
      }]
  },
  toDetail: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      this.toWebsite(e.currentTarget.dataset.type_param)
    } else if (e.currentTarget.dataset.type == 2) {
      this.toGoodsDetail(e.currentTarget.dataset.type_param)
    } else if (e.currentTarget.dataset.type == 3) {
      this.toPinTuanDetail(e.currentTarget.dataset.type_param)
    }
    // currentTarget.dataset.type_param
  },
  toWebsite: function (a_url) {
    wx.navigateTo({
      url: a_url
    }) 
  },
  //详情
  toGoodsDetail: function (goods_id) {
    wx.navigateTo({
      url: '/pages/ptDetail/ptDetail?pinTuanId=' + goods_id,
    })
  },
  //拼团
  toPinTuanDetail: function (pt_id) {
    wx.navigateTo({
      url: '/pages/ptDetail/ptDetail?pinTuanId='+pt_id,
    })
  },
  //列表
  togoodsList:function(e){
    if (e.currentTarget.dataset.til=="拼团"){
      wx.navigateTo({
        url: '/pages/ptList/ptList?category_id=' + e.currentTarget.dataset.category_id
      })
    }else{
      wx.navigateTo({
        url: '/pages/goodsList/goodsList?category_id=' + e.currentTarget.dataset.category_id
      })
    }
  },
  //我的
  tomy:function(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //热销
  hotsale:function(){
    app.ajax("/index.php/index/index/weixin_hotgoods", (res) => {
      for (let index in res.data) {
        res.data[index]["goods_cover"] =
          this.data.h_url + "/shops/files/" + (res.data[index].goods_cover).split("/images")[1]
        res.data[index]["coll"] = parseInt((res.data[index].goods_sn).slice(10, 11) * res.data[index].settlement_fee)
      }
      this.setData({
        hotSaleData: res.data.concat(this.data.hotSaleData),
        load:false
      })
    }, "get", {
        page: this.data.pagenum,
        rows: 10
      })
  },
  toTop: function () { 
    wx.pageScrollTo({
      scrollTop: 0
    })
  }, 
  //搜索
  search:function(e){
    if (e.detail.value=''){
      wx.showModal({
        title: '提示',
        content: '搜索关键字不能为空',
      })
    }else{
      var search_type = 1;
      if (search_type == '1'){
        wx.navigateTo({
          url: '/pages/goodsList/goodsList?keyword='+e.detail.value,
        })
      } else if (earch_type == '2'){
        wx.navigateTo({
          url: '/pages/ptList/ptList?keyword='+e.detail.value,
        })
      }
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hotsale()
    this.setData({
      h_url:app.data.h_url
    })
    app.ajax("/shops/client/activityList.action?location=10", (res) => {
      this.setData({
        imgUrls: res.data
      })
    }, "post")
    app.ajax("/shops/client/activityList.action?location=20", (res) => {
      this.setData({
        adsenseData: res.data[0]
      })
    }, "post")
    //推荐
    app.ajax("/index.php/index/index/weixin_recommend",(res)=>{
      for (let index in res.data) {
        res.data[index]["goods_cover"]=
        this.data.h_url + "/shops/files/" + (res.data[index].goods_cover).split("/images")[1]
        res.data[index]["coll"] = parseInt((res.data[index].goods_sn).slice(10, 11) * res.data[index].settlement_fee)
      }
      this.setData({
        recommendData: res.data
      })
    })
  }, 
  
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pagenum: this.data.pagenum + 1,
      load:true
    })
    setTimeout(()=>{
      this.hotsale()
    },500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  }
})