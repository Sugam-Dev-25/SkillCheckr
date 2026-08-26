import React from 'react'
import AboutHero from './AboutHero'
import AboutPurpose from './AboutPurpose'
import AboutValues from './AboutValues'
import CTASection from '../home/CTASection'
import AboutSugam from './AboutSugam'

const AboutComponents = () => {
  return (
    <div>
      <AboutHero/>
      <AboutPurpose/>
      <AboutSugam/>
      <AboutValues/>
      <CTASection/>
    </div>
  )
}

export default AboutComponents