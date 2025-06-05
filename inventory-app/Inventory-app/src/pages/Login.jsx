import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "../styles/Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Login failed");
      } else {
        const data = await res.json();
        setUser(data.user);
        navigate("/feed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const handleBrowseClick = () => {
    navigate("/feed");
  };

  return (
    <div>
      <h2>Log In</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <button onClick={() => navigate("/signup")}>Sign Up</button>
      </p>

      <button
        onClick={handleBrowseClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#db7093", 
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Browse Inventory
      </button>
    </div>
  );
}

export default Login;
