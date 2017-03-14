import React from 'react'
// import { Link } from 'react-router'
import './Sidebar.scss'
export class Sidebar extends React.Component {

  render () {
    let divName = this.props.mapDiv || 'mapDiv'

    let renderListGroup = (key, parent, level) => {
      var cat = parent[key]
      var active = key === this.props[cat.type] ? ' active' : ''
      return (
        <div>
          <a
            key={key}
            onClick={this.props.analysisClick.bind(null, key, cat.type)}
            className={'flipIn list-group-item' + active}
            style={{paddingLeft:25}}
          >
            {cat.subcats ? <i className={'indicator'+ active} /> : ''}
          {cat.name}
          </a>
        {active === ' active' && cat.subcats ? 
           <div className='list-group flipIn' style={{paddingLeft:30, borderWidth: 2 * level}}>
            {
              Object.keys(cat.subcats)
              .map(subKey => renderListGroup(subKey, cat.subcats, level+1))
            }
           </div> 
           : null
          }
        </div>
      )
    }

    var cats = Object.keys(this.props.analyses).map(key => {
      var analysis = this.props.analyses[key]
      var catButtons = Object.keys(analysis.subcats).map(cat => {
        return renderListGroup(cat, analysis.subcats, 1)
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
            onClick={this.props.analysisClick.bind(null, key, 'activeAnalysis')}
            className={checkeredBox}
            type='checkbox' 
          />
          <i />
          <h2 className='accordianHeader' onClick={this.props.analysisClick.bind(null, key)}>
            {this.props.analyses[key].name}
          </h2>
          <div className='divP'>
            <div style={{padding: 15}}>
              <small>{this.props.analyses[key].info}</small>
            </div>
            <div className='list-group flipIn'>
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

