const { getData, addCheckin } = require('../../utils/store')
Page({
  data:{text:'',images:[],habit:{}},
  onLoad(){this.setData({habit:getData().habit})},
  onInput(e){this.setData({text:e.detail.value})},
  chooseImage(){wx.chooseMedia({count:3-mediaCount(this.data.images),mediaType:['image'],success:r=>this.setData({images:this.data.images.concat(r.tempFiles.map(x=>x.tempFilePath))})})},
  submit(){ if(!this.data.text.trim()&&!this.data.images.length){wx.showToast({title:'写点内容或添加照片吧',icon:'none'});return} addCheckin({text:this.data.text||'用照片记录今日打卡',image:this.data.images[0]||''}); wx.showToast({title:'打卡成功'}); setTimeout(()=>wx.navigateBack(),600) }
})
function mediaCount(list){return list.length}
