import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <Header/>
      <div className="bg-amber-500">hello test</div>
      <Footer/>
    </div>
  )
}

export default App
