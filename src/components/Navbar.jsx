import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CartWithItems from './CartWithItems'
import EmptyCart from './EmptyCart'
import { IconMenu2, IconShoppingCart, IconX } from '@tabler/icons-react'
import { useCart } from '../hooks/useCart'

function Navbar() {
  const [sticky, setSticky] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [cart, setCart] = useState(false)

  const { cart: cartItem } = useCart()

  const totalItems = cartItem.reduce((acc, item) => acc + item.quantity, 0)

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  const openCart = () => {
    setCart(!cart)
  }

  window.addEventListener('scroll', handleScroll)

  return (
    <>
      <div
        className={`mobile-nav-full ${mobileNav ? 'open-flex' : 'closed-flex'}`}
      >
        <IconX onClick={() => setMobileNav(!mobileNav)} className='x-mobile' />
        <div className='mobile-links'>
          <Link onClick={() => setMobileNav(!mobileNav)} to='/products'>
            products
          </Link>
        </div>
      </div>

      {/* overlay */}
      <div
        onClick={openCart}
        className={`page-overlay ${cart ? 'open-flex' : 'closed-flex'}`}
      ></div>

      {/* cart */}
      <div className={`cart-div ${cart ? 'open-cart' : 'closed-cart'}`}>
        <div className='cart-title-btn'>
          <h2 className='cart-full-h2'>
            Your Shopping Cart ({totalItems})
          </h2>
          <IconX onClick={openCart} />
        </div>

        <div className='cart-body'>
          {cartItem.length < 1 ? (
            <EmptyCart openCart={openCart} />
          ) : (
            <CartWithItems />
          )}
        </div>
      </div>

      <nav className='navbar'>
        <div className='container'>
          <div className={`nav-container ${sticky ? 'cont-sticky' : ''}`}>
            <Link to='/'>
              <h1 className='logo'>Simple E-Commerce</h1>
            </Link>
            <div className='nav-links'>
              <Link onClick={() => window.scrollTo(0, 0)} to='/products'>
                products
              </Link>
              <i
                data-array-length={totalItems}
                onClick={openCart}
                className={`${
                  cartItem.length < 1 ? 'cart-icon' : 'cart-icon with-items'
                }`}
              >
                <IconShoppingCart />
              </i>
            </div>
            <div className='hamburger-menu'>
              <i
                data-array-length={totalItems}
                onClick={openCart}
                className={`hamburger-cart ${
                  cartItem.length < 1 ? 'cart-icon' : 'cart-icon with-items'
                }`}
              >
                <IconShoppingCart />
              </i>
              <i
                onClick={() => setMobileNav(!mobileNav)}
                className='hamburger-hamb'
              >
                <IconMenu2 />
              </i>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
