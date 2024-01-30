import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import Header from './Header'
import Footer from './Footer'
import Apply from './Apply'
import StudentApply from './StudentApply'
import ClientApply from './ClientApply'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/student" element={<StudentApply />} />
          <Route path="/apply/client" element={<ClientApply />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
