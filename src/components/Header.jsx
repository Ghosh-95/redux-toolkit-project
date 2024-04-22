import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
    const cartItem = useSelector(state => state.cart.cartItems);

    return (
        <header>
            <nav>
                <ul>
                    <Link to={'/'}>Products</Link>
                    <Link to={'/cart'}>Cart ({cartItem.length})</Link>
                </ul>
            </nav>
        </header>
    )
}