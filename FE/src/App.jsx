import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'

function App() {

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Header/>
      {/* <div className="bg-amber-500">hello test</div> */}
      <Hero/>
      <Footer/>
    </div>
  )
}

export default App
