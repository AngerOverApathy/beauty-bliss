import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { ShopContext, IShopContext } from '../context/shop-context';
import { useContext } from 'react';

export const Navbar = () => {
    const { availableMoney } = useContext<IShopContext>(ShopContext)
    return (
        <div className="navbar">
            <div className="navbarTitle">
                <h1>Vsza Tech</h1>
            </div>

            <div className="navbar-links">
                <Link to='/'>Shop</Link>
                <Link to='/purchased-items'>Purchases</Link>
                <Link to='/checkout'> 
                    <FontAwesomeIcon icon={faShoppingCart} /></Link>
                <span>${availableMoney.toFixed(2)}</span>
            </div>
        </div>
    )
}