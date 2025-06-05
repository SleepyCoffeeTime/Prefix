import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateItem.css";

function CreateItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create item");
        return res.json(); 
      })
      .then((createdItem) => {
      
        navigate("/feed", { state: { newItem: createdItem } });
      })
      .catch(() => {
        setError("Failed to create item. Please try again.");
      });
  };

  return (
    <div className="create-item-page">
      <h1>Add New Item</h1>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="create-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <button type="submit" className="submit-button">Create Item</button>
      </form>
    </div>
  );
}

export default CreateItem;

