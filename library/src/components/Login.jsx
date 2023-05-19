import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");

  async function handleLogin() {
    if (username !== "" && password !== "") {
      try {
        let response = await axios.post("http://localhost:8080/users/login", {
          username: username,
          password: password,
        });

        if (response.status === 200) {
          let token = response.data;
          sessionStorage.setItem("token", token);
          navigate("/table");
        } else {
          setIsSuccess("");
          setIsError("The username or password is wrong!");
          navigate("/");
        }
        setTimeout(() => {
          setIsSuccess("");
          setIsError("");
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
    setUsername("");
    setPassword("");
  }

  async function handleRegister() {
    if (username !== "" && password !== "") {
      const userObject = { username, password };
      try {
        let response = await axios.post("http://localhost:8080/users/register", userObject, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          setIsError("");
          setIsSuccess("You are registered! Please log in.");
        } else {
          setIsSuccess("");
          setIsError("The username already exists! Please choose another one.");
        }
        setTimeout(() => {
          setIsSuccess("");
          setIsError("");
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div className="container">
      <h1>LIBRARY HOME PAGE</h1>
      <label htmlFor="username">username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value.trim());
        }}
      />
      <br />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value.trim());
        }}
      />
      <div className="button-container">
        <button className="button login" onClick={handleLogin}>
          Login
        </button>
        <button className="button register" onClick={handleRegister}>
          Register
        </button>
      </div>
      {isError ? <p className="error">{isError}</p> : null}
      {isSuccess ? <p className="success">{isSuccess}</p> : null}
    </div>
  );
}

export default Login;
