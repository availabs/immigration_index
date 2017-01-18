import React from 'react'
import NavDropdown from 'components/utils/NavDropdown'
import { IndexLink, Link } from 'react-router'
import './Nav.scss'

export const Nav = () => (
  <nav className='navbar navbar-dark theme-color'>
    <button className='navbar-toggler hidden-sm-up' type='button' data-toggle='collapse' data-target='#collapseEx2'>
      <i className='fa fa-bars' />
    </button>

    <div className='container'>
      <div className='collapse navbar-toggleable-xs' id='collapseEx2'>
        <IndexLink to='/' className='navbar-brand'>
          Immigration Index
        </IndexLink>
        <ul className='nav navbar-nav'>
          <li className='nav-item' activeClassName='active'>
            <Link to='/' className='nav-link active'>Home</Link>
          </li>
          
        </ul>

        <form className='form-inline'>
          <input className='form-control' type='text' placeholder='Search' />
        </form>
      </div>

    </div>

  </nav>
)

export default Nav
