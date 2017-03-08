import React from 'react'
import './Publications.scss'

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
            <div className='col-md-2' />
            <div className='col-md-8' style={{ overflow:'hidden' }}>
              <h1>Publications</h1>
              <div className='row' style={{border: '1px solid white', paddingTop: 10}}> 
                <div className='col-md-3' style={{textAlign:'center'}}>
                  <a href='/pubs/PolicyBrief-VulnerableGroup.pdf' target='_blank'>
                    <img className='img-fluid' src='/img/policy_brief.png'/>
                    <strong>DOWNLOAD</strong>
                  </a>
                </div>
                 <div className='col-md-9'>
                  <h4>Economic Integration of the Most Vulnerable Immigrant
Population in New York State</h4>
                  <p>The most vulnerable group of foreign born residents of New York State are those who are faced with a double disadvantage; a low human
capital and Limited English Proficiency (LEP). In this Brief, we provide policy implications emerging from a study that looked at the economic
outcomes of foreign born residents of New York State who are disadvantaged by lack of high school completion, and are identified as LEP.
In this study, we compared the economic outcomes of this group in each region of the state.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
