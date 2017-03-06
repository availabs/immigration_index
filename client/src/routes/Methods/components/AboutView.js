import React from 'react'
import * as d3 from 'd3'
import './AboutView.scss'

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
      <div className='container-fluid text-center' style={{ minHeight:'100vh', backgroundColor:'#6baed6' }}>
        <div className='container' style={{ color:'#efefef' }}>
          <div className='row'>
            <div className='col-md-12' style={{ overflow:'hidden' }}>
              <h1>Methods</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
