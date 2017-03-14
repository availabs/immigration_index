import React from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
// Redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { loadAnalyses } from 'store/modules/analysis'
// Components
import ResponsiveMap from 'components/ResponsiveMap'
import Sidebar from 'components/Sidebar/SidebarThree'
// CONST Data sources
import regions from '../assets/regions'
// import colorBrewer from '../assets/colorBrewer'
// Styling
import './DataExplorer.scss'

// const cats = [
//   'Full Time',
//   'Poverty',
//   'Working Poor',
//   'Homeownership',
//   'Rent Burden',
//   'Unemployment',
//   'Income'
//    // ,'Naturalization'
// ]

const cats = {
  'Full Time': {
    name: 'Full-Time Work',
    desc: 'Percentage of full time workers who were employed full time during the last 12 months (25-64 years old)',
    type: 'activeCategory'
  },
  'Poverty': {
    name: 'Poverty',
    desc: 'Percentage of residents whose household income fell below 150% of federal poverty line',
    type: 'activeCategory'
  },
  'Working Poor': {
    name: 'Working Poor',
    desc: 'Percentage of full time workers with income to poverty ratio lower than or equal to 150% of federal poverty line',
    type: 'activeCategory'
  },
  'Homeownership': {
    name: 'Homeownership',
    desc: 'Percentage of residents who own their own homes',
    type: 'activeCategory'
  },
  'Rent Burden': {
    name: 'Rent Burden',
    desc: 'Percentage of residents who spent 50% or more of their income on rent.',
    type: 'activeCategory'
  },
  'Unemployment': {
    name: 'Unemployment',
    desc: 'Income level of full time workers (15 years & older) during the last 12 months',
    type: 'activeCategory'
  },
  'Income': {
    name: 'Income Level for FT  Workers',
    desc: 'Income level of full time workers (15 years & older) during the last 12 months',
    type: 'activeCategory'
  }
}

const calc = ['Ratio', 'Rank', 'Grade']

const education = {
  hs : {
     name: 'High School Diploma / Some College',
     type: 'educationLevel',
     subcats: cats
  },
  babs: {
     name: 'Bachelor’s Degree or More',
     type: 'educationLevel',
     subcats: cats
  }
}

const analyses = {
  nativity: {
    name: 'The Effects of Nativity Status',
    info:'Effects of nativity status on economic outcomes of foreign-Born New Yorkers.',
    type: 'activeAnalysis',
    subcats: {
      'nativity': {
        name: 'Foreign Born and Native Born',
        type: 'activeAnalysis',
        subcats: education
      },
      'nativity_women': {
        name: 'Foreign Born Women and Native Born Women',
        type: 'activeAnalysis',
        subcats: education
      }
    }
  },
  race: {
    name: 'The Effects of Race',
    info:'Effects of nativity status and race on economic outcomes of foreign-born New Yorkers.',
    subcats: {
      'race': {
        name:'Foreign Born and Native Born',
        type: 'activeAnalysis',
        subcats: education
      },
      'race_women': {
        name:'Foreign Born Women and Native Born Women',
        type: 'activeAnalysis',
        subcats: education
      }
    }
  },
  gender: {
    name: 'The Effects of Gender',
    info: 'Effects of nativity status on economic outcomes of foreign-born women.',
    subcats: education
  },
  vulnerable: {
    name: 'The Effects of Low English Proficiency and Educational Attainment',
    info: 'Measures economic outcomes for the most vulnerable foreign-born New Yorkers.',
    subcats: cats
  }
}
var Blues = ['rgb(5,48,97)', 'rgb(33,102,172)', 'rgb(67,147,195)', 'rgb(146,197,222)', 'rgb(209,229,240)', 'rgb(253,219,199)', 'rgb(244,165,130)', 'rgb(214,96,77)', 'rgb(178,24,43)', 'rgb(103,0,31)']

// ['rgb(49,54,149)', 'rgb(69,117,180)', 'rgb(116,173,209)', 'rgb(171,217,233)', 'rgb(224,243,248)', 'rgb(254,224,144)', 'rgb(253,174,97)', 'rgb(244,109,67)', 'rgb(215,48,39)', 'rgb(165,0,38)']
// ['rgb(0,104,55)', 'rgb(26,152,80)', 'rgb(102,189,99)', 'rgb(166,217,106)', 'rgb(217,239,139)', 'rgb(254,224,139)', 'rgb(253,174,97)', 'rgb(244,109,67)', 'rgb(215,48,39)', 'rgb(165,0,38)']
// ['#08306b', '#08519c', '#2171b5', '#4292c6', '#6baed6', '#9ecae1', '#c6dbef', '#deebf7', '#f7fbff', '#fff']

