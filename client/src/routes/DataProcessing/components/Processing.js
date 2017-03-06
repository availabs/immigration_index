import React from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import regions from '../assets/regions'
// Styling

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

class DataProcessing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puma_data: []
    }
  }

  componentDidMount () {
    d3.csv('/csv/group11.csv', (err, groupData) => {
      if (err) console.log('error', err)
      this.setState({
        puma_data: groupData
      })
    })
  }

  joinData (data) {
    if (!data) return
    var regions = data.reduce((prev, current) => {
      current.Regions = current.Regions.replace(', New York', ' PUMA').replace('; New York', '').trim() // + ' PUMA'
      prev[current.Regions] = current
      return prev
    }, {})
    var output = {}
    Object.keys(regions).forEach(reg => {
      var row = {}
      cats.forEach(currentCat => {
        row[currentCat] = {}
        Object.keys(regions[reg]).filter(col => { // Filter for Active category
          return col.includes(currentCat)
        })
        .map((col, i) => {
          row[currentCat][calc[i]] = regions[reg][col]
        })
      })
      output[reg] = row
    })
    return JSON.stringify(output)
  }

  render () {
    var json = this.joinData(this.state.puma_data)
    return (
      <div className='container-fluid text-center'>
        {json}
      </div>
    )
  }
}

export default DataProcessing
