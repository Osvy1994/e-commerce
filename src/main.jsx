import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { FiltersProvider } from './context/filtersContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FiltersProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FiltersProvider>
  </BrowserRouter>,
)
