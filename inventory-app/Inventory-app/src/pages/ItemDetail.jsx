import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/items/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not in database");
        return res.json();
      })
      .then((data) => setItem(data))
      .catch(() => {
        const fallbackItem = initialItems.find((i) => i.id === parseInt(id));
        if (fallbackItem) {
          setItem(fallbackItem);
        } else {
          setError("Could not load item details.");
        }
      });
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`http://localhost:8080/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete item");
        return res.json();
      })
      .then(() => {
        navigate("/feed"); 
      })
      .catch(() => alert("Error deleting item."));
  };

  if (error) return <div>{error}</div>;
  if (!item) return <div>Loading...</div>;

  return (
    <div className="item-detail-page">
      <button onClick={() => navigate("/feed")} className="back-button">
        ← Back to Inventory
      </button>

      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>

      <Link to={`/items/${item.id}/edit`} className="edit-link">
        ✏️ Edit Item
      </Link>

      <button
        onClick={handleDelete}
        style={{ color: "red", marginLeft: "1rem", cursor: "pointer" }}
      >
        🗑️ Delete Item
      </button>
    </div>
  );
}

export default ItemDetail;
