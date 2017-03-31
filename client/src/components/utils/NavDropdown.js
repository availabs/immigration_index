import React from 'react'

class NavDropdown extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
    this.toggle = this.toggle.bind(this)
  }
  toggle () {
    this.setState({ open: !this.state.open })
  }
  componentDidMount() {
    document.getElementById('theDropDown').addEventListener("blur", d => {
      console.log('focusout')
      this.setState({ open: false })
    })
  }
  render () {
    return (
      <div id='theDropDown' onClick={this.toggle}>
        <a className='nav-link dropdown-toggle' aria-expanded={this.state.open}>
          {this.props.title}
        </a>
        <div className='dropdown-menu' style={{ display: this.state.open ? 'block' : 'none' }}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

NavDropdown.propTypes = {
  children : React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.array]).isRequired,
  title : React.PropTypes.element.isRequired
}

export default NavDropdown
