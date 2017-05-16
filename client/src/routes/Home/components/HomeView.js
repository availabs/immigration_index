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
    var text = (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='col-md-2 hidden-sm' />
            <div className='col-md-8 paddedDiv  main-content' style={{ overflow:'hidden', textAlign:'justify', }}>
              <h4>The Immigrant Integration Index seeks to deepen understanding of the moderating effects of nativity status, race/ethnicity and
                gender in shaping the economic outcomes of foreign-born New York State residents.</h4>
              <br />
              
            </div>
          </div>
          
        </div>
      </div>
    )
    var title = (
      <h1 className='h1-responsive fadeInDown brand-header' data-wow-delay='0.2s' style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInDown' }}>
        Immigrant Integration Index
      </h1>
    )
    var studyAreas = (
      <div className='container' style={{ marginTop: -20 }}>
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
      </div>)

    return (
      <div>
        <div className='view hm-black-strong'>
          <div className='full-bg-img flex-center'>
            <ul>
              <li>
                {title}
              </li>
              <li>
                {text}
              </li>
            </ul>
          </div>
        </div>
        <div className='container-fluid text-center'>

          <div className='' style={{position: 'absolute', 'bottom': 5, width: '95%'}}>
             <div className='' style={{width:'100%', color:'#efefef', fontSize: 11, textAlign:'center'}}>
              The Immigrant Integration Index is a project of the Center for Women in Government & Civil Society, Rockefellar College of Public Affairs & Policy, University at Albany, SUNY
              <br />
              The Immigrant Integration Index is generously sponsored by the New York State Assembly Puerto Rican/Hispanic Task Force
              Chair: Honorable Marcos Crespo, NY State Assembly District 85<br />
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}

export default HomeView
