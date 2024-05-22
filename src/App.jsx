import Navbar from './components/Navbar'

import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductsPage } from './pages/ProductsPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </div>
  )
}

export default App
