import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export const useCart = () => {
  const { cart, setCart } = useContext(CartContext)

  const addToCart = product => {
    const newCart = structuredClone(cart)
    const findItemIndex = newCart.findIndex(item => item.id === product.id)
    if (findItemIndex >= 0) {
      newCart[findItemIndex].quantity += 1
      setCart(newCart)
    } else {
      setCart(prevCart => [...prevCart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = itemToDelete => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemToDelete.id))
  }

  const removeQuantity = itemToDelete => {
    setCart(prevCart =>
      prevCart.filter(item => {
        if (item.id === itemToDelete.id) {
          if (item.quantity > 1) {
            item.quantity -= 1
            return item
          }
        } else {
          return item
        }
      }),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return { cart, setCart, addToCart, clearCart, removeFromCart, removeQuantity }
}
