import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { totalQuantity } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2 shadow-sm">
      <Link className="navbar-brand fw-bold text-warning" to="/">
        FoodZone
      </Link>

      {/* زرار التوجل بيظهر في الشاشات الصغيرة */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* الكولابس الخاصة بالقائمة */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav align-items-center gap-3">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin">Admin</Link>
          </li>
          <li className="nav-item position-relative">
            <Link className="nav-link text-white" to="/cart">
              <FaShoppingCart size={24} color="white" />
            </Link>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: '0.6rem' }}
            >
              {totalQuantity}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



