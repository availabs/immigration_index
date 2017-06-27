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
import AffixWrapper from 'components/Affix/AffixWrapper'
// CONST Data sources
import regions from '../assets/regions'
import html2canvas from 'html2canvas'
// import testxml from ''
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



function makePDF () {
  var quotes = document.getElementById('DataViewer')
  var images = []
  var nodes = []
  var svgElem = quotes.querySelectorAll('#mapSVG')
  var elements = svgElem.forEach(function(node) {
    var parent = node.parentNode

    var svg = node.innerHTML
    console.log(node.width.baseVal.value, node.height.baseVal.value)
    var image = new Image();
    var open = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="'+ node.width.baseVal.value + '" height="' + node.height.baseVal.value + '">'
    image.src = 'data:image/svg+xml,' + escape(open + svg + '</svg>')
    parent.appendChild(image);
    node.style.display = 'none'
    document.getElementById('toolTipDiv').style.display = 'none'
    images.push(image)
    nodes.push(node)
   
    
    image.onload = function() {
      image.onload = function() {}
      var canvas = document.createElement('canvas')
      console.log('lading ',image.width, image.height)
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      image.src = canvas.toDataURL();
    }  
  })
  
    // At this point the container has no SVG, it only has HTML and Canvases.
    window.scrollTo(0, 0)
    html2canvas(quotes, {
    allowTaint: true,
    onrendered: function (canvas) {
        //! MAKE YOUR PDF

      var pdf = new jsPDF('p', 'pt', 'letter')
      var start_width = quotes.clientWidth * 1.2
      var start_height = 1400
      console.log('export', quotes.clientHeight, ' > ', start_height )
      for (var i = 0; i <= (quotes.clientHeight) / start_height; i++) {
            //! This is all just html2canvas stuff
        var srcImg = canvas
        var sX = 0
        var sY = start_height * i // start start_height pixels down for every new page
        var sWidth = start_width
        var sHeight = start_height
        var dX = 0
        var dY = 0
        var dWidth = start_width
        var dHeight = start_height

        window.onePageCanvas = document.createElement('canvas')
        onePageCanvas.setAttribute('width', start_width)
        onePageCanvas.setAttribute('height', start_height)
        var ctx = onePageCanvas.getContext('2d')
            // details on this usage of this function:
            // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
        ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)

            // document.body.appendChild(canvas);
        var canvasDataURL = onePageCanvas.toDataURL('image/png', 1.0)

        var width = onePageCanvas.width
        var height = onePageCanvas.clientHeight

            //! If we're on anything other than the first page,
            // add another page
        if (i > 0) {
          pdf.addPage(612, 791) // 8.5" x 11" in pts (in*72)
        }
            //! now we declare that we're working on that page
        pdf.setPage(i + 1)
            //! now we add content to that page!
        pdf.addImage(canvasDataURL, 'PNG', 10, 10, (width * (700 / width)), (height * 0.32))
      }
        //! after the for loop is finished running, we save the pdf.
      pdf.save('immigration_index.pdf')
      nodes.forEach(node => {
        node.style.display = 'block'
      })
      images.forEach(node => {
        node.style.display = 'none'
      })
      document.getElementById('toolTipDiv').style.display = 'block'

    }
  })
    
}

const cats = {
  'Overall': {
    name: 'Overall',
    desc: 'Aggregated score for all categories.',
    type: 'activeCategory'
  },
  'Full Time': {
    name: 'Full-Time Work',
    desc: 'Percentage of full time workers who were employed full time during the last 12 months (25-64 years old)',
    type: 'activeCategory'
  },
  'Poverty': {
    name: 'Poverty',
    desc: 'Percentage of residents whose household income fell below 150% of federal poverty line (25-64 years old)',
    type: 'activeCategory'
  },
  'Working Poor': {
    name: 'Working Poor',
    desc: 'Percentage of full time workers with income to poverty ratio lower than or equal to 150% of federal poverty line (25-64 years old)',
    type: 'activeCategory'
  },
  'Homeownership': {
    name: 'Homeownership',
    desc: 'Percentage of residents who own their own homes (25-64 years old)',
    type: 'activeCategory'
  },
  'Rent Burden': {
    name: 'Rent Burden',
    desc: 'Percentage of residents who spent 50% or more of their income on rent. (25-64 years old)',
    type: 'activeCategory'
  },
  'Unemployment': {
    name: 'Unemployment',
    desc: 'Percentage of workers who are unemployed (25-64 years old)',
    type: 'activeCategory'
  },
  'Income': {
    name: 'Income Level for FT  Workers',
    desc: 'Income level of full time workers during the last 12 months (25-64 years old)',
    type: 'activeCategory'
  }
}

const calc = ['Ratio', 'Rank', 'Grade']

const education = {
  babs: {
    name: 'Bachelor’s Degree or More',
    desc: 'Holds Bachelor’s degree or better; speaks English well.',
    type: 'educationLevel',
    subcats: cats
  },
  hs : {
    name: 'High School Diploma / Some College',
    desc: 'Has High School diploma or some college; speaks English well.',
    type: 'educationLevel',
    subcats: cats
  }
}

