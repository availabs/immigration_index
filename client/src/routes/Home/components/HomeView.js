import React from 'react'
import * as d3 from 'd3'
import ResponsiveMap from 'components/ResponsiveMap'
import * as topojson from 'topojson'
import './HomeView.scss'

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
      puma_data: [],
      activeCategory: cats[0],
      activeRegions: null
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

  renderMap () {
    console.log('test', regions)
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }

    regionGeo.features = Object.keys(regions).map(region => {
      return {
        'type': 'Feature',
        'properties': { region: region },
        'geometry': topojson.merge(
          geoData, geoData.objects.collection.geometries
            .filter(function (d) {
              return regions[region].includes(d.properties.NAMELSAD10)
            })
          )
      }
    })

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
    console.log('pumas', this.state.puma_data)
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
