// Sync route definition
export default (store) => ({
  path : 'overview',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const AboutView = require('./components/OverView').default
      cb(null, AboutView)
    }, 'overview')
  }
})
