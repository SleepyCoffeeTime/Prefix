import { useState } from "react";

function Login({ onLogin, switchToSignUp }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.message || "Login failed");
      } else {
        const data = await res.json();
        onLogin(data.user);
      }
    } catch (err) {
      setError("Network error");
    }
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
        <button onClick={switchToSignUp}>Sign Up</button>
      </p>
    </div>
  );
}

export default Login;
