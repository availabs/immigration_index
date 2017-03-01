// Sync route definition
export default (store) => ({
  path : 'publications',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const AboutView = require('./components/AboutView').default
      cb(null, AboutView)
    }, 'publications')
  }
})
