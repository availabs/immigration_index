import React from 'react'
// import { Link } from 'react-router'
import './Sidebar.scss'
export class Sidebar extends React.Component {

  render () {
    let divName = this.props.mapDiv || 'mapDiv'

    var catButtons = this.props.categories.map(cat => {
      var active = cat === this.props.activeCategory ? ' active' : ''
      return (
        <a
          key={cat}
          onClick={this.props.categoryClick.bind(null, cat)}
          href='#'
          className={'list-group-item' + active}
        >{cat}</a>
      )
    })

    var cats = Object.keys(this.props.analyses).map(key => {
      return (
        <li key={key} className='accordionItem'>
          <input className={this.props.activeAnalysis === key ? '' : 'checkeredBox'}type='checkbox' />
          <i />
          <h2 className='accordianHeader' onClick={this.props.analysisClick.bind(null, key)}>{this.props.analyses[key].name}</h2>
          <div className='divP'>
            <small>{this.props.analyses[key].info}</small>
            <div className='list-group'>
              {catButtons}
            </div>
          </div>
        </li>
      )
    })
    return (
      <ul className='accordianList'>
        {cats}
      </ul>
    )
  }
}

Sidebar.propTypes = {
  analyses: React.PropTypes.object,
  categories: React.PropTypes.array
}

export default Sidebar

