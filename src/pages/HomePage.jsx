import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  
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

  fetch('/catogery.json')
    .then(res => res.json())
    .then(data => setCategories(["All", ...data]))
    .catch(err => console.error("Failed to fetch categories:", err));
}, []);



  const filteredProducts = products.filter((product) => {
    const matchCategory = categoryFilter === "All" || product.category === categoryFilter;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="form-control w-50"
        />

        <select
          className="form-select w-auto"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="row g-4">
        {currentProducts.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 flex-wrap gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

