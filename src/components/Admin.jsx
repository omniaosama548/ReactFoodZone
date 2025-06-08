import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 useEffect(() => {
  const savedProducts = localStorage.getItem('products');
  if (savedProducts) {
    setProducts(JSON.parse(savedProducts));
  } else {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      })
      .catch(err => console.error("Failed to fetch products:", err));
  }
}, []);

  useEffect(() => {
    fetch("/catogery.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...formData, id: editId } : p))
      );
      setEditId(null);
    } else {
      setProducts((prev) => [...prev, { ...formData, id: uuidv4() }]);
    }
    setFormData({ name: '', category: '', price: '', image: '' });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4">Admin Dashboard</h3>

      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" type="submit">
            {editId ? 'Update' : 'Add'}
          </button>
        </div>
      </form>

      <div className="row g-3">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: 200, objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Category: {product.category}</p>
                <p className="card-text">Price: ${product.price}</p>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

