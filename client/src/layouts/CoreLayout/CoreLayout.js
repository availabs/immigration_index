import React from 'react'
import Header from 'components/Nav'
import Sidebar from 'components/Nav/SideBar'
import './CoreLayout.scss'
import 'styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container-fluid'>
    <div className='row'>
      <Header />
    </div>
    <div className='row core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
