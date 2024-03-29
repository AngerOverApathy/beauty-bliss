import { useContext } from 'react';
import { IProduct } from '../../models/interfaces'
import { IShopContext, ShopContext } from '../../context/shop-context';
import './style.css'

interface Props {
        product: IProduct;
    }

export const Product = (props: Props) => {
    const { _id, productName, description, price, stockQuantity, imageURL } = 
        props.product;

    const {addToCart, getCartItemCount} = useContext<IShopContext>(ShopContext)

    const count = getCartItemCount(_id)
    console.log(count)
    
    return (
        <div className='product'>
            <img src={imageURL} />
            <div className='description'>
                <h3>{productName}</h3>
                <p>{description}</p>
                <p>${price}</p>
            </div>

            <button className="addToCartBttn" onClick={() => addToCart(_id)}>
                Add to Cart {count > 0 && <>({count})</>}
            </button>

            <div className='stock-quantity'>
                {stockQuantity === 0 && <h1>Out of Stock</h1>}
            </div>
        </div>
    );
}