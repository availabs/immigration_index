import React from 'react'
import * as d3 from 'd3'
import ResponsiveMap from 'components/ResponsiveMap'
import * as topojson from 'topojson'
import './HomeView.scss'
import colorbrewer from 'colorbrewer'
import geoData from '../assets/tl_2010_36_puma10_quant'
import regions from '../assets/regions'


const cats = [
  'Full Time',
  'Poverty',
  'Working Poor',
  'Homeownership',
  'Rent Burden',
  'Unemployment',
  'Income',
  'Naturalization'
]

 var Blues = ["#08306b", "#08519c", "#2171b5", "#4292c6", "#6baed6", "#9ecae1", "#c6dbef", "#deebf7", "#f7fbff", "#fff"]

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      puma_data: [],
      activeCategory: cats[0],
      activeRegions: null
    }
    this.setActiveCategory = this.setActiveCategory.bind(this)
    this.mapClick = this.mapClick.bind(this)
  }

  componentDidMount () {
    // console.log(d3)
    d3.csv('/final_score_1.csv', (err, data) => {
      if (err) console.log('error', err)
      // console.log(data)
      this.setState({
        data:data
      })
    })

    d3.csv('/puma_ratios.csv', (err, pumas) => {
      if (err) console.log('error', err)
      this.setState({
        puma_data: pumas.reduce((prev, current) => {
          current.geo = current.geo.replace(', New York', '').replace('; New York', '')
          prev[current.geo] = current
          return prev
        }, {})
      })
    })
  }

  regionDataTable () {

    
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>
              Region
            </th>
            <th>
              BABS
            </th>
            <th>
              HS
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  dataTable () {
    if (!this.state.data.columns) return

    var header = this.state.data.columns.filter(col => {
      return col.includes(this.state.activeCategory) || col === 'Regions'
    })
    .map(col => {
      return (
        <th>{col.split('_')[0]}</th>
      )
    })

    var rows = Object.keys(this.state.data)
      .filter(row => row !== 'columns')
      .map(row => {
        return (
          <tr>
            {
              Object.keys(this.state.data[row]).filter(col => { // Filter for Active category
                return col.includes(this.state.activeCategory) || col === 'Regions'
              })
              .map(col => {
                return (
                  <td>
                    {
                      isNaN(parseInt(this.state.data[row][col]))
                      ? this.state.data[row][col]
                      : (this.state.data[row][col] * 100).toLocaleString('en-IN', { maximumSignificantDigits: 4 })
                    }
                  </td>
                )
              })
            }
          </tr>
        )
      })

    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  renderLegend (scale) {
    var colors=scale.domain().map(grade => {
        return <div style={{backgroundColor:scale(grade),width:(100/scale.domain().length)+"%", height:20}}/>
    })

    var grades=scale.domain().map(grade => {
        return <div style={{textAlign:'center', width:(100/scale.domain().length)+"%", height:20}}>{grade}</div>

    })
    return (
      <div className='legendContainer'>
          <h5>{this.state.activeCategory}</h5>
          <div className='legendRow'>
          {colors}
          </div>
          <div className='legendRow'>
          {grades}
          </div>
      </div>
      )
  }

  mapClick (d) {
    this.setState({
      activeRegion:d.properties.region
    })
  }

  renderMap () {
    if (this.state.data.length === 0) return
    // console.log('test', regions)
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }
   
    var gradeScale = d3.scaleOrdinal()
      .domain(['A', 'A-', 'B', 'B-', 'C','C-','D','D-','E','E-'])
      .range(Blues)

    regionGeo.features = Object.keys(regions).map(region => {
      var regionGrade = this.state.data
        .filter(reg => reg.Regions === region)
      regionGrade = regionGrade[0] || {}
      regionGrade = regionGrade['Grades_' + this.state.activeCategory] || 'E-'
      regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
      return {
        'type': 'Feature',
        'properties': { region: region, fillColor:gradeScale(regionGrade), grade:regionGrade },
        'geometry': topojson.merge(
          geoData, geoData.objects.collection.geometries
            .filter(function (d) {
              return regions[region].includes(d.properties.NAMELSAD10)
            })
          )
      }
    })
    var childGeo = null
    if (this.state.activeRegion){
    childGeo = topojson.feature(geoData, geoData.objects.collection)
      childGeo.features=childGeo.features.filter(puma => regions[this.state.activeRegion].includes(puma.properties.NAMELSAD10))
    }
    return (
      <div>
        {this.renderLegend(gradeScale)}
        <ResponsiveMap 
          geo={regionGeo} 
          click={this.mapClick} 
          activeRegion={this.state.activeRegion} 
          activeCategory={this.state.activeCategory}
          childGeo={childGeo}
        />
      </div>
    )
  }

  setActiveCategory (cat) {
    this.setState({ activeCategory:cat })
  }

  renderSidebar () {
    var catButtons = cats.map(cat => {
      var active = cat === this.state.activeCategory ? ' active' : ''
      return (
        <a
          onClick={this.setActiveCategory.bind(null, cat)}
          href='#'
          className={'list-group-item' + active}
        >{cat}</a>
      )
    })

    return (
      <div className='list-group'>
        {catButtons}
      </div>
    )
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-9 sidebar' style={{ overflow:'hidden' }}>
            {this.state.activeRegion}
            {this.renderMap()}
            {this.dataTable()}

          </div>
          <div className='col-md-3'>
            {this.renderSidebar()}
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