const analyses = {
  nativity: {
    name: 'The Effects of Nativity Status',
    info: 'Effects of nativity status on economic outcomes of foreign-Born New Yorkers.',
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
        name:'Foreign Born people of color and Native Born white non-hispanic',
        type: 'activeAnalysis',
        subcats: education
      },
      'race_women': {
        name:'Foreign Born Women of color and Native Born Women white non-hispanic',
        type: 'activeAnalysis',
        subcats: education
      }
    }
  },
  gender: {
    name: 'The Effects of Gender',
    info: 'Effects of nativity status on economic outcomes of foreign-born women.',
    heading: 'Foreign Born Women and Foreign Born Men',
    subcats: education
  },
  vulnerable: {
    name: 'The Effects of Low English Proficiency and Educational Attainment',
    info: 'Measures economic outcomes for the foreign-born with no high school diploma and low English proficiency.',
    heading: 'Foreign-born with no high school diploma and low English proficiency',
    subcats: cats
  }
}
const Blues = ['rgb(5,48,97)', 'rgb(33,102,172)', 'rgb(67,147,195)', 'rgb(146,197,222)', 'rgb(209,229,240)',
  'rgb(253,219,199)', 'rgb(244,165,130)', 'rgb(214,96,77)', 'rgb(178,24,43)', 'rgb(103,0,31)']
