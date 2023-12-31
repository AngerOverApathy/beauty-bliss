import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar' 
import { AuthPage } from './pages/auth'
import { PurchasedItemsPage } from './pages/purchased-items'
import { ShopPage } from './pages/shop'
import { CheckoutPage } from './pages/checkout'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<ShopPage/>}/>
          <Route path="/auth" element={<AuthPage />}/>
          <Route path="/checkout" element={<CheckoutPage />}/>
          <Route path="/purchased-items" element={<PurchasedItemsPage />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
