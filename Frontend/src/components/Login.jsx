import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // Set axios to send cookies with requests

export default function Login({
  setLoading,
  error,
  setError,
  username,
  setUsername,
}) {
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [success, setSuccess] = useState("");
  const [theLogin, setTheLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "https://quizapp-68lr.onrender.com/api/protected-route",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        // Redirect to /get-started if authenticated
        navigate("/get-started");
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  useEffect(() => {
    console.log("Success:", success, "Error:", error);
  }, [success, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "https://quizapp-68lr.onrender.com/api/auth/login"
        : "https://quizapp-68lr.onrender.com/api/auth/signup";
      const response = await axios.post(endpoint, { username, password });

      if (isLogin) {
        console.log(response.data);
        setTheLogin(true);
        // Fetch protected data
        await fetchData();
      }
      setSuccess(
        isLogin ? "Login successful!" : "Signup successful! Please log in."
      );
      setError("");
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://quizapp-68lr.onrender.com/api/protected-route",
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const removeDomain = (email) => {
    const domains = [
      "@gmail.com",
      "@yahoo.com",
      "@hotmail.com",
      "@outlook.com",
    ];
    if (email) {
      for (let domain of domains) {
        if (email.endsWith(domain)) {
          return email.replace(domain, "");
        }
      }
    }
    return email;
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>
        {isLogin
          ? `Welcome Back ${
              removeDomain(username) ? removeDomain(username) : ""
            }!`
          : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.formLabel}>
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.formInput}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.loginButton}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {username && username !== "User" && theLogin && isLogin && success ? (
          <Link to="/get-started" className={styles.loginButton}>
            Play
          </Link>
        ) : null}
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className={styles.toggleButton}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}
