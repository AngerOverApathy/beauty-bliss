import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar' 
import { AuthPage } from './pages/auth'
import { PurchasedItemsPage } from './pages/purchased-items'
import { ShopPage } from './pages/shop'
import { CheckoutPage } from './pages/checkout'
import './App.css'
import { ShopContextProvider } from './context/shop-context'

function App() {

  return (
    <div className='App'>
      <Router>
        <ShopContextProvider>
        <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage/>}/>
            <Route path="/auth" element={<AuthPage />}/>
            <Route path="/checkout" element={<CheckoutPage />}/>
            <Route path="/purchased-items" element={<PurchasedItemsPage />}/>
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  )
}

export default App
