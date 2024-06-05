import { useState, useEffect } from "react";

import "./Login.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
// import {useQuery} from 'react-query'

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setStatus(100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/loginAuthenticate`,
        formData
      );
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);

      setResult(response.data.message);
      setStatus(response.status);
    } catch (error) {
      // console.error("An error occurred:", error);
      setResult(error.response.data);
      setStatus(error.response.status);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        .then((response) => {
          console.log(response.data);

          // setLoggedIn(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Token expired, clear it from local storage
            localStorage.removeItem("token");
            // setLoggedIn(false);
          } else {
            console.error(error);
          }
        });
    }
  });

  return (
    <>
      <div className="main">
        <div>Login</div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {/* <Button type="submit" disabled={!formData.username || !formData.password}>Submit</Button> */}
          <Button
            type="submit"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        {status === 200 && <Alert variant="success">{result}</Alert>}
        {status === 404 || status == 401 ? (
          <Alert variant="danger">{result}</Alert>
        ) : null}
      </div>
    </>
  );
}