class DataExplorer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puma_data: [],
      activeCategory: Object.keys(cats)[0],
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
    this.renderLegend = this.renderLegend.bind(this)
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
    console.log( nextProps.params.type, this.state.activeAnalysis )
    if (nextProps.params.type && nextProps.params.type !== this.state.activeAnalysis) {
      this.setState({ activeAnalysis: nextProps.params.type })
    }
  }

  numberFormat (val) {
    console.log()
    if (val.includes('#')) return 'No Data'
    if (val.includes('%')) return val
    return (+val).toFixed(2)
  }
  gradeFormat (val) {
    if (val.includes('#')) return 'No Data'
    return val
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
      .sort((a, b) => data[a][this.state.activeCategory].Rank - data[b][this.state.activeCategory].Rank)
      .map(region => {
        return (
          <tr key={region}>
            <td>{region}</td>
            <td>{this.numberFormat(data[region][this.state.activeCategory].Ratio)}</td>
            <td>{data[region][this.state.activeCategory].Rank}</td>
            <td>{this.gradeFormat(data[region][this.state.activeCategory].Grade)}</td>
          </tr>
        )
      })

    return (
      <table className='table table-hover' style={{backgroundColor: '#fff'}}>
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
    var babsClass = 'catbutton'
    babsClass += this.state.educationLevel === 'babs' ? ' active' : ''
    var hsClass = 'catbutton'
    hsClass += this.state.educationLevel === 'hs' ? ' active' : ''
    var labelStrings = [
      ['Bachelor’s Degree or More', 'High School Diploma / Some College'],
      ['BACHELORS', 'HIGH SCHOOL']
    ]

    var catButtons = Object.keys(cats).map(cat => {
      var active = cat === this.state.activeCategory ? 'catbutton active' : 'catbutton'
      return (
        <div className='catDiv' key={cat}>
          <div onClick={this.setActiveCategory.bind(null, cat)}>
            <div className={active}>
              <p className='catContent'>
                {cat}
              </p>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='legendContainer'>
        <div className='row'>
          <div className='col-md-5' style={{backgroundColor:'#fff', borderRadius: 5, padding:10}}>
            <h5>
              {cats[this.state.activeCategory].name}
            </h5>
            <div className='legendRow'>
              {colors}
            </div>
            <div className='legendRow'>
              {grades}
            </div>
             {cats[this.state.activeCategory].desc}
          </div>
          <div className='col-md-1' />
          <div className='col-md-6' style={{backgroundColor:'#fff', borderRadius: 5, padding:10}}>
            <h4>Measures</h4>
            <div className='catButtons'>
              {catButtons}
            </div>
            <div className='row'>
              <div className='col-xs-12'>
               Educational Attainment
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='catButtons'>
                  <div className='catDiv'>
                    <div onClick={this.educationClick.bind(null, 'babs')}>
                      <div className={babsClass}>
                        <p className='catContent' style={{fontSize:'0.7em'}}>
                          {labelStrings[0][0].toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='catDiv'>
                    <div onClick={this.educationClick.bind(null, 'hs')}>
                      <div className={hsClass}>
                        <p className='catContent' style={{fontSize:'0.7em'}}>
                          {labelStrings[0][1].toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderCategories () {

    return (
      <div />
     
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

      // regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
      d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
      d.properties.grade = this.gradeFormat(regionGrade)
      d.properties.rank = data[d.properties.region][this.state.activeCategory].Rank || 'No Data'
      return d
    })

    var childGeo = {
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
          d.properties.rank = data[region][this.state.activeCategory].Rank
          d.properties.geoType = 'puma'
          d.properties.region = region
          return d
        })
    }
    return (
      <div>
        {this.renderLegend(gradeScale)}
        {this.renderCategories()}
        <div style={{ fontSize:'2.1em', position:'absolute', top: 8, right:25 }}> {this.state.activeRegion}</div>
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

  setActiveAnalysis (cat, stateKey) {
    
    let updateKey = stateKey || 'activeAnalysis'
    console.log('setActiveAnalysis', updateKey)
    if(updateKey === 'activeAnalysis') {
      this.props.router.push('/data/' + cat)
    }
    var update = {}
    update[updateKey] = cat
    this.setState(update)
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
              categories={Object.keys(cats)}
              activeCategory={this.state.activeCategory}
              activeAnalysis={this.state.activeAnalysis}
              educationLevel={this.state.educationLevel}
              categoryClick={this.setActiveCategory}
              analyses={analyses}
              
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

export default connect(mapStateToProps, { loadAnalyses })(withRouter(DataExplorer))
