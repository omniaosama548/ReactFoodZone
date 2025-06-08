
import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function CartPage() {
  const { cartItems, increase, decrease } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3>Your cart is empty </h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h3 className="mb-4">Shopping Cart </h3>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <div className="card p-3 d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-0">${item.price}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => decrease(item.id)}>
                  <FaMinus />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => increase(item.id)}>
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-end mt-4">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
      </div>
    </div>
  );
}
