import '../components/ProductPage.css'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { items } from '../components/AllData'
import { useFilters } from '../hooks/useFilters'
import { useCart } from '../hooks/useCart'

export function ProductsPage() {
  const { updateCategory, updateMaxPrice, filters } = useFilters()
  const { addToCart, cart, removeFromCart, removeQuantity } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  const filteredItems = items.filter(
    item =>
      (item.category === filters.category && item.price <= filters.maxPrice) ||
      (filters.category === 'all' && item.price <= filters.maxPrice),
  )

  return (
    <div className='products-section'>
      <div className='header'>
        <h1>Categories</h1>
        <div className='categories'>
          <button onClick={() => updateCategory('all')}>All</button>
          <button onClick={() => updateCategory('furniture')}>
            Furnitures
          </button>
          <button onClick={() => updateCategory('electronic')}>
            Electronics
          </button>
          <button onClick={() => updateCategory('lamp')}>Lamps</button>
          <button onClick={() => updateCategory('kitchen')}>Kitchen</button>
          <button onClick={() => updateCategory('chair')}>Chairs</button>
          <button onClick={() => updateCategory('skin-care')}>Skin Care</button>
        </div>
        <div className='max-price-container'>
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
      <div className='products-container'>
        {filteredItems.map(data => {
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
                    gap: 4,
                  }}
                >
                  <button onClick={() => removeQuantity(data)}>-</button>
                  <p>{ data.quantity }</p>
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
    </div>
  )
}
