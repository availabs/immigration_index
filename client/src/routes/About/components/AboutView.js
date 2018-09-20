import React from 'react'
// import { Scrollspy } from 'react-scrollspy'

import './AboutView.scss'

class HomeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='container-fluid text-center about_container' style={{ backgroundColor: '#fff', overflow:'hidden' }}>
          <div className='container about-content'>
            <div className='row'>
              <div className='col-md-4'>
                <br />
                <div items={['about', 'meaning', 'measure']} currentClassName=''>
                  <a href='#about' className='list-group-item'>
                   About
                  </a>
                  <a href='#meaning' className='list-group-item'>The Meaning and Complexity of Integration</a>
                  <a href='#measure' className='list-group-item'>Why Measure Integration</a>
                </div>
                  <img 
                    
                    className='img-fluid'
                    src='/img/Center-for-Women-in-Government-and-Civil-Society-pms124_black.png' style={{float: 'right'}} />
                  <img 
                    
                    className='img-fluid'
                    src='/img/logo-task-force-logo-color.jpg' style={{float: 'right', height:175, padding:5}} />
                  <img 
                    className='img-fluid'
                    src='/img/seal-assembly-logo.jpg' style={{float: 'right', height:175, padding:5}} />                
              </div>
              <div className='col-md-8' style={{ height:'100vh', paddingRight: 0 }}>
                <div style={{ height: '100%', overflowY:'scroll', padding: 30, textAlign:'justify' }} >
                  <div id='about'>
                    <AboutSection />
                  </div>
                  <div id='meaning'>
                    <Meaning />
                  </div>
                  <div id='measure' >
                    <WhyMeasure />
                  </div>
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

class WhyMeasure extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{ textAlign:'center' }}>Why Measure Integration</h1>
        <p>
          <img
            src='/img/3109320685_36e803978d_z.jpg'
            style={{ width: 420, height: 320 }}
            className='img-responsive img-right' alt='Responsive image'
          />
        </p>
        <p>Itzigsohn & Giorguli-Saucedo (2005) show that if immigrants are afforded educational, occupational and political opportunities, social distance
        between them and mainstream society will be reduced. If they are economically marginalized and excluded, the effects of class and race will increase
        social distance as predicted by the segmented assimilation theory. Itzigsohn & Giorguli-Saucedo (2005) pointed out that there is a need for
        institutional mechanisms to further gender equality and social and racial justice.</p>
        <br />
        <p>Traditional and new immigrant gateways alike continue to struggle with the full integration of immigrants and with measuring their success toward
        this goal. Locally-driven integration policies involve different sectors in their implementation. These policies are critical to developing an
        inclusive and tolerant society, which enables immigrants to live in harmony. However, policies on the books may or may not mirror realities/outcomes
        on the ground. This is why monitoring and evaluation become critical to assess the degree to which policies are achieving their intended outcomes. </p><br />
        <p>There is a need to objectively benchmark, measure, and monitor immigrant integration. Because of decentralization of integration efforts, there is
        currently no objective benchmark that tells us how immigrants are faring in different communities, where gaps are; how we can measure progress/success
        toward achieving integration goals, how to compare different New York State communities on the integration spectrum. There is a need to benchmark,
        monitor and measure immigrant socio-economic and political/legal integration in communities to account for differences over time, between states,
        between communities and among/within groups. It is also critical to identify best practices for integrating immigrants. </p><br />
        <p /><br />
      </div>
    )
  }
}

