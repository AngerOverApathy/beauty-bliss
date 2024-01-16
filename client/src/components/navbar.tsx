import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { ShopContext, IShopContext } from '../context/shop-context';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
    const { availableMoney, isAuthenticated } = useContext<IShopContext>(ShopContext)
    const [_, setCookies] = useCookies(['access_token']) // eslint-disable-line @typescript-eslint/no-unused-vars
    const logout = () => {
        localStorage.clear()
        setCookies("access_token", null)
    }

    return (
        <div className="navbar">
            <div className="navbarTitle">
                <h1>Vsza Tech</h1>
            </div>
            <div className="navbar-links">
            {isAuthenticated && (
                <>
                <Link to='/'>Shop</Link>
                <Link to='/purchased-items'>Purchases</Link>
                <Link to='/checkout'> 
                    <FontAwesomeIcon icon={faShoppingCart} /></Link>
                <Link to='/auth' onClick={logout}>Logout</Link>
                <span>${availableMoney.toFixed(2)}</span>
                </>
                )}
            </div>
        </div>
    )
}