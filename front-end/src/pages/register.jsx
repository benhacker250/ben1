import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    setMessage("");
    setError("");

    if (!username || !password || !confirmPassword) {
      return setError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const response = await axios.post("http://localhost:4000/api/auth/register", {
        Username: username,
        Password: password,
      });

      if (response.data?.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Registration successful. Please log in.");
      }

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error("Registration failed:", err);
      const apiMessage = err.response?.data?.message || "Unable to register. Please try again.";
      setError(apiMessage);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: 420 }}>
        <h2 className="mb-4">Register</h2>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3" onClick={register}>
          Register
        </button>

        <div className="text-center">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
