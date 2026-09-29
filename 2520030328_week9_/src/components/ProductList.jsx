import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../services/ProductService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () => {
    getAllProducts()
      .then(response => {
        setProducts(response.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError("Failed to load products from server.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(err => {
          console.error("Error deleting product:", err);
          alert("Failed to delete product");
        });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management System</h2>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/add">
          <button style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px" }}>
            + Add New Product
          </button>
        </Link>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && products.length === 0 && <p>No products found.</p>}

      {!loading && products.length > 0 && (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", margin: "0 auto", minWidth: "600px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2", color: "#333" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Link to={`/update/${product.id}`} style={{ marginRight: "8px" }}>
                    <button type="button">Edit</button>
                  </Link>
                  <Link to={`/delete/${product.id}`} style={{ marginRight: "8px" }}>
                    <button type="button">Delete Page</button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                  >
                    Quick Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;