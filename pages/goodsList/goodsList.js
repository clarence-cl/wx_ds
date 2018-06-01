// pages/goodsList/goodsList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    layout_onoff: false,
    classify_onoff: false,
    load_onoff: true,
    active: true,
    categoryId: "",
    classifyName: "分类",
    goodsData: [],
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  layout_switch: function () {
    this.setData({
      layout_onoff: !this.data.layout_onoff
    })
  },
  classify_switch: function () {
    this.setData({
      classify_onoff: !this.data.classify_onoff
    })
  },
  listData: function (categoryId, goodsKeyWord, bySettlement, byOrderCount, num) {
    app.ajax("/shops/client/goodsListByTopCategory.action", (res) => {
      console.log(res)
      for (let index in res.data.rows) {
        res.data.rows[index]["coll"] = parseInt((res.data.rows[index].goods_sn).slice(10, 11) * res.data.rows[index].settlement_fee)
      }
      this.setData({
        goodsData: res.data.rows,
        total: res.data.total

      })
    }, "post", {
        rows: 10,//显示数量
        page: num,//页数
        categoryId: categoryId,//分类id
        goodsInfoParam: goodsKeyWord,//关键词
        orderBySettlement: bySettlement,//订单结算
        settlementOrderDesc: false,
        orderByOrderedCount: byOrderCount
      })
  },
  //价格 settlementSort
  pirce: function () {
    this.setData({
      classify_onoff: false,
      byOrderCount: "",//销量排序标识
      bySettlement: "1",
      active: true
    })
    if (this.data.categoryId) {
      this.listData(this.data.categoryId, this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    } else {
      this.listData("7798ed1a828e4f80b62fc3104e8ad725", this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    }
  },
  //销量 
  saleVolume: function () {
    this.setData({
      classify_onoff: false,
      bySettlement: "",//价格排序标识
      byOrderCount: 1,
      active: false
    })
    if (this.data.categoryId) {
      this.listData(this.data.categoryId, this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    } else {
      this.listData("76b96799ca6545baa81a9ca76f71b03e", this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    }
  },
  //根据分类获取列表
  categoryList: function (e) {
    this.listData(e.currentTarget.dataset.category_id, this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    this.setData({
      categoryId: e.currentTarget.dataset.category_id,
      classify_onoff: false,
      classifyName: e.currentTarget.dataset.name
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      categoryId: options.category_id ? options.category_id : '7798ed1a828e4f80b62fc3104e8ad725',
      goodsKeyWord: "",
      bySettlement: "1",//价格排序标识1
      byOrderCount: "byOrderCount"//销量排序标识1
    })
    this.listData(this.data.categoryId, this.data.goodsKeyWord, this.data.bySettlement, this.data.byOrderCount, this.data.pageNum)
    //分类
    app.ajax("/shops/client/categoryList.action", (res) => {
      this.setData({
        classifyData: res.data
      })
    }, "post")
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
      pageNum: this.data.pageNum + 1,
      load_onoff: true
    })
    if (this.data.pageNum >= Math.ceil(this.data.total / 10)) {
      this.setData({
        bottom: true
      })
      return
    } else {
      setTimeout(() => {
        app.ajax("/shops/client/goodsListByTopCategory.action", (res) => {
          console.log(res)
          for (let index in res.data.rows) {
            res.data.rows[index]["coll"] = parseInt((res.data.rows[index].goods_sn).slice(10, 11) * res.data.rows[index].settlement_fee)
          }
          this.setData({
            goodsData: (res.data.rows).concat(this.data.goodsData),
            total: res.data.total,
            load_onoff: false
          })
        }, "post", {
            rows: 10,//显示数量
            page: this.data.pageNum,//页数
            categoryId: this.data.categoryId,//分类id
            goodsInfoParam: this.data.goodsKeyWord,//关键词
            orderBySettlement: this.data.bySettlement,//订单结算
            settlementOrderDesc: false,
            orderByOrderedCount: this.data.byOrderCount
          })
      }, 500)
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})