
import {useCart} from '../context/CartContext'
import { toast } from 'react-toastify';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ProductCard({ product }) {
const { addToCart } = useCart();
  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text mb-1"><strong>Category:</strong> {product.category}</p>
        <p className="card-text mb-2"><strong>Price:</strong> ${product.price}</p>
        <button
          className="btn btn-outline-primary mt-auto w-100"
          onClick={handleAdd}
        >
          <FaShoppingCart />
        </button>
      </div>
    </div>
  );
}
