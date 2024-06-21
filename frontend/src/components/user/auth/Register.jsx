import React ,{ useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
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
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };
  const handleSubmit =  async(e) => {
       e.preventDefault();
       if (!isChecked) {
        alert('Please check the checkbox before submitting.');
        return;
      }
       setLoading(true);
       await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/createAccount`, 
       formData
      )
      .then((result) => { 
       
        toast.success(result.data)
      
     
      })
      .catch((err) => {
        toast.error(err.response.data)
        
      setStatus(err.response.status);
      });
      setLoading(false); 
  };

  return (
    <>
    

<Navbar pdScroll={0}/>
      <div className="signup-section">
      <div className="signup-form">
        <h4>Get <span> Started Now </span></h4>



        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Name</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
            value={formData.name}
            onChange={handleChange}
            />
          </div>
         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"
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
            <label htmlFor="exampleInputPassword1" className="form-label"
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
          <div className="mb-3 form-check check-input">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1"
              >I agree to <Link to="/"> Terms & Policy</Link>
            </label>
          </div>
      
         

          <Button
            type="submit"
            className="sign-up-btn"
            disabled={
              loading ||
              !formData.username ||
              !formData.password ||
              !formData.name
            }
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <Toaster />
        {/* {status === 200 &&  <Toaster />} */}
        {status === 400 || status == 401 ? (
           <Toaster />
        ) : null}
        <div className="have-account">
          <p>Have an account? <Link to="/login"> Sign In</Link></p>
        </div>


      </div>
    </div>
    </>
  );
}
