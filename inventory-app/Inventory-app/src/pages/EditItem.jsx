import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditItem.css";

const initialItems = [
  {
    id: 1,
    name: "Laptop",
    description: "A sleek 15-inch laptop with 16GB of RAM, SSD storage, and long battery life for everyday use.",
    quantity: 5,
  },
  {
    id: 2,
    name: "Monitor",
    description: "A 27-inch 4K UHD monitor with ultra-thin bezels, vivid color accuracy, and adjustable stand.",
    quantity: 10,
  },
  {
    id: 3,
    name: "Keyboard",
    description: "Mechanical RGB backlit keyboard with blue switches, ergonomic wrist support, and USB passthrough.",
    quantity: 7,
  },
  {
    id: 4,
    name: "Mouse",
    description: "Wireless ergonomic mouse with programmable buttons, fast response time, and long battery life.",
    quantity: 12,
  },
  {
    id: 5,
    name: "Webcam",
    description: "High-quality 1080p HD webcam with built-in microphone, auto light correction, and plug & play setup.",
    quantity: 8,
  },
];

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Item not found");
        return res.json();
      })
      .then((data) => {
        setFormData({
          name: data.name,
          description: data.description,
          quantity: data.quantity,
        });
      })
      .catch(() => {
        const fallbackItem = initialItems.find((item) => item.id === parseInt(id));
        if (fallbackItem) {
          setFormData({
            name: fallbackItem.name,
            description: fallbackItem.description,
            quantity: fallbackItem.quantity,
          });
        } else {
          setError("Could not load item to edit");
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => navigate(`/items/${id}`))
      .catch(() => setError("Failed to update item."));
  };

  return (
    <div className="edit-item-page">
      <h1>Edit Item</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditItem;
