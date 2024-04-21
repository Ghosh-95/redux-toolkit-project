import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../slices/productSlice";
import { useEffect } from "react";
import { addItemAsync } from "../slices/cartSlice";

export default function Products() {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductsAsync());
    }, []);

    return (
        <section className="products">
            <h1>Product List</h1>
            <article className="product-list">
                {products && products.map(product => <Card key={product.id} data={product} />)}
            </article>
        </section>
    );
};

function Card({ data: { thumbnail, description, title, price, rating } }) {
    const dispatch = useDispatch();

    return (
        <div className="card">
            <img src={thumbnail} alt={description} />
            <h2>{title}</h2>
            <p className="price">${price} | <span className="rating">{rating}</span></p>
            <p className="desc">{description.slice(0, 50)}</p>
            <button onClick={() => dispatch(addItemAsync({ thumbnail, title, price, rating }))}>Add to Cart</button>
        </div>
    )
}