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
    console.log((this.props.activeRegion !== nextProps.activeRegion), this.props.activeRegion , nextProps.activeRegion)
    if (this.props.activeRegion !== nextProps.activeRegion) {
      this.zoomto(nextProps)
    } else {
      this.reset()
    }
    if (this.props.activeCategory !== nextProps.activeCategory){
      this.updateColor(nextProps)
    } 
  }

  updateColor(props) {
    console.log('updateColor')
    let g = d3.select('#mapContainer')
    g.selectAll('.state')
      .data(props.geo.features)
      .enter().append('path')
      .attr('class', d => {return 'state'})
      .attr('d', path)
      .attr('fill', d => {
        return d.properties.fillColor || "#efefef"
      })
      .on('mouseover', this.mouseover || null)
      .on('mouseout', this.mouseout || null)
      .on('mousemove', this.mousemove)
      .on('click', props.click || null)
  }

  reset() {
  let g = d3.select('#mapContainer')
  g.transition()
      .duration(750)
      .style("stroke-width", "1.5px")
      .attr("transform", "");
       g.selectAll('.puma').remove()
  }

  zoomto(props){
    // var region = d3.select('.' + props.activeRegion)
    if( !props.activeRegion) return
    var region = props.geo.features.filter(d => d.properties.region === props.activeRegion)[0]
    console.log(path.bounds(region), region)
    var bounds = path.bounds(region),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = .9 / Math.max(dx / this.state.width, dy / this.state.height),
          translate = [this.state.width / 2 - scale * x, this.state.height / 2 - scale * y];
      let divName = this.props.mapDiv || 'mapDiv'
      let g = d3.select('#mapContainer')
      g.selectAll('.puma').remove()
      g.transition()
          .duration(750)
          .style("stroke-width", 1.5 / scale + "px")
          .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
      if (props.childGeo) {
        g.selectAll('.puma')
          .data(props.childGeo.features)
          .enter().append('path')
          .attr('class', d => {return 'puma'})
          // .attr('id',function(d){return 'msa'+d.properties.id})
          .attr('fill', props.childColor || '#7EC0EE')
          .attr('d', path)
          .on('click', props.click || null)
          .on('mouseover', props.mouseover || null)
          .on('mouseout', props.mouseout || null)
    }

  }


  _drawGraph (props) {
    if (!props.geo) return
    let geo = props.geo.type &&
      props.geo.type === 'FeatureCollection'
      ? props.geo : topojson.feature(props.geo, props.geo['objects']['collection'])
    let childrenGeo = null
    // console.log('_drawGraph', props.children)grap
    if (props.children) {
      // let newChild = Object.assign({}, props.children)
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

    var projection =  d3.geoTransverseMercator()
      .rotate([76 + 35 / 60, -40]);

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
      .attr('class', d => {return 'state'})
      .attr('d', path)
      .attr('fill', d => {
        return d.properties.fillColor || "#efefef"
      })
      .on('mouseover', this.mouseover || null)
      .on('mouseout', this.mouseout || null)
      .on('mousemove', this.mousemove)
      .on('click', props.click || null)
  }

  mousemove (e) {
    let divName = this.props.mapDiv || 'mapDiv'
    var mouse = d3.mouse(d3.select('#' + divName +'> svg').node()).map(function(d) {
        return parseInt(d);
    });
    this.setState({
      left: mouse[0] + 40,
      top:mouse[1] - 20,
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
      show: 0.0
    })
 
  }

  renderToolTip () {
    // if (!this.props.ToolTip) return
      return (
        <ToolTip top={this.state.top} left={this.state.left} show={this.state.show}>
          <div style={{textAlign:'center', fontSize:'1.1em', fontWeight:'600'}}>{this.state.info.region}</div>
         <div style={{textAlign:'center'}}>
         <span style={{fontSize:'.75em', fontWeight:'400'}}>Grade</span> <br/>
         <span style={{fontSize:'2em', fontWeight:'600'}}>{this.state.info.grade}</span></div>
        </ToolTip>
        )
  }

  render () {
    let divName = this.props.mapDiv || 'mapDiv'
    return (
      <div id={divName} className={classes['svg-container']}>
        {this.renderToolTip()}
        <svg className={classes['.svg-content-responsive']} preserveAspectRatio='xMinYMin meet'/>
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

// function clicked(d) {
//   var x, y, k;

//   if (d && centered !== d) {
//     var centroid = path.centroid(d);
//     x = centroid[0];
//     y = centroid[1];
//     k = 4;
//     centered = d;
//   } else {
//     x = width / 2;
//     y = height / 2;
//     k = 1;
//     centered = null;
//   }
//   svg = d3.select('#' + divName + ' svg')

//   svg.selectAll("path")
//       .classed("active", centered && function(d) { return d === centered; });

//   svg.transition()
//       .duration(750)
//       .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
//       .style("stroke-width", 1.5 / k + "px");
// }
