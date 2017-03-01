
export default (store) => ({
  path : 'processing',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Processing = require('./components/Processing').default
      cb(null, Processing)
    }, 'data')
  }
})

