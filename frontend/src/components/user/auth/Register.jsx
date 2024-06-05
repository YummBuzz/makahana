import React ,{ useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Alert from "react-bootstrap/Alert";
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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

  const handleSubmit =  async(e) => {
       e.preventDefault();
       setLoading(true);
       await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/createAccount`, 
       formData
      )
      .then((result) => { 
        // setStatus(result.status);
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
      <div className="main">
        <div>Register</div>


        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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

          <Button
            type="submit"
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
      </div>
    </>
  );
}
