import React from 'react'
import * as d3 from 'd3'
let topojson = require('topojson')
import classes from './ResponsiveMap.scss'

export class ResponsiveMap extends React.Component {

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
    this._drawGraph(nextProps)
  }

  _drawGraph (props) {
    if (!props.geo) return
    console.log('waaaaaaaaaaa', props.geo.type)
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

    var projection =  d3.geoTransverseMercator()
      .rotate([76 + 35 / 60, -40]);

    var path = d3.geoPath()
      .projection(projection)

    projection
        .scale(1)
        .translate([0, 0])

    console.log(geo.features.length)
    // geo.features = geo.features.filter(d => { return d.properties.GEOID10 != '3603305' })
    console.log(geo.features.length)

    let b = path.bounds(geo)
    let s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height)
    let t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2]

    projection
        .scale(s)
        .translate(t)

    let svg = d3.select('#' + divName + ' svg')
    .attr('viewBox', '0 0 ' + width + ' ' + height)

    svg.selectAll('path').remove()

    console.log('feature', geo.features.map(d => d.properties.ALAND10 / 1000))
    svg.selectAll('.state')
      .data(geo.features)
      .enter().append('path')
      .attr('class', d => {return 'state'})
      .attr('d', path)
      .attr('fill', d => {
        console.log(d.properties)
        return d.properties.fillColor || "#efefef"
      })

    if (props.children) {
      svg.selectAll('.msa')
        .data(childrenGeo.features)
        .enter().append('path')
        .attr('class', d => {return d.properties.GEOID10})
        // .attr('id',function(d){return 'msa'+d.properties.id})
        .attr('fill', props.childColor || '#7EC0EE')
        .attr('d', path)
        .on('click', props.click || null)
        .on('mouseover', props.mouseover || null)
        .on('mouseout', props.mouseout || null)
    }
  }

  render () {
    let divName = this.props.mapDiv || 'mapDiv'
    return (
      <div id={divName} className={classes['svg-container']}>
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
