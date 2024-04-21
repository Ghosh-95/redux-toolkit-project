import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchItemAsync } from "../slices/cartSlice";

export default function Cart() {
    const cartItem = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchItemAsync());
    })

    return (
        <section>
            <h1>Cart</h1>

            <ul className="item-list">
                {cartItem && cartItem.map(item => <CartList key={item.id} data={item} />)}
            </ul>
        </section>
    )
};


function CartList({ data: { title, thumbnail, price } }) {
    return (
        <li>
            <img src={thumbnail} alt={title + ' image'} />
            <p className="title">{title}</p>
            <p className="price">${price}</p>
            <button className="del-btn">Delete</button>
        </li>
    )
}