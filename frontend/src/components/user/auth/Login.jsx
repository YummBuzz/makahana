import React, { useState, useEffect } from "react";

import "./Login.css";
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import axios from "axios";
// import {useQuery} from 'react-query'

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status,setStatus]= useState("");

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
    setStatus(100)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true);
    // setPopup(true);
    try {
      const response = await axios.post(
        "http://localhost:3800/loginAuthenticate",
        formData
      );
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      setLoggedIn(true);
      setResult(response.data.message);
      setStatus(response.status)
     

      
    } catch (error) {
      // console.error("An error occurred:", error);
      setResult(error.response.data);
      setStatus(error.response.status)
       
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };

//   const fetchData = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//     const resp = await axios.get("http://localhost:3800/profile", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return resp.data;
//   };
// }

//  const {data,isLoading,isError}=useQuery({
//     queryKey:["profile"],
//     queryFn:fetchData
    
//   })
//   console.log(data)
//   console.log(isLoading)
//   console.log(isError)


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
     axios.get("http://localhost:3800/profile", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      .then((response) => {

        // console.log(response.data);

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
        {
          status === 200 && (
        <Alert  variant="success">
        {result}
        </Alert> 
          )
        }
        {
          status === 404 || status ==401 ? (
        <Alert  variant="danger">
        {result}
        </Alert> 
          ): null
        }
         

        
      </div>
    </>
  );
}
