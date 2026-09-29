import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../services/ProductService";

const DeleteProduct = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        if (res.data && res.data.name) {
          setProductName(res.data.name);
        }
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      navigate("/"); // Redirect to product list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", textAlign: "center" }}>
      <h2>Delete Product</h2>
      <p>Are you sure you want to delete this product?</p>
      {productName && (
        <p style={{ fontSize: "1.1em" }}>
          <strong>{productName}</strong> (ID: {id})
        </p>
      )}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "#dc3545", color: "white", padding: "8px 20px" }}
        >
          Yes, Delete
        </button>
        <button
          onClick={() => navigate("/")}
          style={{ padding: "8px 20px" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;