import React, { useState,useEffect } from "react";
import "./Login.css";
import Button from 'react-bootstrap/Button';
import axios from 'axios'



export default function Login() {
    const [loggedIn, setLoggedIn] = useState(false);
const [loading, setLoading] = useState(false);
const [popup,setPopup]=useState(false);
const [result,setResult]=useState("")

const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true); 
    setPopup(true)
    try {
      
      const response = await axios.post('http://localhost:3800/loginAuthenticate', formData);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
      setResult(response.data.message)
      console.log('Form submitted with data:', formData);
    } catch (error) {
      console.error('An error occurred:', error);
      setResult(error.response.data)
    //   console.log(error.response.data)
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
     axios.get("http://localhost:3800/profile", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
     
      .then((response) => {
       
        console.log(response.data); 
        
        setLoggedIn(true); 
      })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Token expired, clear it from local storage
            localStorage.removeItem('token');
            setLoggedIn(false);
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
       
       {popup && (
          <div className="popup">
            <div className="sub-popup">
              <p>{result}</p>
              <button onClick={() => setPopup(false)}>Logout</button>
             
             
            </div>
          </div>
        )}



 
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
      <Button type="submit" disabled={loading || !formData.username || !formData.password}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>

      </div>
    </>
  );
}