const gradeScale = d3.scaleOrdinal()
      .domain(['A', 'A-', 'B', 'B-', 'C', 'C-', 'D', 'D-', 'E'])
      .range(Blues)
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
      regionGeo: null,
      display: 'map'
    }
    this.setActiveCategory = this.setActiveCategory.bind(this)
    this.setActiveAnalysis = this.setActiveAnalysis.bind(this)
    this.educationClick = this.educationClick.bind(this)
    this.mapClick = this.mapClick.bind(this)
    this.renderLegend = this.renderLegend.bind(this)
  }

  componentDidMount () {
    d3.json('/geo/ny_puma_geo.json', (err, geodata) => {
      console.log('geodata')
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
                return regions[region].indexOf(d.properties.NAMELSAD10) !== -1
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
    if (nextProps.params.type && nextProps.params.type !== this.state.activeAnalysis) {
      this.setState({ activeAnalysis: nextProps.params.type })
    }
  }

  numberFormat (val) {
    if (!val || val.indexOf('#') !== -1) return 'No Data'
    if (val.indexOf('%') !== -1) return val
    return (+val).toFixed(2)
  }
  gradeFormat (val) {
    if (!val || val.indexOf('#') !== -1) return 'No Data'
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
      .filter(region => regionFilter.indexOf(region) !== -1)
      .sort((a, b) => data[a][this.state.activeCategory].Rank - data[b][this.state.activeCategory].Rank)
      .map((region, i) => {
        return (
          <tr key={region}>
            <td>{region}</td>
            {this.state.activeCategory === 'Overall' ? null
              : <td>{this.numberFormat(data[region][this.state.activeCategory].Ratio)}</td>}
            <td>{this.state.activeRegion ? data[region][this.state.activeCategory].Rank : (i+1) }</td>
            <td>{this.gradeFormat(data[region][this.state.activeCategory].Grade)}</td>
          </tr>
        )
      })

    return (
      <div style={{padding: 10}}>
       
          <div className='col-md-12' style={{ backgroundColor:'#efefef', borderRadius: 5, padding:10 }}>
            <h4>{analyses[this.state.activeAnalysis.split('_')[0]].name}</h4>
            {['race'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>Foreign Born people of color and Native Born white non-hispanic</strong> : ''}
            {['race_women'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>Foreign Born Women of color And Native Born Women white non-hispanic<br /></strong> : ''}
            {['nativity', 'nativity_women'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>{analyses['nativity'].subcats[this.state.activeAnalysis].heading}</strong> : <strong>{analyses[this.state.activeAnalysis]  ? analyses[this.state.activeAnalysis].heading : ''}</strong>}
            
            {this.state.activeAnalysis !== 'vulnerable' ?
              (
                <span>
                {' | '} <strong>{education[this.state.educationLevel].name}</strong>
                {' | ' + education[this.state.educationLevel].desc}
                </span>
              )
              : ''
            }
          </div>
          
        <table className='table table-hover' style={{ backgroundColor: '#fff', marginTop: 40, }}>
          <thead>
            <tr>
              <th>Region</th>
              {
                calc
                  .filter(header => {
                    return !(this.state.activeCategory === 'Overall' && header === 'Ratio')
                  })
                  .map(header => <th key={header}>{header}</th>)
              }
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

  educationClick (level) {
    if (level !== this.state.educationLevel) {
      this.setState({
        display:level
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
          <div className='col-md-5' style={{ backgroundColor:'#efefef',minHeight:171, borderRadius: 5, padding:10 }}>
            <h5>
              {cats[this.state.activeCategory].name}
              <span style={{ float: 'right' }}>{this.state.activeRegion}</span>
            </h5>
            <br />
            <div style={{ marginTop: -15 }}>
              <div className='legendRow'>
                {colors}
              </div>
              <div className='legendRow'>
                {grades}
              </div>
            </div>
            {cats[this.state.activeCategory].desc}
          </div>
          <div className='col-md-1' />
          <div className='col-md-6' style={{ backgroundColor:'#efefef', borderRadius: 5, padding:10 }}>
            <h4>{analyses[this.state.activeAnalysis.split('_')[0]].name}</h4>
            {['race'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>Foreign Born people of color and Native Born white non-hispanic<br /></strong> : ''}
            {['race_women'].indexOf(this.state.activeAnalysis) !== -1? <strong>Foreign Born Women of color And Native Born Women white non-hispanic<br /></strong> : ''}
            {['nativity', 'nativity_women'].indexOf(this.state.activeAnalysis) !== -1 ? <strong>{analyses['nativity'].subcats[this.state.activeAnalysis].heading}<br /></strong> : ''}
            {
              analyses[this.state.activeAnalysis] && analyses[this.state.activeAnalysis].heading ?
              <strong>{analyses[this.state.activeAnalysis].heading}<br /></strong>
              : ''
            }

            {this.state.activeAnalysis !== 'vulnerable' ?
              (
                <span>
                  <strong>{education[this.state.educationLevel].name}<br /></strong>
                 
                  {education[this.state.educationLevel].desc}
                </span>
              )
              : ''
            }
          </div>
        </div>
      </div>
    )
  }

  renderMapTableButtons () {
    var mapClass = 'catbutton'
    mapClass += this.state.display === 'map' ? ' active' : ''
    var tableClass = 'catbutton'
    tableClass += this.state.display === 'table' ? ' active' : ''
    return (
      <div className='catButtons' style={{ float: 'right' }}>
        <div className='catDiv'>
          <div onClick={this.educationClick.bind(null, 'map')}>
            <div className={mapClass}>
              <p className='catContent' style={{ fontSize:'0.7em' }}>
                Map
              </p>
            </div>
          </div>
        </div>
        <div className='catDiv'>
          <div onClick={this.educationClick.bind(null, 'table')}>
            <div className={tableClass}>
              <p className='catContent' style={{ fontSize:'0.7em' }}>
                Table
              </p>
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
      this.props.loadAnalyses(this.state.activeAnalysis, this.state.educationLevel)
      return <div style={{ minHeight:'100vh' }}> Loading ... {Object.keys(this.props.analyses)}</div>
    }

    var data = this.props.analyses[this.state.activeAnalysis][this.state.educationLevel]
    var regionGeo = {
      'type': 'FeatureCollection',
      'features': []
    }

    regionGeo.features = this.state.regionGeo.features
      .sort((a, b) => data[a.properties.region][this.state.activeCategory].Rank - data[b.properties.region][this.state.activeCategory].Rank)
      .map((d,i) => {
        var regionGrade = data[d.properties.region] &&
          data[d.properties.region][this.state.activeCategory] &&
          data[d.properties.region][this.state.activeCategory].Grade
          ? data[d.properties.region][this.state.activeCategory].Grade : 'E'

        // regionGrade = gradeScale.domain().indexOf(regionGrade) !== -1 ? regionGrade : 'E-'
        d.properties.fillColor = regionGrade.includes('#') ? 'url(#crosshatch) #fff' : gradeScale(regionGrade)
        d.properties.grade = this.gradeFormat(regionGrade)
        d.properties.rank = data[d.properties.region][this.state.activeCategory].Rank ? (i+1) : 'No Data'
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
    if (updateKey === 'activeAnalysis') {
      this.props.router.push('/data/' + cat)
    }
    var update = {}
    update[updateKey] = cat
    this.setState(update)
  }

  render () {
    return (
      <div className='container-fluid text-center DataExplorer'>
        <div className='row'>

          
          <div className='col-md-3 hidden-print'>
            <Sidebar
              categories={Object.keys(cats)}
              activeCategory={this.state.activeCategory}
              activeAnalysis={this.state.activeAnalysis}
              educationLevel={this.state.educationLevel}
              categoryClick={this.setActiveCategory}
              analyses={analyses}
              analysisClick={this.setActiveAnalysis}
            />
            <a onClick={makePDF}>
              <div className='row' style={{ backgroundColor: '#fff', border: '1px solid white', paddingTop: 3, marginBottom: 10 }}>
               
                  <div className='col-md-2' style={{ textAlign:'center' }}>
                    <div style={{width:'100%', paddingBottom:2, paddingTop: 0}}>
                      <img className='img-fluid' src='/img/doc_thumb.png' />
                      
                    </div>
                  </div>
                  <div className='col-md-9'>
                    <h4 style={{color: '#111', paddingTop:8, fontSize: 20}}> Download Report as PDF</h4>
                  </div> 
              </div>
             </a>
            
          </div>
          <div className='col-md-9 sidebar DataViewer' id='DataViewer' style={{ overflow:'hidden' }}>
            {this.renderLegend(gradeScale)}
            {
               this.renderMap()}
            {this.dataTable()
            }
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
