import '../styles/Feed.css';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Feed.css";


function Feed() {
  const location = useLocation();

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

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/items")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then((data) => {
        const combined = [...initialItems];

        data.forEach((item) => {
          const exists = combined.some((i) => i.id === item.id);
          if (!exists) combined.push(item);
        });
  
        if (location.state?.newItem) {
          const exists = combined.some((i) => i.id === location.state.newItem.id);
          if (!exists) {
            combined.unshift(location.state.newItem); 
          }
        }
  
        setItems(combined);
        setError("");
      })
      .catch((err) => {
        console.warn("Fetch failed, using initial items", err);
        setError("Failed to load latest items, showing default inventory.");
        setItems(initialItems);
      });
  }, [location.key]);
  return (
    <div className="feed-page">
      <nav className="feed-navbar">
        <div className="nav-title">My Inventory</div>
        <div className="nav-links">
          <Link to="/create" className="nav-link">+ Add New Item</Link>
        </div>
      </nav>

      <header className="feed-header">
        <h1>Inventory</h1>
        <p>All your dreamy items, organized and on display ✨</p>
        {error && <p className="error-message">{error}</p>}
      </header>

      <main className="feed-main">
        {items.length === 0 ? (
          <p>No items to display.</p>
        ) : (
          items.map((item) => (
            <Link to={`/items/${item.id}`} key={item.id} className="feed-card-link">
              <div className="feed-card">
                <h2>{item.name}</h2>
                <p>
                  {item.description && item.description.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </p>

                <p>Quantity: {item.quantity}</p>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}

export default Feed;

