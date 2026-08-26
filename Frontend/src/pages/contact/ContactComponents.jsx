import React from 'react'
import ContactHero from './ContactHero'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'

const ContactComponents = () => {
  return (
<div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between">
      
      {/* 1. Light Hero Banner Component */}
      <ContactHero />

      {/* 2. Main Body Section */}
      <main className="py-16 px-6 max-w-6xl mx-auto w-full flex-grow">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          
          {/* Info Component */}
          <div className="md:col-span-5">
            <ContactInfo />
          </div>

          {/* Form Component */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>

        </div>
      </main>

    </div>
  )
}

export default ContactComponents