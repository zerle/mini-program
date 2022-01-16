// pages/detail/detail.js
import errorCaptured from '../../utils/errorCaptured'
const towxml = require('../../towxml/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailList: {}
  },
  async getDetailList (id) {
    wx.showLoading({
      title: '努力加载中...',
    })
    const request = wx.cloud.callFunction({
      name: 'getDetailList',
      data: {
        id
      }
    })
    const [err, res = {}] = await errorCaptured(request)
    if (res) {
      const detailList = res.result?.data || {}
      const data = towxml(detailList.article_content, 'markdown', {
        base: 'https://6c65-leizhang-6g724hy63543cd5d-1309246810.tcb.qcloud.la'
      })
      this.setData({
        detailList: data
      })
      wx.hideLoading()
    }
  },
  goToPageTop () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetailList(options.id)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '来自张垒博客的转发'
    }
  }
})