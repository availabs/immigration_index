import React from 'react'
// import { Scrollspy } from 'react-scrollspy'
import './OverView.scss'

const categories = {
      'Demographics': [1],
      'English Proficiency': [2, 3],
      'Educational Attainment' : [4, 5, 6, 7, 8, 9, 10, 11, 12],
      'Income' : [13, 14, 15, 16, 17, 18],
      'Poverty' : [19, 20, 21, 22, 23, 24],
      'Unemployment' : [25, 26, 27, 28, 29, 30]
    }

class OverView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeCategory : 'Demographics' 
    }
  }

  render () {
    
    return (
      <div>
        <div className='container-fluid text-center overview_container' style={{ backgroundColor: '#fff', overflow:'hidden' }}>
          <div className='container overview-content'>
            <div className='row'>
              <div className='col-md-2'>
                <br />
                <div items={Object.keys(categories)} currentClassName=''>
                  {
                    Object.keys(categories).map(cat => {
                      return (
                        <a href={'#' + cat} className='list-group-item'>
                          {cat}
                        </a>
                      )
                  })}
                </div>
              </div>
              <div className='col-md-10' style={{ height:'100vh', paddingRight: 0 }}>
                <div style={{ height: '100%', overflowY:'scroll', padding: 30, textAlign:'justify' }} >
                 
                  {
                    Object.keys(categories).map(cat => {
                      return (
                        <div style={{maxWidth: 940}}>
                          <h4 id={cat} >
                            {cat}
                          </h4>
                          {
                          categories[cat].map(imgId => {
                            return (
                              <img style={{maxWidth: 850, width: '100%', height:'auto'}}className='img-responsive img img-fluid' src={'/img/data_overview/img' + imgId + '.jpg'} />
                            )
                          })}
                        </div>
                      )
                  })}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OverView

