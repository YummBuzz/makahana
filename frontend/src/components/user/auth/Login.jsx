import { useState, useEffect } from "react";


import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  
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
      if (response.data.token) {
        // console.log(response.data.token)
        const token =response.data.token
        axios
          .get(`${import.meta.env.VITE_APP_API_URL}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
  
          .then((response) => {
            console.log(response.data);
            localStorage.setItem("username", response.data.username);
  
            navigate("/");
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
    } catch (error) {
      console.error("An error occurred:", error);
      // setResult(error.response.data);
      // setStatus(error.response.status);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };

 

  // useEffect(() => {
    

    
  // },[token]);

  return (
    <>
    <Navbar pdScroll={0} />
      <div className="signup-section">
      <div className="signup-form">
        <h4>Sign <span> In </span></h4>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"
              >Email address</label
            >
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="username"
            value={formData.username}
            onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label"
              >Password</label
            >
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            value={formData.password}
            onChange={handleChange}
            />
          </div>
          
          <Button
            type="submit" class="sign-up-btn"
            disabled={loading || !formData.username || !formData.password}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        
        {status === 200 && <Alert variant="success">{result}</Alert>}
        {status === 404 || status == 401 ? (
          <Alert variant="danger">{result}</Alert>
        ) : null}
        <div className="have-account">
          <p>Forget Password <Link to="/forget-password"> Reset Password </Link></p>
          <p>New User. Create a Account <Link to='/register'> Create Account</Link></p>
        </div>
        
      </div>
    </div>
    </>
  );
}
