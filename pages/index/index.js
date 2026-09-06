const { getData } = require('../../utils/store')
Page({
  data: { ledger: {}, habit: {}, members: [], checkins: [], records: [], todayDone: false, countdown: '08:24', memberColors: {} },
  onShow() {
    const d = getData(); const colors = {}
    d.members.forEach(m => colors[m.id] = m.color)
    const members = d.members.map(m => ({ ...m, initial: m.name.substr(0, 1) }))
    const checkins = d.checkins.slice(0, 2).map(c => ({ ...c, initial: c.name.substr(0, 1) }))
    this.setData({ ledger: d.ledger, habit: d.habit, members, checkins, records: d.records.slice(0,3), todayDone: d.todayDone, memberColors: colors })
  },
  goCheckin() { wx.navigateTo({ url: '/pages/checkin/checkin' }) },
  goLedger() { wx.switchTab({ url: '/pages/ledger/ledger' }) }
})