class Meaning extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{ textAlign:'center' }}>The Meaning and Complexity of Integration</h1>
        <p>
         <img
            src='/img/14577783439_0fc897c193_z.jpg'
            style={{ width: 420, height: 260 }}
            className='img-responsive img-right' alt='Responsive image'
          />
        </p>
        <p>There is no doubt that fourth wave immigrants to the US have different characteristics, backgrounds, and settlement patterns from their predecessors.  For the most
        part, today’s immigrants are people of color from Latin America, Asia and the Caribbean. They are diverse in their socio economic background and they settle in
        traditional as well as new immigrant gateways. Additionally, one third of immigrants are undocumented. This raises the concern that they may have a harder time
        integrating into US societies and their integration may take longer than their predecessors (Jimenez, 2011). </p><br />
        <p>The term integration conjures up images of the outdated melting pot imageries where immigrants are expected to give up their cultural features and “melt” into a
        fixed mainstream culture. Yet, it also conveys the sense of anti-segregation and ending a historical phenomenon where people of color not just immigrants become part
        of the fabric of mainstream society. Castles (1998) differentiates between an assimilationist approach where a one-sided process of the immigrant giving up their
        distinctive cultural features for those of the host society’s, to integration as a two way process engaging both hosts and new comers, where adaptation occurs on
        both sides, and where there are mutual accommodations of each other.</p><br />
        <p>Alba & Nee (2003) defined integration also as a two way process where both the migrant and the host society adapt to each other. Integration, according to Alba and
        Nee, takes place when both native and immigrant cease to see each other and themselves in different ethno-racial and national terms, and when these difference have
        little or no effect on the opportunities available to the migrant.  Such definition, however, masks the fact that ethno racial differences have and will always have
        an effect on native-born, as well as foreign-born populations. It overlooks the fact that generations of Native-born residents still see themselves and others in
        ethno racial terms, and opportunities for people of color are still affected by race and ethnicity forces in the U.S. today.</p><br />
        <p>Jimenez (2011) defines integration in terms of outcomes of interaction between the newcomers and the society that hosts them. He alludes to three outcomes;
        socio- economic attainment, political involvement and social interaction, underscores the intersectionality of these dimensions and emphasizes that “change” must
        take place on both ends in order for integration to be fully achieved. Jimenez also emphasizes the fact that integration takes time and that it is a fu8nction of
        the unique resources, characteristics, class and race structures of the migrant as well as the communities in which he/she resides (Jimenez, 2011). Immigrant
        integration therefore refers to the degree of participation of foreign- born individuals in the major institutions of society, and the ability of these institutions
        to respond to the needs of foreign-born residents.</p>
        <p>
         <img
            src='/img/14761932405_6b07344911_z.jpg'
            style={{ width: 420, height: 260 }}
            className='img-responsive img-left' alt='Responsive image'
          />
        </p>
        <p>Hence, the meaning of the term integration in immigrant receiving nations is shaped by different and changing political ideologies, norms, and values, (Carrera, 2008).
        These are the same differences that shape the debates on immigration in general. On one side of the spectrum, the role of public policy is seen as having a regulatory
        function that controls the borders and adopts a criminal justice, safety and security approaches to immigration management. On the other side of the spectrum, the
        values of freedom, equality, justice, dignity and non-discrimination permeate discussions of integration. Often times, approaches to integration combine elements of
        opposing and contradictory views and ideologies (Carrera, 2008). Integration policies often tend to advance different goals including: achieving social cohesion and
        inoculating against exclusions; coordinating among different communities; advancing economic development objectives; attaining community safety; fulfilling homeland
        security objectives by preventing radicalization and social isolation; and protecting national sovereignty objectives by avoiding the creation of separate pockets.</p><br />
        <p>Immigrant integration is a complex, multidimensional process. Traditional and new immigrant gateways alike continue to struggle with the full integration of
        immigrants and with measuring their success toward this goal. Locally-driven integration policies and practices involve different sectors of society in their
        implementation. These policies and practices are critical to developing an inclusive and tolerant society, which enables immigrants to live in harmony, avoid
        discrimination, social exclusion, racism and xenophobia.</p><br />
        <p>we have adopted the pragmatic definition of immigrant integration to mean a two way process that reaches its ultimate goals when a foreign-born resident’s
        socioeconomic attainment, political involvement and social interactions become close to/equal to his/her White Non-Hispanic native-born counterpart. White,
        non-Hispanic Native-born Americans enjoy the highest outcomes along those indicators, and whose ethno racial identities do not block opportunities, sense of
        belonging and wellbeing. </p><br />
        <p>Immigrant Integration is the participation of foreign-born individuals in the major institutions of society and the ability of these institutions to
        respond to the needs of the foreign-born residents. Entzinger & Biezeveld (2003) pointed out that there are two dimensions of integration that correlate and
        intersect with each other; structural defined as the participation of individuals in the major institutions of society including labor, education, healthcare,
        etc. and cultural defined as the value orientation and identity formation. Understanding the interrelationship between these two dimensions illuminate the
        integration puzzle and help develop effective policies (Entzinger & Biezeveld, 2003). Heckmann et al. (2010), categorized integration into 4 dimensions;
        structural, cultural, interactive, volunteering and identification.   These four dimensions encompass labor market participation, education, vocational
        training, housing situation, citizenship, access to health system, language competence, values and norms, religion; friendships, marriages, partnerships,
        membership in organizations; volunteering, transnational networks; and subjective feelings of belonging. </p><br />
        <p>The European Union’s directives emphasized that responsibilities of the host society include holistic incorporation of the migrant into the labor market;
        access to language services and education; access to social and health services;  acceptable living arrangements; mechanisms for interaction between migrants
        and native population through intercultural dialogues; housing policies that facilitate close interactions; provision of pre departure language programs,
        rights to religious and cultural diversity; participation in political life unless they contradict with laws and rights of EU; and the monitoring and evaluation
        of progress toward these goals.  On the other hand, responsibilities of the migrant include learning the language; participation in integration programs;
        respect for fundamental values and norms that ensure separation of church and state; gender equality; freedom of speech and religion; civic engagement and
        knowledge of history and culture of receiving society. </p><br />
        <p>In the European Union, the concept of integration has significantly evolved from 1999 to 2008. The evolution of EU frameworks, regulations and policies
        show a transition from using a migration management deficit-based, to an asset-based approach that recognizes the need for investing in immigrants, and for
        aligning the needs and priorities of the immigrant with those of the host society. The evolution reflects a greater conscious effort to balance application
        of the principles of justice, non-discrimination and freedom, with the need to guard against a perceived threat of the dissolution of the dominant national
        identity. This heightened sense of insecurity about preserving a shared national identity and culture is clearly reflected in the character of the
        regulations.</p><br />
      </div>
    )
  }
}

