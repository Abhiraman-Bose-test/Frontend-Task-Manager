import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import type { LoginRequest } from "../types";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const response = await login(formData);

      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", String(response.userId));
      localStorage.setItem("email", response.email);

      if (response.name) {
        localStorage.setItem("name", response.name);
      }

      navigate("/projects");
    } catch {
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "12px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "12px" }}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        New user? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;