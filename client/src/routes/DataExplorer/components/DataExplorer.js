import React from 'react'
import * as d3 from 'd3'
import ResponsiveMap from 'components/ResponsiveMap'
import * as topojson from 'topojson'
import './DataExplorer.scss'
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

var Blues = ['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7', '#f7fbff', '#fff']

class DataExplorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      puma_data: [],
      activeCategory: cats[0],
      activeRegions: null,
      geoData: null
    }
    this.setActiveCategory = this.setActiveCategory.bind(this)
    this.mapClick = this.mapClick.bind(this)
  }

  componentDidMount () {
    d3.csv('/final/all_region_babs.csv', (err, data) => {
      if (err) console.log('error', err)
      this.setState({
        data:data
      })
    })

    d3.csv('/final/all_puma_babs.csv', (err, pumas) => {
      if (err) console.log('error', err)
      console.log('test', pumas)
      this.setState({
        puma_data: pumas.reduce((prev, current) => {
          current.Regions = current.Regions.replace(', New York', '').replace('; New York', '')
          prev[current.Regions] = current
          return prev
        }, {})
      })
    })
    d3.json('geo/ny_puma_geo.json', (err, geodata) => {
      if (err) console.log('error', err)
      this.setState({
        geoData: geodata
      })
    })
  }

  regionDataTable () {
    var rows = Object.keys(this.state.puma_data).filter(puma => {
      return regions[this.state.activeRegion].includes(puma)
    })
    .map(row => {
      return (
        <tr key={row}>
          {
            Object.keys(this.state.puma_data[row]).filter(col => { // Filter for Active category
              return col.includes(this.state.activeCategory) || col === 'Regions'
            })
            .map(col => {
              return (
                <td>
                  {
                    isNaN(parseInt(this.state.puma_data[row][col]))
                    ? this.state.puma_data[row][col]
                    : (this.state.puma_data[row][col] * 100).toLocaleString('en-IN', { maximumSignificantDigits: 4 })
                  }
                </td>
              )
            })
          }
        </tr>
      )
    })

    var header = this.state.data.columns.filter(col => {
      return col.includes(this.state.activeCategory) || col === 'Regions'
    })
    .map(col => {
      return (
        <th>{col.split('_')[0]}</th>
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
          <tr key={row}>
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
    var colors = scale.domain().map(grade => {
      return <div style={{ backgroundColor:scale(grade), width:(100 / scale.domain().length) + '%', height:20 }} />
    })

    var grades = scale.domain().map(grade => {
      return <div style={{ textAlign:'center', width:(100 / scale.domain().length) + '%', height:20 }}>{grade}</div>
    })
    return (
      <div className='legendContainer'>
        <h5>{this.state.activeCategory}
          <span style={{ fontSize:'.8em', float:'right' }}> {this.state.activeRegion}</span>
        </h5>
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
    var nextRegion = d.properties.region
    if (this.state.activeRegion === d.properties.region) {
      nextRegion = null
    }
    this.setState({
      activeRegion:nextRegion
    })
  }

  renderMap () {
    if (this.state.data.length === 0 || !this.state.geoData) return
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }

    var gradeScale = d3.scaleOrdinal()
      .domain(['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-'])
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
          this.state.geoData, this.state.geoData.objects.collection.geometries
            .filter(function (d) {
              return regions[region].includes(d.properties.NAMELSAD10)
            })
          )
      }
    })
    var childGeo = null
    if (this.state.activeRegion) {
      childGeo = topojson.feature(this.state.geoData, this.state.geoData.objects.collection)
      childGeo.features = childGeo.features.filter(puma => regions[this.state.activeRegion].includes(puma.properties.NAMELSAD10))
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
            {this.renderMap()}
            {this.state.activeRegion ? this.regionDataTable() : this.dataTable()}

          </div>
          <div className='col-md-3'>
            {this.renderSidebar()}
          </div>
        </div>
      </div>
    )
  }
}

export default DataExplorer
