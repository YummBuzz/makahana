import React, { useState } from "react";
import "./Login.css";
import Button from 'react-bootstrap/Button';
import axios from 'axios'



export default function Login() {
//   const [username, setUsername] = useState(false);
const [loading, setLoading] = useState(false);

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
    setLoading(true); // Set loading state to true when the button is clicked
    try {
      // Simulate an API call with a timeout
      const response = await axios.post('/api/login', formData);
      console.log(response.data);
      // Handle form submission using formData
      console.log('Form submitted with data:', formData);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };


  return (
    <>
      <div className="main">
        <div>Login</div>
        {/* <button onClick={() => setUsername(true)}>Login</button>
        {username && (
          <div className="popup">
            <div className="sub-popup">
              <p>hello</p>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
                pariatur enim modi, unde blanditiis ad similique suscipit ex!
                Dolorum, sunt?
              </span>
              <button onClick={() => setUsername(false)}>Logout</button>
            </div>
          </div>
        )} */}



 
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
