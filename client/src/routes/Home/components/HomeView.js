import React from 'react'
import * as d3 from 'd3'
import './HomeView.scss'


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

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  

  render () {
    return (
      <div className='container-fluid text-center' style={{minHeight:'100vh', backgroundColor:'#6baed6'}}>
        <div className='container' style={{color:'#efefef'}}>
          <div className='row'>
            <div className='col-md-12' style={{ overflow:'hidden' }}>
              <h1>Immigrant Integration Index</h1>
              <div>
                The Immigrant Integration Index seeks to deepen understanding of the moderating effects of nativity status, race/ethnicity and gender in shaping the economic outcomes of foreign-born New York State residents. 
                <br />
                The Immigrant Integration index creates a profile for each community of New York State to illuminate areas of disparities that warrant targeted investments. It also creates a mechanism that allows for benchmarking and tracking progress over time to account for return on public investments.
                <br />
                The Immigrant Integration Index is designed as a policy tool to assist policy makers in making informed decisions about targeting investments to areas of greatest need and tailoring policy responses to the specific needs of each community. 
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
