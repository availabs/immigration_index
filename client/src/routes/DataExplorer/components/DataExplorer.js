import React from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
// Redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadAnalyses } from 'store/modules/analysis'
// Components
import ResponsiveMap from 'components/ResponsiveMap'
import Sidebar from 'components/Sidebar/Sidebar'
// CONST Data sources
import regions from '../assets/regions'
// Styling
import './DataExplorer.scss'

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

const calc = ['Ratio', 'Score', 'Grade']

const analyses = {
  'nativity': {
    name: 'The Effects of Nativity Status',
    info:'Effects of nativity status on economic outcomes of foreign-Born New Yorkers.'
  },
  'race': {
    name: 'The Effects of Race',
    info:'Effects of nativity status and race on economic outcomes of foreign-born New Yorkers.'
  },
  'gender': {
    name: 'The Effects of Gender',
    info: 'Gender Info'
  },
  'women': {
    name: 'Economic Outcomes of Foreign Born Women',
    info: 'Foreign Women Info'
  }
}

var Blues = ['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7', '#f7fbff', '#fff']

class DataExplorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puma_data: [],
      activeCategory: cats[0],
      activeAnalysis: this.props.params.type || 'nativity',
      educationLevel: 'babs',
      activeRegions: null,
      geoData: null,
      childGeo: null,
      regionGeo: null
    }
    this.setActiveCategory = this.setActiveCategory.bind(this)
    this.setActiveAnalysis = this.setActiveAnalysis.bind(this)
    this.educationClick = this.educationClick.bind(this)
    this.mapClick = this.mapClick.bind(this)
  }

  componentDidMount () {
    d3.json('/geo/ny_puma_geo.json', (err, geodata) => {
      if (err) console.log('error', err)
      var regionGeo = {
        'type': 'FeatureCollection',
        'features': []
      }

      regionGeo.features = Object.keys(regions).map(region => {
        return {
          'type': 'Feature',
          'properties': {
            region: region,
            geoType: 'region'
          },
          'geometry': topojson.merge(
            geodata, geodata.objects.collection.geometries
              .filter(function (d) {
                return regions[region].includes(d.properties.NAMELSAD10)
              })
            )
        }
      })
      this.setState({
        geoData: geodata,
        childGeo: topojson.feature(geodata, geodata.objects.collection),
        regionGeo: regionGeo
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.params.typ && nextProps.params.type !== this.state.activeAnalysis) {
      this.setState({ activeAnalysis: nextProps.params.type })
    }
  }

  dataTable () {
    if (!this.props.analyses[this.state.activeAnalysis] ||
        !this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]) {
      this.props.loadAnalyses(this.state.activeAnalysis, this.state.educationLevel)
      return <span />
    }
    var data = this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]
    var regionFilter = this.state.activeRegion &&
      regions[this.state.activeRegion]
      ? regions[this.state.activeRegion] : Object.keys(regions)
    var rows = Object.keys(data)
      .filter(region => regionFilter.includes(region))
      .map(region => {
        return (
          <tr key={region}>
            <td>{region}</td>
            <td>{data[region][this.state.activeCategory].Ratio}</td>
            <td>{data[region][this.state.activeCategory].Score}</td>
            <td>{data[region][this.state.activeCategory].Grade}</td>
          </tr>
        )
      })

    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Region</th>
            {calc.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  educationClick (level) {
    if (level !== this.state.educationLevel) {
      this.setState({
        educationLevel:level
      })
    }
  }

  renderLegend (scale) {
    var colors = scale.domain().map(grade => {
      return (
        <div
          key={grade}
          style={{ backgroundColor:scale(grade), width:(100 / scale.domain().length) + '%', height:20 }}
        />
      )
    })

    var grades = scale.domain().map(grade => {
      return (
        <div
          key={grade}
          style={{ textAlign:'center', width:(100 / scale.domain().length) + '%', height:20 }}
        >
          {grade}
        </div>
      )
    })
    var babsClass = 'btn btn-primary col-xs-6'
    babsClass += this.state.educationLevel === 'babs' ? ' active' : ''
    var hsClass = 'btn btn-primary col-xs-6'
    hsClass += this.state.educationLevel === 'hs' ? ' active' : ''
    return (
      <div className='legendContainer'>
        <h5>{this.state.activeCategory}
        </h5>
        <div className='legendRow'>
          {colors}
        </div>
        <div className='legendRow'>
          {grades}
        </div>
        <div className='row'>
          <div className='col-xs-12'>
           Educational Attainment
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='btn-group btn-block' data-toggle='buttons'>
              <label className={babsClass} onClick={this.educationClick.bind(null, 'babs')}>
                <input type='radio' name='options' autoComplete='off' /> BACHELORS
              </label>
              <label className={hsClass} onClick={this.educationClick.bind(null, 'hs')}>
                <input type='radio' name='options' autoComplete='off' /> HIGH SCHOOL
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  mapClick (d) {
    var nextRegion = null
    d3.selectAll('.mapActive').classed('mapActive', false)
    if (this.state.activeRegion === d.properties.region) {
      nextRegion = null
      d3.selectAll('.mapActive').classed('mapActive', false)
    } else if (d.properties.geoType === 'region') {
      nextRegion = d.properties.region
      d3.selectAll('.region').sort(d => {
        return d.properties.region === nextRegion ? 1 : 0
      })
      d3.select('.' + d.properties.region.split(' ').join('_')).classed('mapActive', true)
    }

    this.setState({
      activeRegion:nextRegion
    })
  }

  renderMap () {
    if (!this.props.analyses[this.state.activeAnalysis] ||
        !this.props.analyses[this.state.activeAnalysis][this.state.educationLevel] ||
        !this.state.childGeo || !this.state.regionGeo) {
      return <div style={{ minHeight:'100vh' }}> Loading ... </div>
    }

    var data = this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }

    var gradeScale = d3.scaleOrdinal()
      .domain(['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E', 'E-'])
      .range(Blues)

    regionGeo.features = this.state.regionGeo.features.map(d => {
      var regionGrade = data[d.properties.region] &&
        data[d.properties.region][this.state.activeCategory] &&
        data[d.properties.region][this.state.activeCategory].Grade
        ? data[d.properties.region][this.state.activeCategory].Grade : 'E-'

      regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
      d.properties.fillColor = gradeScale(regionGrade)
      d.properties.grade = regionGrade
      return d
    })

    var childGeo =  {
      'type': 'FeatureCollection',
      'features': []
    }
    if (this.state.activeRegion) {
      childGeo.features = this.state.childGeo.features
        .filter(puma => regions[this.state.activeRegion] &&
          regions[this.state.activeRegion].includes(puma.properties.NAMELSAD10))
        .map(d => {
          var region = d.properties.NAMELSAD10
          var regionGrade = data[region] &&
            data[region][this.state.activeCategory] &&
            data[region][this.state.activeCategory].Grade
            ? data[region][this.state.activeCategory].Grade : 'E-'
          d.properties.fillColor = gradeScale(regionGrade)
          d.properties.grade = regionGrade
          d.properties.geoType = 'puma'
          d.properties.region = region
          return d
        })
    }
    return (
      <div>
        {this.renderLegend(gradeScale)}
        <div style={{ fontSize:'2.1em', position:'absolute', top: 15, right:15 }}> {this.state.activeRegion}</div>
        <ResponsiveMap
          geo={regionGeo}
          click={this.mapClick}
          activeRegion={this.state.activeRegion}
          activeCategory={this.state.activeCategory}
          activeAnalysis={this.state.activeAnalysis}
          educationLevel={this.state.educationLevel}
          childGeo={childGeo}
        />
      </div>
    )
  }

  setActiveCategory (cat) {
    this.setState({ activeCategory:cat })
  }

  setActiveAnalysis (cat) {
    this.props.router.push('/data/' + cat)
    this.setState({ activeAnalysis:cat })
  }

  render () {
    return (
      <div className='container-fluid text-center'>
        <div className='row'>
          <div className='col-md-9 sidebar' style={{ overflow:'hidden' }}>
            {this.renderMap()}
            {this.dataTable()}

          </div>
          <div className='col-md-3'>
            <Sidebar
              categories={cats}
              activeCategory={this.state.activeCategory}
              categoryClick={this.setActiveCategory}
              analyses={analyses}
              activeAnalysis={this.state.activeAnalysis}
              analysisClick={this.setActiveAnalysis}
            />
          </div>
        </div>
      </div>
    )
  }
}

DataExplorer.propTypes = {
  params : React.PropTypes.object.isRequired,
  loadAnalyses : React.PropTypes.func.isRequired,
  analyses : React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  analyses : state.analysis
})

export default connect(mapStateToProps, { loadAnalyses })( withRouter(DataExplorer) )

// joinData (regions, pumas) {
//   if (!regions || !pumas) return
//   regions = regions.reduce((prev, current) => {
//     current.Regions = current.Regions.replace(', New York', '').replace('; New York', '')
//     prev[current.Regions] = current
//     return prev
//   }, {})
//   var output = {}
//   Object.keys(regions).forEach(reg => {
//     var row = {}
//     cats.forEach(currentCat => {
//       row[currentCat] = {}
//       Object.keys(regions[reg]).filter(col => { // Filter for Active category
//         return col.includes(currentCat)
//       })
//       .map((col, i) => {
//         row[currentCat][calc[i]] = regions[reg][col]
//       })
//     })
//     output[reg] = row
//   })
//   Object.keys(pumas).forEach(reg => {
//     var row = {}
//     cats.forEach(currentCat => {
//       row[currentCat] = {}
//       Object.keys(pumas[reg]).filter(col => { // Filter for Active category
//         return col.includes(currentCat)
//       })
//       .map((col, i) => {
//         row[currentCat][calc[i]] = pumas[reg][col]
//       })
//     })
//     output[reg] = row
//   })
//   console.log('output', JSON.stringify(output))
// }
