import React from 'react'
import * as d3 from 'd3'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
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

    var header = this.state.data.columns.map(col => {
      return (
        <th>{col}</th>
      )
    })

    var rows = Object.keys(this.state.data)
      .filter(row => row !== 'columns')
      .map(row => {
      return (
        <tr>
          {
            Object.keys(this.state.data[row]).map(col => {
              return( 
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

  render () {
    return (
      <div className='container text-center'>
        <h4>Welcome!</h4>
        {this.dataTable()}
      </div>
    )
  }
}

export default HomeView
