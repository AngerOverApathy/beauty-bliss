import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" />
          <Route path="/auth" />
          <Route path="/checkout" />
          <Route path="/purchased-items" />
        </Routes>
      </Router>
    </>
  )
}

export default App
