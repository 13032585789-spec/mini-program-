const { getData, updateHabit, updateLedger } = require('../../utils/store')
const currencies=[{name:'人民币 CNY',currency:'CNY',symbol:'¥'},{name:'美元 USD',currency:'USD',symbol:'$'},{name:'欧元 EUR',currency:'EUR',symbol:'€'}]
Page({
  data:{ledger:{},habit:{},currencyName:'人民币 CNY'},
  onShow(){const d=getData();const c=currencies.find(x=>x.currency===d.ledger.currency)||currencies[0];this.setData({ledger:d.ledger,habit:d.habit,currencyName:c.name})},
  login(){ wx.getUserProfile({desc:'用于完善成员资料',success(){wx.showToast({title:'微信资料已同步'})},fail(){wx.showToast({title:'已使用体验身份',icon:'none'})}}) },
  renameLedger(){wx.showModal({title:'账本名称',editable:true,placeholderText:this.data.ledger.name,success:r=>{if(r.confirm&&r.content.trim()){updateLedger({name:r.content.trim()});this.onShow()}}})},
  chooseCurrency(){wx.showActionSheet({itemList:currencies.map(x=>x.name),success:r=>{updateLedger(currencies[r.tapIndex]);this.onShow()}})},
  chooseFrequency(){const opts=['每天','工作日','每周 3 次'];wx.showActionSheet({itemList:opts,success:r=>{updateHabit({frequency:opts[r.tapIndex]});this.onShow()}})},
  editPenalty(){wx.showModal({title:'每次惩罚金额',editable:true,placeholderText:String(this.data.habit.penalty),success:r=>{const n=Number(r.content);if(r.confirm&&n>=0){updateHabit({penalty:n,penaltyType:'money'});this.onShow()}}})}
})
