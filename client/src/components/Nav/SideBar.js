import React from 'react'
import './SideBar.scss'

var SideBar = React.createClass({
  render: function () {
    return (

      <ul id='slide-out' className='side-nav fixed custom-scrollbar ps-container ps-theme-default' data-ps-id='15b57a5f-3824-5633-d7c8-c828d2550d57' style={{ transform: 'translateX(0px)' }}>
        {/* Logo */}
        <li>
          <div className='logo-wrapper waves-light waves-effect waves-light'>
            <a href='http://mdbootstrap.com/' className='waves-effect waves-light logo-wrapper'> <img id='MDB-logo' src='http://mdbootstrap.com/wp-content/uploads/2016/11/mdb-transparent.png' className='img-fluid flex-center' /></a>
          </div>
        </li>
        {/* /. Logo */}
        {/* Search Form */}
        <li>
          <form className='search-form' onKeyPress='return event.keyCode != 13;' role='search' method='GET' autoComplete='off'>
            <div className='form-group waves-light waves-effect waves-light'>
              <input type='text' className='form-control mb-0' name='mdw_serach' placeholder='Search' id='mdw_main_search' />
            </div>
            <div className='dropdown-wrapper' />
          </form>
        </li>
        {/* /.Search Form */}
        {/* Side navigation links */}
        <li>
          <ul id='side-menu' className='collapsible collapsible-accordion'>
            <li id='menu-item-13028' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-13028'><a className='collapsible-header waves-effect arrow-r'><i className='fa fa-css3' />CSS<i className='fa fa-angle-down rotate-icon' /></a>
              <div className='collapsible-body'>
                <ul className='sub-menu'>
                  <li id='menu-item-338' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-338'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/css/animations/'>Animations</a></li>
                  <li id='menu-item-339' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-339'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/css/colors/'>Colors</a></li>
                  <li id='menu-item-1206' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-1206'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/css/helpers/'>Helpers</a></li>

                </ul>
              </div>
            </li>

            <li id='menu-item-13029' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-13029'><a className='collapsible-header waves-effect arrow-r'><i className='fa fa-th' />Sections<i className='fa fa-angle-down rotate-icon' /></a>
              <div className='collapsible-body'> <ul className='sub-menu'>
                <li id='menu-item-10347' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10347'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/intros/'>Intros</a></li>
                <li id='menu-item-10351' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10351'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/blog/'>Blog</a></li>
                <li id='menu-item-10346' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10346'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/magazine-sections/'>Magazine</a></li>
                <li id='menu-item-10349' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10349'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/e-commerce-sections/'>E-commerce</a></li>
                <li id='menu-item-10348' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10348'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/features-sections/'>Features</a></li>
                <li id='menu-item-10345' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10345'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/projects-sections/'>Projects</a></li>
                <li id='menu-item-10343' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10343'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/testimonials-sections/'>Testimonials</a></li>
                <li id='menu-item-10344' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10344'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/team-sections/'>Team</a></li>
                <li id='menu-item-10350' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10350'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/sections/contact-sections/'>Contact</a></li>
              </ul></div>
            </li>
            <li id='menu-item-12031' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-12031'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/freebies/'><i className='fa fa-magic' /> Freebies</a></li>
            <li id='menu-item-12103' className='menu-item menu-item-type-custom menu-item-object-custom current-menu-item menu-item-12103'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/templates/'><i className='fa fa-photo' />Templates</a></li>
            <li id='menu-item-403' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-403'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/material-design-for-bootstrap/'><i className='fa fa-heart' />About MDB</a></li>
            <li id='menu-item-343' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-343'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/getting-started/'><i className='fa fa-download' />Getting started</a></li>
            <li id='menu-item-12282' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-12282'><a className='collapsible-header waves-effect arrow-r'><i className='fa fa-book' />Tutorials<i className='fa fa-angle-down rotate-icon' /></a>
              <div className='collapsible-body'> <ul className='sub-menu'>
                <li id='menu-item-9508' className='menu-item menu-item-type-post_type menu-item-object-post  menu-item-9508'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/bootstrap-tutorial/'>Bootstrap</a></li>
                <li id='menu-item-9507' className='menu-item menu-item-type-post_type menu-item-object-post  menu-item-9507'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/wordpress-tutorial/'>WordPress</a></li>
              </ul></div>
            </li>
            <li id='menu-item-12104' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-12104'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/product/material-design-for-bootstrap-pro/'><i className='fa fa-diamond' />MDB PRO</a></li>
            <li id='menu-item-1986' className='menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-1986'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/'><i className='fa fa-fire' />News</a></li>
            <li id='menu-item-2027' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-2027'><a className='collapsible-header waves-effect arrow-r'><i className='fa fa-gear' />Tools<i className='fa fa-angle-down rotate-icon' /></a>
              <div className='collapsible-body'> <ul className='sub-menu'>
                <li id='menu-item-10734' className='menu-item menu-item-type-post_type menu-item-object-page  menu-item-10734'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/material-design-logo-generator/'>Logo Generator</a></li>
              </ul></div>
            </li>
            <li id='menu-item-8472' className='menu-item menu-item-type-custom menu-item-object-custom menu-item-8472'><a className='collapsible-header waves-effect' href='http://mdbootstrap.com/mdb3/'><i className='fa fa-file-text' />MDB3 Docs</a></li>
          </ul>                          </li>
        {/* /. Side navigation links */}
        <div className='ps-scrollbar-x-rail' style={{ left: 0, bottom: 0 }}><div className='ps-scrollbar-x' tabIndex={0} style={{ left: 0, width: 0 }} /></div><div className='ps-scrollbar-y-rail' style={{ top: 0, right: 0 }}><div className='ps-scrollbar-y' tabIndex={0} style={{ top: 0, height: 0 }} /></div></ul>
    )
  }
})

export default SideBar
