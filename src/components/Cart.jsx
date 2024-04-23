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
            <p className="total-price">Total: ${cartItem.reduce((acc, item) => item.price * item.quantity + acc, 0)}</p>
        </section>
    )
};


function CartList({ data: { title, thumbnail, price, id, quantity } }) {
    const dispatch = useDispatch();
    const [itemQty, setItemQty] = useState(1);

    const handleQuantityChange = (e, id) => {
        setItemQty(+e.target.value);
        dispatch(updateItemAsync({ itemId: id, item: { quantity: itemQty } }))
    }

    const incrementQty = () => {
        itemQty <= 9 && setItemQty(itemQty + 1);
        dispatch(updateItemAsync({ itemId: id, item: { quantity: itemQty } }))
    }
    const decrementQty = () => {
        itemQty > 1 && setItemQty(itemQty - 1);
        dispatch(updateItemAsync({ itemId: id, item: { quantity: itemQty } }))
    }

    return (
        <li>
            <img src={thumbnail} alt={title + ' image'} />
            <article>
                <button className="qty-btn" onClick={decrementQty}>-</button>
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
                <button className="qty-btn" onClick={incrementQty}>+</button>
            </article>
            <p>{quantity}</p>
            <p className="title">{title}</p>
            <p className="price">${(price * quantity).toFixed(2)}</p>
            <button className="del-btn" onClick={() => {
                dispatch(deleteItemAsync(id));
                dispatch(removeFromCart(id));
            }}>Delete</button>
        </li>
    )
}