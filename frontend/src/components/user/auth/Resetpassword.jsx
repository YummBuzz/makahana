import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import {  useLocation, useNavigate } from 'react-router-dom';


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
  
  const [formData, setFormData] = useState({
   
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
   
  };

  const handleSubmit =  async(e) => {
       e.preventDefault();
       
       await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/resetPassword`, 
       {formData,token}
      )
      .then((result) => { 
        // setStatus(result.status);
    console.log(result)
      
     
      })
      .catch((err) => {
       console.log(err)
      });
    
  };
  return (
    <>

    <h1>reset</h1>
    <form onSubmit={handleSubmit}>
         
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
           
          >
            {/* {loading ? "Submitting..." : "Submit"} */}
            Submit
          </Button>
        </form>
    </>
  )
}
