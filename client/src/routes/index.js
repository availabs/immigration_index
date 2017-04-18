// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import { Explorer, ExplorerType } from './DataExplorer'
import Processing from './DataProcessing'
import Login from './Login/index'
import About from './About'
import Team from './About/team'
import Methods from './Methods'
import Pubs from './Pubs'
import Research from './Research'
import DataOverview from './DataOverview'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Home,
  childRoutes : [
    Explorer(store),
    ExplorerType(store),
    Login(store),
    About(store),
    Methods(store),
    Pubs(store),
    Research(store),
    Processing(store),
    DataOverview(store),
    Team(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
