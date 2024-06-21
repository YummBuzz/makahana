import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Alert from "react-bootstrap/Alert";
import Navbar from '../Navbar/Navbar';
import Footer from '../footer/Footer';


export default function Forgetpassword() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  const [formData, setFormData] = useState({
    
    username: "",
    
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
      .post(`${import.meta.env.VITE_APP_API_URL}/sendForgetLink`, 
       formData
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
        <h4>Forget <span> Password </span></h4>
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
