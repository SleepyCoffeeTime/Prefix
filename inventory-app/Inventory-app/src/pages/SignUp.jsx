import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import "../styles/SignUp.css";


function SignUp() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext); 

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Sign-up failed");
      } else {
        const data = await res.json();
        
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token); 
        navigate("/feed"); 
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div>
      <h2>Create an Account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")}>Log In</button>
      </p>
    </div>
  );
}

export default SignUp;
