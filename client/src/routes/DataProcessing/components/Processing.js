import React from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import regions from '../assets/regions'
// Styling

const cats = [
  'Overall',
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

class DataProcessing extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      puma_data: []
    }
  }

  componentDidMount () {
    d3.csv('/csv_v2/group11.csv', (err, groupData) => {
      if (err) console.log('error', err)
      this.setState({
        puma_data: groupData
      })
    })
  }

  joinData (data) {
    if (!data) return
    var regions = data.reduce((prev, current) => {
      current.Regions = current.Regions.replace('; New York', ' ').replace(', New York', ' ').trim() + ' PUMA'
      prev[current.Regions] = current
      return prev
    }, {})
    var output = {}
    Object.keys(regions).forEach(reg => {
      var row = {}
      cats.forEach(currentCat => {
        row[currentCat] = {}
        Object.keys(regions[reg]).filter(col => { // Filter for Active category
          return col.indexOf(currentCat) !== -1
        })
        .map((col, i) => {
          var index = currentCat === 'Overall' ? i + 1 : i

          row[currentCat][calc[index]] = regions[reg][col]
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
