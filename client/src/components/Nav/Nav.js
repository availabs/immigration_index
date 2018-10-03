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

         
        </div>

      </div>

    </nav>
  )
}

export default Nav
