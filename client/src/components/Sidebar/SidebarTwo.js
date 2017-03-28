import React from 'react'
// import { Link } from 'react-router'
import './Sidebar.scss'
export class Sidebar extends React.Component {

  render () {
    let divName = this.props.mapDiv || 'mapDiv'

    var cats = Object.keys(this.props.analyses).map(key => {
      var analysis = this.props.analyses[key]
      var catButtons = Object.keys(analysis.subcats).map(cat => {
        var active = cat === this.props.activeAnalysis ? ' active' : ''
        return (
          <a
            key={cat}
            onClick={this.props.analysisClick.bind(null, cat)}
            className={'list-group-item' + active}
          >{analysis.subcats[cat]}</a>
        )
      })

      var itemClass = this.props.activeAnalysis === key ||
        Object.keys(analysis.subcats).includes(this.props.activeAnalysis)
        ? 'accordionItem active' : 'accordionItem'
      var checkeredBox = this.props.activeAnalysis === key ||
        Object.keys(analysis.subcats).includes(this.props.activeAnalysis)
        ? '' : 'checkeredBox'
      return (
        <li key={key} className={itemClass} >
          <input
            onClick={this.props.analysisClick.bind(null, key)}
            className={checkeredBox}
            type='checkbox'
          />
          <i />
          <h2 className='accordianHeader' onClick={this.props.analysisClick.bind(null, key)}>
            {this.props.analyses[key].name}
          </h2>
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

