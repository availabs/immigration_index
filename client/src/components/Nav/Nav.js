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
          Immigrant Integration Index
        </IndexLink>
        <ul className='nav navbar-nav'>
          
          
        </ul>

        <form className='form-inline'>
           <ul className='nav navbar-nav'>
          <li className='nav-item' activeClassName='active'>
            <Link to='/data' className='nav-link active'>Data Explorer</Link>
          </li>
          <li className='nav-item' activeClassName='active'>
            <Link to='/about' className='nav-link active'>About</Link>
          </li>
          <li className='nav-item' activeClassName='active'>
            <Link to='/research' className='nav-link active'>Research</Link>
          </li>
          <li className='nav-item' activeClassName='active'>
            <Link to='/methods' className='nav-link active'>Methodology</Link>
          </li>
          <li className='nav-item' activeClassName='active'>
            <Link to='/publications' className='nav-link active'>Publications</Link>
          </li>
          
        </ul>
          
        </form>
      </div>

    </div>

  </nav>
)

export default Nav
