import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { jwtDecode } from "jwt-decode";

// Bootstrap

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

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
       
        `${import.meta.env.VITE_APP_API_URL}/adminlogin`,
        formData
      );
     

      localStorage.setItem("admintoken", response.data.token);
      // localStorage.setItem("admin", response.data.admin.username);
      // localStorage.setItem("access", response.data.admin.accesslevel);
      localStorage.setItem("adminloggedIn", "true");
      setResult(response.data.message);
      setStatus(response.status);
      setToken(response.data.token);
      // if (response.status === 200) {
      //   navigate("/admindashboard/overview");
      // }
    } catch (error) {
      setResult(error.response.data);
      setStatus(error.response.status);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    


    if (token) {
     axios.get(`${import.meta.env.VITE_APP_API_URL}/adminprofile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      .then((response) => {

       
        localStorage.setItem("admin", response.data.username);
      localStorage.setItem("access", response.data.accesslevel);
        navigate("/admindashboard/overview");
        // setLoggedIn(true);
      })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Token expired, clear it from session storage
            localStorage.removeItem('token');
            // setLoggedIn(false);
          } else {
            console.error(error);
          }
        });
    }
  });

  
  
  
  


 
 
  

  return (
    <>
      <div className="container">
        <div className="card">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading || !formData.username || !formData.password}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <div className="mt-3">
          {status === 200 && <Alert variant="success">{result}</Alert>}
          {status === 404 || status == 401 ? (
            <Alert variant="danger">{result}</Alert>
          ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
