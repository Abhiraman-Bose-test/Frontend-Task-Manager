import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import type { SignupRequest } from "../types";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupRequest>({
    name: "",
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
      await signup(formData);
      navigate("/login");
    } catch {
      setError("Signup failed. Please check your details.");
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "60px auto" }}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "12px" }}
        />

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

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;