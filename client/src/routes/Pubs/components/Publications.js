import React from 'react'
import './Publications.scss'

const FactSheets = [
  {'url':'Immigrant Integration Index Blurb.pdf', name: 'Project Overview' },
  {'url':'FactSheets-I3- Capital Region.pdf', name: 'Fact Sheet: Capital Region' },
  {'url':'FactSheets-I3 CentralNewYork.pdf', name: 'Fact Sheet: Central New York'},
  {'url':'I3FactSheet- Mohawk Valley.pdf', name: 'Fact Sheet: Mohawk Valley'},
  {'url':'I3FactSheet- North Country.pdf', name: 'Fact Sheet: North Country'},
  {'url':'I3 Fact Sheets - Finger Lakes.pdf', name: 'Fact Sheet: Finger Lakes'},
  {'url':'I3 Fact Sheets - Long Island.pdf', name: 'Fact Sheet: Long Island'},
  {'url':'I3 Fact Sheets - Mid Hudson.pdf', name: 'Fact Sheet: Mid Hudson'},
  {'url':'I3 Fact Sheets - New York.pdf', name: 'Fact Sheet: New York'},
  {'url':'I3FactSheet- Southern Tier.pdf', name: 'Fact Sheet: Southern Tier'},
  {'url':'I3 Fact Sheets - Western New York.pdf', name: 'Fact Sheet: Western New York'},
  {'url':'FB-NoEnglish-NoEducation.pdf', name: 'Fact Sheet: Vulnerable Populations' }
]


class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

   renderFactSheet (url, name) {
    return (
      <a href={'/pubs/' + url} target='_blank'>
        <div className='row' style={{ backgroundColor: '#fff', border: '2px solid rgb(67, 147, 195)', paddingTop: 10, marginBottom: 6 }}>
         
            <div className='col-md-2' style={{ textAlign:'center' }}>
              <div style={{width:'85%', padding:10, paddingTop: 0}}>
                <img className='img-fluid' src='/img/doc_thumb.png' />
                
              </div>
            </div>
            <div className='col-md-9'>
              <h4 style={{color: '#111', paddingTop:27}}>{name}</h4>
            </div> 
        </div>
       </a>
    )
  } 

  render () {
    return (
      <div className='container-fluid text-center' style={{ minHeight:'100vh', backgroundColor:'#efefef' }}>
        <div className='container' style={{ color:'#333' }}>
          <div className='row'>
            <div className='col-md-2' />
            <div className='col-md-8' style={{ overflow:'hidden', paddingBottom: 30 }}>
              <h1>Publications</h1>
              <div className='row' style={{ border: '1px solid #6baed6', paddingTop: 10 }}>
                <div className='col-md-3' style={{ textAlign:'center' }}>
                  <a href='/pubs/PolicyBrief-VulnerableGroup.pdf' target='_blank'>
                    <img className='img-fluid' src='/img/policy_brief.png' />
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
              <h1> Fact Sheets </h1>
              {FactSheets.map(d => this.renderFactSheet(d.url, d.name))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
