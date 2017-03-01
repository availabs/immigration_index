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
import colorBrewer from '../assets/colorBrewer'
// Styling
import './DataExplorer.scss'

const cats = [
  'Full Time',
  'Poverty',
  'Working Poor',
  'Homeownership',
  'Rent Burden',
  'Unemployment',
  'Income'
   // ,'Naturalization'
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
  'vulnerable': {
    name: 'The Effects of Low English Proficiency and Educational Attainment',
    info: 'Vulnerable Foreign-Born Data'
  }
}
console.log(colorBrewer.RdYlBu[10].reverse())
var Blues = ['rgb(5,48,97)', 'rgb(33,102,172)', 'rgb(67,147,195)', 'rgb(146,197,222)', 'rgb(209,229,240)', 'rgb(253,219,199)', 'rgb(244,165,130)', 'rgb(214,96,77)', 'rgb(178,24,43)', 'rgb(103,0,31)']

//["rgb(49,54,149)", "rgb(69,117,180)", "rgb(116,173,209)", "rgb(171,217,233)", "rgb(224,243,248)", "rgb(254,224,144)", "rgb(253,174,97)", "rgb(244,109,67)", "rgb(215,48,39)", "rgb(165,0,38)"]
// ['rgb(0,104,55)', 'rgb(26,152,80)', 'rgb(102,189,99)', 'rgb(166,217,106)', 'rgb(217,239,139)', 'rgb(254,224,139)', 'rgb(253,174,97)', 'rgb(244,109,67)', 'rgb(215,48,39)', 'rgb(165,0,38)']
//['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7', '#f7fbff', '#fff']

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
              .filter((d) => {
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

  numberFormat (val) {
    if (val.includes('#')) return 'No Data'
    if (val.includes('%')) return val
    return (+val).toFixed(2)
  }
  gradeFormat (val) {
    if (val === '#DIV/0!') return 'No Data'
    return val
  }

  dataTable () {
    if (!this.props.analyses[this.state.activeAnalysis] ||
        !this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]) {
      this.props.loadAnalyses(this.state.activeAnalysis, this.state.educationLevel)
      return <span />
    }
    var data = this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]
    console.log('test 123', data)
    var regionFilter = this.state.activeRegion &&
      regions[this.state.activeRegion]
      ? regions[this.state.activeRegion] : Object.keys(regions)
    var rows = Object.keys(data)
      .filter(region => regionFilter.includes(region))
      .map(region => {
        return (
          <tr key={region}>
            <td>{region}</td>
            <td>{this.numberFormat(data[region][this.state.activeCategory].Ratio)}</td>
            <td>{this.numberFormat(data[region][this.state.activeCategory].Score)}</td>
            <td>{this.gradeFormat(data[region][this.state.activeCategory].Grade)}</td>
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
    var labelStrings = [
      ['Bachelor’s Degree or More', 'High School Diploma and/or Some College'],
      ['BACHELORS', 'HIGH SCHOOL']
    ]
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
                <input type='radio' name='options' autoComplete='off' /> {labelStrings[0][0].toUpperCase()}
              </label>
              <label className={hsClass} onClick={this.educationClick.bind(null, 'hs')}>
                <input type='radio' name='options' autoComplete='off' /> {labelStrings[0][1].toUpperCase()}
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

      //regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
      d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
      d.properties.grade = this.gradeFormat(regionGrade)
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

          d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
          d.properties.grade = this.gradeFormat(regionGrade)
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
