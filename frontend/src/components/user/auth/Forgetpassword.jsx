import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';


export default function Forgetpassword() {
  

  const [formData, setFormData] = useState({
    
    username: "",
    
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
      .post(`${import.meta.env.VITE_APP_API_URL}/sendForgetLink`, 
       formData
      )
      .then((result) => { 
        // setStatus(result.status);
       console.log(result)
      
     
      })
      .catch((err) => {
        console.log(err)
    //     toast.error(err.response.data)
        
    //   setStatus(err.response.status);
      });
    //   setLoading(false); 
  };
  return (
    <>
    
    <h1>Forget password</h1>
    <form onSubmit={handleSubmit}>
         
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          

          <Button
            type="submit"
            
          >
            {/* {loading ? "Submitting..." : "Submit"} */}Submit
          </Button>
        </form>
    </>
  )
}
