import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import {  useLocation, useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';


export default function Resetpassword() {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
 
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
        navigate('/forgot-password');
     // Redirect to forget password page if token is not provided
    }
  }, [location, history]);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  
  const [formData, setFormData] = useState({
   
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

  const handleSubmit =  async(e) => {
       e.preventDefault();
       
       await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/resetPassword`, 
       {formData,token}
      )
      .then((result) => { 
        
        setStatus(result.status);
      
        setResult(result.data);
      
     
      })
      .catch((err) => {
        setStatus(err.response.status);
        setResult(err.response.data);
      });
    
  };
  return (
    <>

    <Navbar pdScroll={0}/>
        <div className="signup-section">
      <div className="signup-form">
        <h4>Reset <span> Password </span></h4>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"
              >Email address</label
            >
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
            
          </div>
          
          
          
          <Button
            type="submit"
            
          >
            Submit
          </Button>
        </form>
        
        {status === 200 && <Alert variant="success">{result}</Alert>}
        {status === 400 || status == 401 ? (
          <Alert variant="danger">{result}</Alert>
        ) : null}
        
        
      </div>
    </div>
    <Footer/>
    </>
  )
}
