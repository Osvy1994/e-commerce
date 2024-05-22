import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { IconX } from '@tabler/icons-react'

function CartWithItems() {
  const {
    cart: cartItem,
    removeFromCart,
    removeQuantity,
    addToCart,
    clearCart,
  } = useCart()

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const calcPrice = (price, quantity) => {
    return price * quantity
  }

  return (
    <>
      <div className='full-cart-div'>
        <div className='full-cart'>
          {cartItem.map((item, id) => (
            <div key={id} className='cart-item'>
              <div className='cart-img'>
                <img src={item.img} alt='product' />
              </div>
              <div className='cart-middle'>
                <p className='cart-name'>{item.description}</p>
                <div className='cart-btns'>
                  <button onClick={() => removeQuantity(item)}>-</button>
                  <p className='quantity'>{item.quantity}</p>
                  <button onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
              <div className='cart-right'>
                <p className='cart-price'>
                  {`$ ${calcPrice(item.price, item.quantity)}`}
                </p>
                <IconX
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeFromCart(item)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='clear-cart-container'>
        <button className='clear-cart' onClick={clearCart}>Clear Cart</button>
      </div>

      <div className='subtotal-div'>
        <div className='sub-right'>
          <p>Subtotal</p>
          <p className='total-price'>{totalPrice + '.00$'}</p>
        </div>
        <div className='sub-left'>
          <Link>Go to Checkout</Link>
        </div>
      </div>
    </>
  )
}

export default CartWithItems
