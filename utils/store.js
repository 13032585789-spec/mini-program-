const KEY = 'penalty_ledger_v1'

const initial = {
  ledger: { id: 'l1', name: '早起行动派', currency: 'CNY', symbol: '¥', balance: 186, streak: 12 },
  members: [
    { id: 'u1', name: '小柚', color: '#FFD43B' },
    { id: 'u2', name: '阿北', color: '#A9D8C1' },
    { id: 'u3', name: '小林', color: '#AEC9FF' },
    { id: 'u4', name: '安安', color: '#FFC1AD' }
  ],
  habit: { title: '23:00 前早睡打卡', time: '23:00', frequency: '每天', penaltyType: 'money', penalty: 10 },
  checkins: [
    { id: 'c1', userId: 'u2', name: '阿北', time: '08:16', text: '晨跑 3 公里，今天状态不错！', image: '', liked: true },
    { id: 'c2', userId: 'u3', name: '小林', time: '07:42', text: '今日份早起完成 ☀️', image: '', liked: false }
  ],
  records: [
    { id: 'r1', userId: 'u4', name: '安安', type: 'penalty', amount: 10, note: '昨日未按时早睡', date: '今天 00:01', auto: true },
    { id: 'r2', userId: 'u2', name: '阿北', type: 'income', amount: 50, note: '本周挑战奖金池', date: '昨天 20:30', auto: false },
    { id: 'r3', userId: 'u1', name: '小柚', type: 'penalty', amount: 5, note: '迟到 5 分钟', date: '9月4日 09:35', auto: false }
  ],
  todayDone: false,
  lastOpenDate: ''
}

function clone(data) { return JSON.parse(JSON.stringify(data)) }
function seed() { if (!wx.getStorageSync(KEY)) wx.setStorageSync(KEY, clone(initial)) }
function getData() { seed(); return wx.getStorageSync(KEY) }
function save(data) { wx.setStorageSync(KEY, data); return data }
function addCheckin(item) {
  const data = getData()
  data.checkins.unshift({ id: 'c' + Date.now(), userId: 'u1', name: '小柚', time: now(), liked: false, ...item })
  data.todayDone = true
  data.lastOpenDate = dateKey()
  data.ledger.streak += 1
  return save(data)
}
function updateHabit(patch) { const data = getData(); data.habit = { ...data.habit, ...patch }; return save(data) }
function updateLedger(patch) { const data = getData(); data.ledger = { ...data.ledger, ...patch }; return save(data) }
function evaluateMissedCheckin() {
  const data = getData(); const today = dateKey()
  if (!data.lastOpenDate) { data.lastOpenDate = today; return save(data) }
  if (data.lastOpenDate !== today) {
    if (!data.todayDone) {
      const money = data.habit.penaltyType === 'money'
      data.records.unshift({ id:'auto'+Date.now(), userId:'u1', name:'小柚', type:'penalty', amount: money ? Number(data.habit.penalty) : 0, note: money ? `未完成：${data.habit.title}` : String(data.habit.penalty), date:'系统补记 · 昨日', auto:true })
      if (money) data.ledger.balance += Number(data.habit.penalty)
    }
    data.todayDone = false; data.lastOpenDate = today
    return save(data)
  }
  return data
}
function addRecord(item) {
  const data = getData()
  data.records.unshift({ id: 'r' + Date.now(), userId: 'u1', name: '小柚', date: '刚刚', auto: false, ...item })
  if (item.type === 'penalty') data.ledger.balance += Number(item.amount || 0)
  return save(data)
}
function now() { const d = new Date(); return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}` }
function dateKey() { const d=new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` }
module.exports = { seed, getData, save, addCheckin, addRecord, updateHabit, updateLedger, evaluateMissedCheckin }
