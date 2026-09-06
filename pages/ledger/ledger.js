const { getData } = require('../../utils/store')
Page({
  data: { ledger:{}, members:[], records:[] },
  onShow(){ const d=getData(); this.setData({ledger:d.ledger,members:d.members,records:d.records}) },
  addRecord(){ wx.navigateTo({url:'/pages/record/record'}) },
  invite(){ wx.showShareMenu({menus:['shareAppMessage']}); wx.showToast({title:'可从右上角分享邀请',icon:'none'}) },
  onShareAppMessage(){ return {title:`邀请你加入「${this.data.ledger.name}」`,path:'/pages/index/index?ledger=l1'} }
})
