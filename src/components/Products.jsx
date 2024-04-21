import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../slices/productSlice";

export default function Products() {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();

    return (
        <section className="products">
            <button onClick={() => dispatch(fetchProductsAsync())}>Fetch Products</button>
            <h1>Product List</h1>
            <article className="product-list">
                {products && products.map(product => <Card key={product.id} data={product} />)}
            </article>
        </section>
    );
};

function Card({ data: { thumbnail, description, title, price, rating } }) {
    return (
        <div className="card">
            <img src={thumbnail} alt={description} />
            <h2>{title}</h2>
            <p className="price">${price} | <span className="rating">{rating}</span></p>
            <p className="desc">{description.slice(0, 50)}</p>
            <button>Add to Cart</button>
        </div>
    )
}