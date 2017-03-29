import React from 'react'
import * as d3 from 'd3'
let topojson = require('topojson')
import classes from './ResponsiveMap.scss'
import ToolTip from 'components/ToolTip/ToolTip'

var path = d3.geoPath()

export class ResponsiveMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      top: 0,
      left: 0,
      show: 0,
      info: {},
      width: 100,
      height: 100
    }
    this._drawGraph = this._drawGraph.bind(this)
    this.renderToolTip = this.renderToolTip.bind(this)
    this.mousemove = this.mousemove.bind(this)
    this.mouseout = this.mouseout.bind(this)
    this.mouseover = this.mouseover.bind(this)
  }
  componentDidMount () {
    this._drawGraph(this.props)
  }

  componentWillReceiveProps (nextProps) {
    // let firstGeo = getValue(this.props, 'geo', 'objects', 'collection', 'geometries', '0', 'id')
    // let nextFirstGeo = getValue(nextProps, 'geo', 'objects', 'collection', 'geometries', '0', 'id')
    // let firstChild = getValue(this.props, 'children', 'objects', 'collection', 'geometries', '0', 'id')
    // let nextChild = getValue(nextProps, 'children', 'objects', 'collection', 'geometries', '0', 'id')
    // if (firstGeo !== nextFirstGeo || firstChild !== nextChild) {
    //   this._drawGraph(nextProps)
    // }
    // console.log((this.props.activeRegion !== nextProps.activeRegion), this.props.activeRegion, nextProps.activeRegion)
    if (this.props.activeRegion !== nextProps.activeRegion) {
      this.zoomto(nextProps)
    }
    if (!nextProps.activeRegion) {
      this.reset()
    }
    if (this.props.activeCategory !== nextProps.activeCategory) {
      this.updateColor(nextProps)
    }
    if (this.props.activeAnalysis !== nextProps.activeAnalysis) {
      this.updateColor(nextProps)
    }
    if (this.props.educationLevel !== nextProps.educationLevel) {
      this.updateColor(nextProps)
    }
  }

  updateColor (props) {
    let g = d3.select('#mapContainer')
    g.selectAll('.state')
      .attr('fill', d => {
        return d.properties.fillColor || '#efefef'
      })
      .on('mouseover', this.mouseover || null)

    if (props.childGeo) {
      g.selectAll('.puma')
        .attr('fill', d => {
          return d.properties.fillColor || '#7EC0EE'
        })
        .on('mouseover', this.mouseover || null)
    }
  }

  reset () {
    let g = d3.select('#mapContainer')
    g.transition()
      .duration(750)
      .style('stroke-width', '1.5px')
      .attr('transform', '')
    g.selectAll('.puma').remove()
  }

  zoomto (props) {
    if (!props.activeRegion) return
    var region = props.geo.features.filter(d => d.properties.region === props.activeRegion)[0]
    var bounds = path.bounds(region)
    var dx = bounds[1][0] - bounds[0][0]
    var dy = bounds[1][1] - bounds[0][1]
    var x = (bounds[0][0] + bounds[1][0]) / 2
    var y = (bounds[0][1] + bounds[1][1]) / 2
    var scale = 0.9 / Math.max(dx / this.state.width, dy / this.state.height)
    var translate = [this.state.width / 2 - scale * x, this.state.height / 2 - scale * y]
    let g = d3.select('#mapContainer')
    g.selectAll('.puma').remove()
    g.transition()
          .duration(750)
          .style('stroke-width', 1.5 / scale + 'px')
          .attr('transform', 'translate(' + translate + ')scale(' + scale + ')')
    if (props.childGeo) {
      g.selectAll('.puma')
          .data(props.childGeo.features)
          .enter()
          .append('path')
          .attr('stroke', 'black')
          .style('cursor', 'pointer')
          .attr('class', d => {
            return 'puma '
          })
          // .attr('id',function(d){return 'msa'+d.properties.id})
          .attr('fill', d => {
            return d.properties.fillColor || '#chartreuse'
          })
          .attr('d', path)
          .on('click', props.click || null)
          .on('mouseover', this.mouseover || null)
          .on('mouseout', this.mouseout || null)
          .on('mousemove', this.mousemove)
    }
  }

  _drawGraph (props) {
    if (!props.geo) return
    let geo = props.geo.type &&
      props.geo.type === 'FeatureCollection'
      ? props.geo : topojson.feature(props.geo, props.geo['objects']['collection'])
    let childrenGeo = null
    if (props.children) {
      childrenGeo = props.geo.type &&
        props.children.type === 'FeatureCollection'
        ? props.children : topojson.feature(props.children, props.children['objects']['collection'])
    }
    let divName = this.props.mapDiv || 'mapDiv'
    let width = document.getElementById(divName).offsetWidth
    let height = width * 0.6
    this.setState({
      width: width,
      height: height
    })

    var projection = d3.geoTransverseMercator()
      .rotate([76 + 35 / 60, -40])

    path = d3.geoPath()
      .projection(projection)

    projection
        .scale(1)
        .translate([0, 0])

    let b = path.bounds(geo)
    let s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
    let t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

    projection
        .scale(s)
        .translate(t)

    let svg = d3.select('#' + divName + ' svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)

    svg.selectAll('g').remove()

    var g = svg.append('g').attr('id', 'mapContainer')

    g.selectAll('.state')
      .data(geo.features)
      .enter().append('path')
      .attr('class', d => { return 'state region ' + d.properties.region.split(' ').join('_') })
      .attr('d', path)
      .attr('stroke', 'white')
      .style('cursor', 'pointer')
      .attr('fill', d => {
        return d.properties.fillColor || '#efefef'
      })
      .on('mouseover', this.mouseover || null)
      .on('mouseout', this.mouseout || null)
      .on('mousemove', this.mousemove)
      .on('click', props.click || null)
  }

  mousemove (e) {
    let divName = this.props.mapDiv || 'mapDiv'
    var mouse = d3.mouse(d3.select('#' + divName + '> svg').node()).map(function (d) {
      return parseInt(d)
    })
    this.setState({
      left: mouse[0] + 30,
      top:mouse[1] + 40
    })
  }

  mouseover (d) {
    this.setState({
      show: 0.9,
      info:d.properties
    })
  }
  mouseout () {
    this.setState({
      show: 0.0,
      left: 0,
      top: 0
    })
  }

  renderToolTip () {
    // if (!this.props.ToolTip) return
    return (
      <ToolTip top={this.state.top} left={this.state.left} show={this.state.show}>
        <div style={{ textAlign:'center', fontSize:'1.1em', fontWeight:'600' }}>{this.state.info.region}</div>
        <div style={{ textAlign:'center' }}>
          <div className='row'>
            <div className={this.state.info.rank === 'No Data' ? 'col-xs-12' : 'col-xs-6'}>
              <span style={{ fontSize:'.75em', fontWeight:'400' }}>Grade</span> <br />
              <span style={{ fontSize:'2em', fontWeight:'600' }}>{this.state.info.grade}</span>
            </div>
            <div className='col-xs-6'>
              <span style={{ fontSize:'.75em', fontWeight:'400' }}>{this.state.info.rank === 'No Data' ? '' : 'Rank'}</span> <br />
              <span style={{ fontSize:'2em', fontWeight:'600' }}>{this.state.info.rank === 'No Data' ? '' : this.state.info.rank}</span>
            </div>
          </div>
        </div>
      </ToolTip>
    )
  }

  render () {
    let divName = this.props.mapDiv || 'mapDiv'
    return (
      <div id={divName} className={classes['svg-container']}>
        {this.renderToolTip()}
        <svg id='mapSVG' className={classes['.svg-content-responsive']} preserveAspectRatio='xMinYMin meet' >
        </svg>
        <svg width='8' height='8'>
          <defs>
            <pattern id='crosshatch' patternUnits='userSpaceOnUse' width='8' height='8'>
              <image href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><path fill='#fff' d='M0 0h8v8h-8z'/><path d='M0 0l8 8zm8 0l-8 8z' stroke-width='.5' stroke='#aaa'/></svg>" x='0' y='0' width='8' height='8' />
            </pattern>
          </defs>
        </svg>
      </div>
    )
  }
}

ResponsiveMap.propTypes = {
  geo: React.PropTypes.object,
  children: React.PropTypes.object,
  mapDiv: React.PropTypes.string
}

export default ResponsiveMap

function getValue (obj) {
  var args = Array.prototype.slice.call(arguments, 1)

  for (var i = 0; i < args.length; i++) {
    if (!obj || !obj.hasOwnProperty(args[i])) {
      return null
    }
    obj = obj[args[i]]
  }
  return obj
}
