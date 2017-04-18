import React from 'react'
import NavDropdown from 'components/utils/NavDropdown'
import { IndexLink, Link } from 'react-router'
import './Nav.scss'
const studyAreas = [
  {
    url: '/data/nativity',
    text: 'The Effects of Nativity Status',
    img: '/img/image_1.jpg'
  },
  {
    url: '/data/race',
    text: 'The Effects of Race'
  },
  {
    url: '/data/gender',
    text: 'The Effects of Gender'
  },
  {
    url: '/data/vulnerable',
    text: 'The Effects of Low English Proficiency & Educational Attainment'
  }
]

export const Nav = () => {
  var links = studyAreas.map(d => (<Link key={d.text} to={d.url} className='dropdown-item'>{d.text}</Link>))
  return (
    <nav className='navbar navbar-dark theme-color nav-custom'>
      <button className='navbar-toggler hidden-sm-up' type='button' data-toggle='collapse' data-target='#collapseEx2'>
        <i className='fa fa-bars' />
      </button>

      <div className='container'>
        <IndexLink to='/' className='navbar-brand'>
            Immigrant Integration Index
          </IndexLink>
        <div className='collapse navbar-toggleable-md' id='collapseEx2'>

          <ul className='nav navbar-nav' />
          <form className='form-inline'>
            <ul className='nav navbar-nav hidden'>

              <li className='nav-item'>
                <Link to='/' className='nav-link active'>HOME</Link>
              </li>
              <li className='nav-item'>
                <Link to='/about' className='nav-link active'>ABOUT</Link>
              </li>
              <li className='nav-item btn-group'>
                <NavDropdown title={<span>DATA EXPLORER</span>}>
                  {links}
                </NavDropdown>
              </li>
              <li className='nav-item'>
                <Link to='/overview' className='nav-link active'>DATA SNAPSHOTS</Link>
              </li>
              <li className='nav-item'>
                <Link to='/research' className='nav-link active'>METHODOLOGY</Link>
              </li>
              <li className='nav-item'>
                <Link to='/publications' className='nav-link active'>PUBLICATIONS</Link>
              </li>
              <li className='nav-item'>
                <Link to='/team' className='nav-link active'>TEAM</Link>
              </li>
            </ul>
          </form>
        </div>

      </div>

    </nav>
  )
}

export default Nav
