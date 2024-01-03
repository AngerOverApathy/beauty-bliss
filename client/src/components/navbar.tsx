import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbarTitle">
                <h1>Vsza Tech</h1>
            </div>

            <div className="navbar-links">
                <Link to='/'>Shop</Link>
            </div>
        </div>
    )
}