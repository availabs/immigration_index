import React from 'react'
import { Link } from 'react-router'
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

    var studyAreas = [
      {
        url: '/data/nativity',
        text: 'The Effects of Nativity Status',
        img: '/img/image_1.jpg'
      },
      {
        url: '/data/race',
        text: 'The Effects of Race'
      },
      {
        url: '/data/gender',
        text: 'The Effects of Gender'
      },
      {
        url: '/data/vulnerable',
        text: 'The Effects of Low English Proficiency and Educational Attainment'
      }
    ]
    return (
      <div>
        <div className='view hm-black-strong'>
          <div className='full-bg-img flex-center'>
            <ul>
              <li>
                <h1 className='h1-responsive fadeInDown brand-header' data-wow-delay='0.2s' style={{visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInDown'}}>
                  Immigrant Integration Index
                </h1>
              </li>
              <li>
                  <div className='container' >
                    <div className='row'>
                      <div className='col-md-2 hidden-sm' />
                      <div className='col-md-8 paddedDiv  main-content' style={{overflow:'hidden', textAlign:'justify' }}>
                        <h4>The Immigrant Integration Index seeks to deepen understanding of the moderating effects of nativity status, race/ethnicity and 
                        gender in shaping the economic outcomes of foreign-born New York State residents.</h4>
                        <br />
                        <p>The Immigrant Integration index creates a profile for each community of New York State to illuminate areas of disparities that 
                        warrant targeted investments. It also creates a mechanism that allows for benchmarking and tracking progress over time to account for return on 
                        public investments.</p>
                        <br />
                        <p>The Immigrant Integration Index is designed as a policy tool to assist policy makers in making informed decisions 
                        about targeting investments to areas of greatest need and tailoring policy responses to the specific needs of each community.</p>
                      </div>
                    </div>
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='container-fluid text-center'>
         
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                <div className='studiesContainer'>
                  {
                    studyAreas.map(area => {
                      return (
                        <div className='studiesDiv'>
                          <Link to={area.url}>
                            <div className='studiesbutton'>
                              <p className='studiesContent'>
                                {area.text}
                              </p>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
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
