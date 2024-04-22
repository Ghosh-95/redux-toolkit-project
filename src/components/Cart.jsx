import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemAsync, fetchItemAsync, removeFromCart, updateItemAsync } from "../slices/cartSlice";

export default function Cart() {
    const cartItem = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchItemAsync());
    }, []);

    return (
        <section>
            <h1>Cart ({cartItem.length})</h1>

            <ul className="item-list">
                {cartItem && cartItem.map(item => <CartList key={item.id} data={item} />)}
            </ul>
        </section>
    )
};


function CartList({ data: { title, thumbnail, price, id, quantity } }) {
    const dispatch = useDispatch();
    const [itemQty, setItemQty] = useState(1);

    const handleQuantityChange = (e, id) => {
        setItemQty(+e.target.value);
        dispatch(updateItemAsync({ itemId: id, item: { quantity: +e.target.value } }))
    }

    return (
        <li>
            <img src={thumbnail} alt={title + ' image'} />
            <article>
                <label htmlFor={`item-quantity-${id}`}>Qty: </label>
                <select
                    name="quantity"
                    id={`item-quantity-${id}`}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e, id)}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                </select>
            </article>
            <p className="title">{title}</p>
            <p className="price">${(price * itemQty).toFixed(2)}</p>
            <button className="del-btn" onClick={() => {
                dispatch(deleteItemAsync(id));
                dispatch(removeFromCart(id));
            }}>Delete</button>
        </li>
    )
}