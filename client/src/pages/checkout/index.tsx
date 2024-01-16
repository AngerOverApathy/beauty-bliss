import { useGetProducts } from '../../hooks/useGetProducts'
import { useContext } from 'react'
import { IProduct } from '../../models/interfaces'
import { IShopContext, ShopContext } from '../../context/shop-context'
import { CartItem } from './cart-item'
import './style.css'

export const CheckoutPage = () => {
    const { getCartItemCount } = useContext<IShopContext>(ShopContext)
    const { products } = useGetProducts()
    return (
        <div className='cart'>
            <div>
                <h1>Checkout</h1>
            </div>

            <div className='cart'>
                {products.map((product: IProduct) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem product = { product } />
                    }
                })}
            </div>

            <div className='checkout'>
                <p>Subtotal: $</p>
                <button>Continue Shopping</button>
                <button>Checkout</button>
            </div>
        </div>
    )
}