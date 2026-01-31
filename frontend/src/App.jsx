import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth.jsx'
import ProtectedWrapper from './pages/ProtectedWrapper.jsx'
import Explore from './pages/Explore.jsx'

const App = () => {
  return (
    <div className='app min-h-screen max-w-screen bg-zinc-900'>
      <Routes>
        <Route path='/' element={<ProtectedWrapper><Explore /></ProtectedWrapper>} />
        <Route path='/auth/*' element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App