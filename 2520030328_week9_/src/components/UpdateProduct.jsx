import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateProduct, getProductById, getAllProducts } from "../services/ProductService";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from route params
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch product details when component mounts
  useEffect(() => {
    getProductById(id)
      .then((response) => {
        if (response.data) {
          setProduct({
            name: response.data.name || "",
            description: response.data.description || "",
            price: response.data.price ?? "",
            quantity: response.data.quantity ?? "",
          });
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback to getAllProducts if needed
        getAllProducts()
          .then((response) => {
            const productData = response.data.find((p) => p.id.toString() === id);
            if (productData) {
              setProduct({
                name: productData.name || "",
                description: productData.description || "",
                price: productData.price ?? "",
                quantity: productData.quantity ?? "",
              });
            }
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching product:", err);
            setLoading(false);
          });
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      alert("Product updated successfully!");
      navigate("/"); // Redirect to product list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}><p>Loading product details...</p></div>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "left" }}>
      <h2>Update Product (ID: {id})</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Name:</label>
          <input
            type="text"
            name="name"
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
            value={product.quantity}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "8px 16px" }}>
            Update Product
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

export default UpdateProduct;