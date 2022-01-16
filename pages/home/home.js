// pages/home/home.js
import errorCaptured from '../../utils/errorCaptured'
const moment = require('moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    search: '',
  },
  limit: 8,
  pageNo: 0,
  isFlag: false,
  async getArticleList (pageNo = 0) {
    wx.showLoading({
      title: '努力加载中...',
    })
    const request = wx.cloud.callFunction({
      name: 'getArticleList',
      data: {
        index: pageNo,
        limit: this.limit
      }
    })
    const [err, res = {}] = await errorCaptured(request)
    if (res) {
      let articleList = res.result?.data || []
      articleList = articleList.map(item => {
        item.addTime = moment.unix(item.addTime).format('YYYY-MM-DD')
        return item
      })
      if (articleList.length < this.limit) {
        this.isFlag = true
      }
      this.setData({
        articleList: [...this.data.articleList, ...articleList]
      })
      wx.hideLoading()
    }
  },
  addArticelList () {
    if (this.isFlag) return false
    console.log('到底了')
    this.pageNo++
    this.getArticleList(this.pageNo * this.limit)
  },
  goToDetail (evt) {
    const {id} = evt.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  handleInputChange (evt) {
    const searchContent = evt.detail.value.trim()
    this.setData({
      searchContent
    })
  },
  clearSearchContent () {
    this.setData({
      searchContent: ''
    })
  },
  search (value) {
    if(!value.trim()) return Promise.resolve([])
    const request = wx.cloud.callFunction({
      name: 'getlistBySearchVal',
      data: {
        value
      }
    })
    return errorCaptured(request).then(([err, res]) =>{
      return res?.result?.data.map(item => {
        return {
          text: item.title,
          id: item._id
        }
      })
    })
  },
  selectResult (e) {
    console.log(e, '搜索结果')
    const {id} = e.detail.item
    if (!id) return false
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticleList()
    this.setData({
      search: this.search
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