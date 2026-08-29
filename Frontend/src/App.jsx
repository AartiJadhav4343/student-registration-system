import { useState } from "react";
import "./App.css";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/${isRegistering ? "register" : "login"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isRegistering ? "Registration successful! You can now log in." : "Login successful!");
        if (isRegistering) {
          setIsRegistering(false);
        }
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server is not connected");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isRegistering ? "Create Account" : "Student Login"}</h1>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">{isRegistering ? "Register" : "Login"}</button>
        </form>

        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "Create a new account"}
        </button>
      </div>
    </div>
  );
}

export default App;