import React from 'react'
import './ToolTip.scss'
export class ToolTip extends React.Component {

  render () {
    let divName = this.props.mapDiv || 'toolTipDiv'
    return (
      <div id={divName} className='ToolTipContainer' style={{ position: 'absolute', top:this.props.top, left:this.props.left, opacity:this.props.show }}>
        {this.props.children}
      </div>
    )
  }
}

ToolTip.propTypes = {
  geo: React.PropTypes.object,
  children: React.PropTypes.array,
  mapDiv: React.PropTypes.string
}

export default ToolTip