class AboutSection extends React.Component {
  render () {
    return (
      <div >
        <h1 style={{ textAlign:'center' }}>About The Immigration Integration Index</h1>
            It is a tale of two worlds. It is a world where immigrants are welcomed with open arms to the land of opportunity, and acknowledged for being engines of economic
                development and growth to economically stagnant communities. It is a world where immigrants are vilified and condemned for usurping opportunities from natives, and
                described as agents of crime and de-stabilization. These two worlds accurately capture the American experience.
        <br />
        <p><img src='/img/3109323037_1324c68d5c_z.jpg' style={{ width: 420, height: 260 }} className='img-responsive img-right' alt='Responsive image' />
        </p>
        
        <p>In this work, we ask very familiar questions that so many before us grappled with. Is the American dream still alive for immigrants who come to our shores? Under
                what circumstances does the impact of the outsider status become negligible? To what extent can an immigrant enjoy equal access to economic opportunities that her/his
                native counterpart enjoy? When, where and how do the effects of race, ethnicity and gender intersect with nativity status in the lives of the foreign-born?
                How can public policy and community interventions mitigate the harmful impacts of those intersections? This report provides a quantitative assessment of
                these questions. It provides a numerical representation (Index) of disparities for each New York state community and a ranking of New York State regions based on
                their performance in economically integrating immigrant sin their communities.</p><br />
        <p>Immigration is one of the most divisive issues in public discourse in the U.S. Participants in this timeless discourse have grappled with numerous questions
                including what does it mean to become American? To what extent can you retain your belief systems, culture and lifestyle and still be considered American?  What
                are the obligations of new Americans, and what are the responsibilities of the adopted society? To what extent does an immigrant have to change and to what extent
                does the host society changes to accommodate new Americans? What can government do to fulfill its mission of serving all residents in the most cost-effective manner
                under budget constraints and competing priorities?</p><br />
       
         
        <p>The spectrum of the discourse embraced immigrants on one end, and vilified and marginalized them on the other. On one end of the spectrum, immigrants are often
                seen as a threat and an economic liability, and on the other end, they are embraced as assets and agents of economic development. The history of immigrants is fraught
                with tensions between balancing the rights of immigrants and a desire to protect the rights of the Native-born, and a constructed national identity. This identity is
                often threatened by perceived differences of new comers. Political ideologies (in favor of, or hostile to) immigrants have shaped public policy on the national, state
                and local levels.</p>
         <p>
         <img
            src='/img/3110152392_cd8bc646aa_z.jpg'
            style={{ width: 420, height: 260 }}
            className='img-responsive img-left' alt='Responsive image'
          />
        </p>
        <p>In the United States, there were two dominant policy approaches to immigrant integration; (a) Pre-1920 approach characterized by forcible integration where migrants
                were pressured to become Americans, and were expected to relinquish old practices and beliefs through participation in programs and training; and (b) a laissez faire
                approach on the part of the federal government, characterized by absence of interventions that would enable (or constrict) integration at the local level
                (Jimenez, 2011). Aside from refugees, for whom federal aid packages are made available; including job placement, training, language acquisition, housing, medical care,
                immigrants are left primarily on their own. As a “nation of immigrants”, integration is seen as a normal process that is inevitable. There is a dominant belief that as
                their predecessors have done, each wave of immigrants and their children will ultimately gain their footing in American society. Relying on a strong public education
                system and a strong labor market, immigrants will be integrated socially, economically and politically. With those two institutions showing signs of exhaustion lately,
                will the laissez faire approach work for today’s immigrants as it may have worked for their predecessors? (Jimenez, 2011). The laissez-faire federal policy environment
                forced states and local communities to devise their own approaches to integrate new comers in their midst. Integration policies are diverse since they were shaped by
                local community characteristics, structures, norms and ideologies.</p><br />
      </div>
    )
  }
}
