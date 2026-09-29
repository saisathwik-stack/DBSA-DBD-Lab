import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addProduct } from '../services/ProductService';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product)
      .then(() => {
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product");
      });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "left" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Description:</label>
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Quantity:</label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "8px 16px" }}>
            Add Product
          </button>
          <Link to="/">
            <button type="button" style={{ padding: "8px 16px" }}>
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;