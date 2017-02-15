
export let Explorer = (store) => ({
  path : 'data',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const DataExplorer = require('./components/DataExplorer').default

      /*  Return getComponent   */
      cb(null, DataExplorer)

    /* Webpack named bundle   */
    }, 'data')
  }
})

export let ExplorerType = (store) => ({
  path : 'data/:type',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const DataExplorer = require('./components/DataExplorer').default
      /*  Return getComponent   */
      cb(null, DataExplorer)

    /* Webpack named bundle   */
    }, 'data')
  }
})

