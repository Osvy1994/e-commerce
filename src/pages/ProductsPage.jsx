import '../components/ProductPage.css'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { items } from '../components/AllData'
import { useFilters } from '../hooks/useFilters'
import { useCart } from '../hooks/useCart'
import debounce from 'just-debounce-it'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function ProductsPage() {
  const { updateCategory, updateMaxPrice, updateSearch, filters } = useFilters()
  const { addToCart, cart, removeFromCart, removeQuantity } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const getButtonStyle = category => {
    return selectedCategory === category
      ? { backgroundColor: '#333', color: 'white' }
      : {}
  }

  const handleCategoryClick = category => {
    setSelectedCategory(category)
    updateCategory(category)
  }

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const filteredItems = items.filter(
    item =>
      (item.category === filters.category && item.price <= filters.maxPrice) ||
      (filters.category === 'all' && item.price <= filters.maxPrice),
  )

  const searchedItems = filteredItems.filter(item => {
    return item.description.toLowerCase().includes(filters.search.toLowerCase())
  })

  const handleSearch = debounce(e => {
    let searchValue = e.target.value
    updateSearch(searchValue)
  }, 500)

  return (
    <div className='products-section'>
      <div className='header'>
        <h1>Categories</h1>
        <div className='categories'>
          <button
            onClick={() => handleCategoryClick('all')}
            style={getButtonStyle('all')}
          >
            All
          </button>
          <button
            onClick={() => handleCategoryClick('furniture')}
            style={getButtonStyle('furniture')}
          >
            Furnitures
          </button>
          <button
            onClick={() => handleCategoryClick('electronic')}
            style={getButtonStyle('electronic')}
          >
            Electronics
          </button>
          <button
            onClick={() => handleCategoryClick('lamp')}
            style={getButtonStyle('lamp')}
          >
            Lamps
          </button>
          <button
            onClick={() => handleCategoryClick('kitchen')}
            style={getButtonStyle('kitchen')}
          >
            Kitchen
          </button>
          <button
            onClick={() => handleCategoryClick('chair')}
            style={getButtonStyle('chair')}
          >
            Chairs
          </button>
          <button
            onClick={() => handleCategoryClick('skin-care')}
            style={getButtonStyle('skin-care')}
          >
            Skin Care
          </button>
        </div>
        <div className='filters-container'>
          <div className='filters'>
            <label htmlFor='searchInput'>Search: </label>
            <input
              type='text'
              id='searchInput'
              placeholder='Search for products...'
              onChange={handleSearch}
              className='search-input'
            />
          </div>
          <div className='filters'>
            <label htmlFor='maxPrice'>Max Price: </label>
            <input
              type='range'
              min='50'
              max='1000'
              step={10}
              value={filters.maxPrice}
              onChange={e => updateMaxPrice(e.target.value)}
              name='maxPrice'
            />
            <p>${filters.maxPrice}</p>
          </div>
        </div>
      </div>
      <div className='products-container'>
        {searchedItems.map(data => {
          const isProductInCart = checkProductInCart(data)

          return (
            <div key={data.id} className='product'>
              <div className='product-img'>
                <img src={data.img} alt={data.description} />
              </div>
              <div className='product-text'>
                <h2>{data.description}</h2>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <button onClick={() => removeQuantity(data)}>-</button>
                  <p style={{ fontSize: '2.4rem' }}>
                    {cart.find(item => item.id === data.id)?.quantity || 0}
                  </p>
                  <button onClick={() => addToCart(data)}>+</button>
                </div>
                <p>{data.text}</p>
                <p className='price'>${data.price}</p>
                <button
                  onClick={() =>
                    isProductInCart ? removeFromCart(data) : addToCart(data)
                  }
                >
                  {isProductInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <Newsletter />
      <Footer />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}
