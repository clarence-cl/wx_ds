// pages/ptList/ptList.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    nowListData:[],
    willListData:[],
    listOnoff:true,
    load_onoff: false
  },
  ptlistData: function (categoryId, pintuanKeyWord,byOpenOrNext,num){
    app.ajax("/shops/client/pinTuanListByTopCategory.action", (res) => {
      console.log(res.data)
      for (let i = 0; i < res.data.rows.length; i++){
        res.data.rows[i].start_time = (res.data.rows[i].start_time).split("-")[1] + "月" + (res.data.rows[i].start_time).split("-")[2] + "日"
        res.data.rows[i].end_time = (res.data.rows[i].end_time).split("-")[1] + "月" + (res.data.rows[i].end_time).split("-")[2]+"日"
      }
      if (byOpenOrNext==1){
        this.setData({
          nowListData: res.data.rows.concat(this.data.nowListData),
          total: res.data.count,
          load_onoff: false
        })
        if (this.data.nowListData.length == 0) {
          
        }
      }else{
        this.setData({
          willListData: res.data.rows.concat(this.data.willListData),
          total: res.data.count,
          load_onoff: false
        })

      }
    }, "post",{
        rows: 10,
        page: num,
        categoryId: categoryId,
        query_params: pintuanKeyWord,
        filter: byOpenOrNext //切换 1正在拼团 0拼团预告
    }) 
  },
  nowPt:function(){
    this.setData({
      listOnoff: true,
      filter:1
    })
  },
  previewPt:function(){
    this.setData({
      listOnoff: false,
      filter:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      categoryId: options.categoryId ? options.categoryId:'',
      pintuanKeyWord: options.keyWord ? options.keyWord:'',
      filter:1
    })
    this.ptlistData(this.data.categoryId, this.data.pintuanKeyWord, 1, this.data.pageNum)
    this.ptlistData(this.data.categoryId, this.data.pintuanKeyWord, 0, this.data.pageNum)
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
  // onPullDownRefresh: function () {
  
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1,
      load_onoff: true
    })
    if (this.data.pageNum>=Math.ceil(this.data.total / 10)){
     this.setData({
       bottom:true,
       load_onoff: false
     })
    }else{
      setTimeout(() => {
        this.ptlistData(this.data.categoryId, this.data.pintuanKeyWord, this.data.filter, this.data.pageNum)
      }, 500)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})