// Sync route definition
export default (store) => ({
  path : 'research',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const AboutView = require('./components/Research').default

      /*  Return getComponent   */
      cb(null, AboutView)

    /* Webpack named bundle   */
    }, 'research')
  }
})
