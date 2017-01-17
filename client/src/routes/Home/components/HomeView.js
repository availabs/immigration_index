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

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      activeCategory: cats[0]
    }
    this.setActiveCategory = this.setActiveCategory.bind(this)
  }

  componentDidMount () {
    console.log(d3)
    d3.csv('/final_score_1.csv', (err, data) => {
      if (err) console.log('error', err)
      console.log(data)
      this.setState({
        data:data
      })
    })
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

  renderMap () {
    if (this.state.data.length === 0) return
    console.log('test', regions)
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }
    console.log(colorbrewer)
    var Blues = colorbrewer.Blues[9]
    Blues.push('#fff')
    var gradeScale = d3.scaleOrdinal()
      .domain(['A','A-','B','B-','C','C-','D','D-','E','E-'])
      .range(Blues)
      console.log(this.state.data)

    regionGeo.features = Object.keys(regions).map(region => {
      var regionGrade = this.state.data
        .filter(reg => reg.Regions === region)
      regionGrade = regionGrade[0] || {}
      regionGrade = regionGrade['Grades_' + this.state.activeCategory] || 'E-'
      console.log(regionGrade, region, gradeScale(regionGrade))
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
    console.log(regionGeo)

    return (
      <ResponsiveMap geo={regionGeo} />
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
            <h4>{this.state.activeCategory}</h4>
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
