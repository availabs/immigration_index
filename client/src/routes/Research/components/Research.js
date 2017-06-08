import React from 'react'
import * as d3 from 'd3'
import './Research.scss'

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
      <div className='container-fluid text-center .research-content' style={{ minHeight:'100vh', background: '#fff' }}>
        <div className='container' >
          <div className='row'>
            <div className='col-md-2' />
            <div className='col-md-8' style={{ overflow:'hidden', textAlign:'justify' }}>
              <h1>Study Methodology</h1>
              <p style={{ textAlign: 'justify' }}><span>To
                  account for the effects of nativity status, race/ethnicity and gender in
                  determining economic outcomes for foreign-born New Yorkers, we (a) compare
                  foreign-born outcomes with outcomes of native-born counterparts, while
                  controlling for educational attainment and English proficiency (Groups 1-8);
                  (b) compare economic outcomes for foreign-born men and women (Groups 9 and 10);
                  and (c) compare outcomes for the most vulnerable foreign born (those who do not
                  speak English well and do not hold a high school diploma with the state
                  average. Group 11).</span></p>
              <div>
                <table className='table'>
                  <tbody><tr>
                    <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                      <p className='MsoListParagraphCxSpFirst' align='center' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Purpose of Analysis</span></b></p>
                    </td>
                    <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                      <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Groups</span></b></p>
                    </td>
                  </tr>
                    <tr style={{ height: '80.95pt' }}>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Effects
                            of <b>nativity status</b> on economic outcomes of foreign-Born New Yorkers. </span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Control
                            for education and English Proficiency.</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 1</span></b><span>: Foreign-Born and native-born residents.
                            These two cohorts are college educated and speak English well.</span></p>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 2</span></b><b><span>:</span></b><span>
                            Foreign-Born and native-born residents. These cohorts are high school diploma
                            holders and speak English well.</span></p>
                      </td>
                    </tr>
                    <tr style={{ height: '127.75pt' }}>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpFirst' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Effects
                            of <b>nativity status and race</b> on economic outcomes of foreign-born New
                            Yorkers. </span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Control
                            for education and English Proficiency</span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 3</span></b><span>:</span><span>
                            Foreign-Born people of color, self-identified as non-White (including
                            Hispanic) and native-born White, non-Hispanic. These cohorts are college
                            educated and speak English well.</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 4</span></b><b><span>:</span></b><span>
                            Foreign-Born people of color, self-identified as non-White (including
                            Hispanic) and native White, non-Hispanic residents. These cohorts are high
                            school diploma holders and speak English well.</span></p>
                      </td>
                    </tr>
                    <tr style={{ height: '76.9pt' }}>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpFirst' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Effects
                            of <b>nativity status</b> on economic outcomes of foreign-born women. </span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Control
                            for gender, education and English proficiency</span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 5</span></b><b><span>:</span></b><span>
                            Foreign-Born women and native-born women. These two cohorts are college
                            educated and speak English well.</span></p>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 6</span></b><span>:</span><span>
                            Foreign-Born women and native-born women. These cohorts are high school
                            diploma holders and speak English well.</span></p>
                      </td>
                    </tr>
                    <tr style={{ height: '106.15pt' }}>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpFirst' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Effects
                            of <b>nativity status and race</b> on economic outcomes of foreign-born
                            women. </span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Control
                            for gender, education and English proficiency.</span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 7</span></b><span>: Foreign-Born women of color, self-identified
                            as non-White (including Hispanic) and native-born White, non-Hispanic women.
                            These cohorts are college educated and speak English well.</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 8</span></b><b><span>:</span></b><span>
                            Foreign-Born people of color, self-identified as non-White (including
                            Hispanic) and native White, non-Hispanic residents. These cohorts are high
                            school diploma holders and speak English well.</span></p>
                      </td>
                    </tr>
                    <tr style={{ height: '86.35pt' }}>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: 'normal' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Effects of <b>gender </b>on economic
                            outcomes for foreign-born women. </span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Control for education and English
                            proficiency.</span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 9</span></b><span>: Foreign-born
                            women with foreign-born men, (both groups in this comparison are holders of
                            Bachelor degrees and speak English well.&nbsp; </span></p>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 10</span></b><b><span>:</span></b><span> Foreign-born
                            women with foreign-born men, (both groups in this comparison are holders of
                            high school diploma holders and speak English well).</span></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p style={{ marginBottom: '.0001pt', lineHeight: 'normal' }}><span>&nbsp;</span></p>
                        <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><span>Measures
                            economic outcomes for the most vulnerable foreign-born New Yorkers </span></p>
                      </td>
                      <td width={719} valign='top' style={{ width: '215.75pt', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p className='MsoListParagraphCxSpLast' style={{ marginTop: '0in', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', lineHeight: '115%' }}><b><span>Group 11</span></b><span>: Foreign-Born residents who do not
                            speak English well and do not hold a high school diploma. This group’s
                            economic outcomes are analyzed by comparing their economic outcomes in each
                            region against a state average of their foreign-born counterparts to assess
                            how they&nbsp; are faring in ech region. </span></p>
                      </td>
                    </tr>
                  </tbody></table>
                <h4>Socio-Economic Indicators</h4>

                <table className='table' style={{border: 'solid #eee 1.0pt'}}>
                <tbody>
                <tr>
                  <td><strong>Income Level for full time Workers</strong></td>
                  <td>Income level of full time workers (15 years & older) during the last 12 months.</td>
                </tr>
                <tr>
                  <td><strong>Homeownership</strong></td>
                  <td>Percentage of residents who own their own homes (25-64 years old).</td>
                </tr>
                <tr>
                  <td><strong>Rent Burden</strong></td>
                  <td>Percentage of residents who spent 50% or more of their income on rent (25-64 years old).</td>
                </tr>
                <tr>
                  <td><strong>Working Poor</strong></td>
                  <td>Percentage of full time workers with income to poverty ratio lower than or equal to 150% of federal poverty line (25-64 years old).</td>
                </tr>
                <tr>
                  <td><strong>Poverty</strong></td>
                  <td>Percentage of residents whose household income fell below 150% of federal poverty line (25-64 years old)</td>
                </tr>
                <tr>
                  <td><strong>Unemployment</strong></td>
                  <td>Percentage of residents who are unemployed and actively seeking a job (25-64 years old)</td>
                </tr>
                <tr>
                  <td><strong>Full-Time Work</strong></td>
                  <td>Percentage of full time workers who were employed full time during the last 12 months (25-64 years old)</td>
                </tr>
                </tbody>
                </table>
                          
              <p>        
              We control for educational attainment which is defined as the percentage of high school diploma holders (25-64 years old) and percentage of holders of Bachelor degree or better. We also control for language proficiency which is defined as foreign -born who speak English well or very well.
              </p>
              </div>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in' }}><i><span>&nbsp;</span></i></p>
              <h2 style={{ textAlign: 'justify' }}>
                Regional Score Card and Ranks
              </h2>
              <p style={{ marginBottom: '10.0pt', textAlign: 'justify', lineHeight: '115%' }}><span>To understand the
                  impact of nativity, race and gender on economic security of foreign-born
                  residents of the state, we compare economic outcomes (using seven indicators:
                  income, poverty, unemployment, full time work, working poor, rent burden, and
                  homeownership). </span></p>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', textAlign: 'justify' }}><span>We
                  create a numerical representation/a score for each of the 10 regions of New
                  York State. We will rate and rank New York State regions based on their
                  performance in integrating immigrants economically (based on outcomes of
                  objective 1). We will use the following 10 geographic divisions of New York State:
                  Capital Region; Central NY; Mohawk Valley; Western NY; NY County; Southern
                  Tier; Mid-Hudson; Long Island; North Country; and Finger Lakes. The methodology
                  is repeated for 145 PUMA (Public-Use Microdata Areas) in New York State to
                  represent the economic integration of foreign-born New Yorkers. </span></p>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '10.0pt', marginLeft: '0in', textAlign: 'justify' }}><span>To
                  provide a score for each region, we adapted the methodology used by Pastor
                  et.al. (2012) in their creation of a score card for immigrant integration in a
                  community in California. We used the following methodology to measure the
                  disparity between the foreign and native-born residents for both 10-region and
                  145-PUMA analyses.</span></p>
              <p className='MsoListParagraphCxSpFirst' style={{ marginBottom: '.0001pt', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Calculate the percentages
                  of each indicator in regions </span></p>
              <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Calculate disparity
                  ratio between the compared groups within each region</span></p>
              <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Calculate the
                  mean across and &nbsp;the standard deviation for each variable across regions. </span></p>
              <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Calculate the
                  “score” by normalizing the value of indicators in each region using the mean
                  and standard deviations. </span></p>
              <p className='MsoListParagraphCxSpMiddle' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Signs of scores
                  for poverty, unemployment, working poor, and rent burden are converted for
                  consistency of the overall analysis.</span></p>
              <p className='MsoListParagraphCxSpLast' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Convert each
                  score to a 9-point grade system (A-E) based on the following chart.</span></p>
              <div align='center'>
                <br />
                <table className='table'>
                  <tbody><tr>
                    <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                      <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>Score
                              Range</span></b></p>
                    </td>
                    <td width={120} valign='top' style={{ width: '.5in', border: 'solid windowtext 1.0pt', borderLeft: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                      <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>Grade</span></b></p>
                    </td>
                  </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>1.75
                            ≤ Score</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>A</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>1.25≤
                            Score&lt;1.75</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>A-</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>0.75≤Score&lt;1.25</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>B</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>0.25≤Score&lt;0.75</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>B-</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>-0.25≤Score&lt;0.25</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>C</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>-0.75≤Score&lt;-0.25</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>C-</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>-1.25≤Score&lt;-0.75</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>D</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>-1.75≤Score&lt;-1.25</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>D-</span></b></p>
                      </td>
                    </tr>
                    <tr>
                      <td width={348} valign='top' style={{ width: '1.45in', border: 'solid windowtext 1.0pt', borderTop: 'none', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><span>Score&lt;-1.75</span></p>
                      </td>
                      <td width={120} valign='top' style={{ width: '.5in', borderTop: 'none', borderLeft: 'none', borderBottom: 'solid windowtext 1.0pt', borderRight: 'solid windowtext 1.0pt', padding: '0in 5.4pt 0in 5.4pt', borderColor:'#efefef' }}>
                        <p align='center' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', textAlign: 'center', lineHeight: 'normal' }}><b><span>E</span></b></p>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', lineHeight: 'normal' }}><span>&nbsp;</span></p>
              <p className='MsoListParagraph' style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '.5in', textIndent: '-.25in', lineHeight: 'normal' }}><span style={{ fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span></span><span>Rank the regions
                  terms of the extent to which immigrants are integrated along the economic
                  spectrum in the region. </span></p>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', lineHeight: 'normal' }}><span>&nbsp;</span></p>
              <span style={{ fontSize: '11.0pt', lineHeight: '107%', fontFamily: '"Times New Roman",serif' }}><br clear='all' style={{ pageBreakBefore: 'always' }} />
              </span>
              <p> <span>&nbsp;</span></p>
              <p style={{ marginTop: '5.0pt', marginRight: '0in', marginBottom: '.0001pt', marginLeft: '0in', lineHeight: 'normal' }}><b><span>&nbsp;</span></b></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView
