App({
  globalData: {
    user: { id: 'u1', name: '小柚', avatar: '', color: '#FFCA28' }
  },
  onLaunch() {
    const { seed, evaluateMissedCheckin } = require('./utils/store')
    seed()
    evaluateMissedCheckin()
  }
})
