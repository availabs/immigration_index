// Sync route definition
export default (store) => ({
  path : 'team',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const AboutView = require('./components/Team').default
      cb(null, AboutView)
    }, 'about')
  }
})
