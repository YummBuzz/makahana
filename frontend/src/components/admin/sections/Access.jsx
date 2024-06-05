import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

import './Access.css'
import { useNavigate} from 'react-router-dom';

export default function Access() {

    const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    accesslevel: ''
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

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/adminregister`,
        formData
      );
    
      setResult(response.data);
      setStatus(response.status);
    } catch (error) {
       
      setResult(error.response.data);
      setStatus(error.response.status);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };
  return (
    <>
    <div className="acess-container">
        <div className="hd-content d-flex justify-content-between">
        <h1 >Access Control</h1>
        <div className="d-block text-center card-footer">
                  
                 <Link to='/admindashboard/adminlist'> <button className="btn-wide btn btn-success">Admin List</button></Link>
                </div>
        </div>
        <div className="sub-container d-flex justify-content-center align-items-center">
        <div className="card ac-card">
          <h2>Add Admin</h2>
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
            <select
        name="accesslevel"
        value={formData.accesslevel}
        onChange={handleChange}
      >
        <option value="">Select Option</option>
        <option value="Admin">Admin</option>
        <option value="Sub-Admin">Sub-Admin</option>
        
      </select>


            <button
              type="submit"
              disabled={loading || !formData.username || !formData.password || !formData.accesslevel}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <div className="mt-3">
          {status === 200 && <Alert variant="success">{result}</Alert>}
          {status === 400 || status == 401 ? (
            <Alert variant="danger">{result}</Alert>
          ) : null}
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}
