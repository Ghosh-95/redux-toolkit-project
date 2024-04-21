import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <Link to={'/'}>Products</Link>
                    <Link to={'/cart'}>Carts</Link>
                </ul>
            </nav>
        </header>
    )
}