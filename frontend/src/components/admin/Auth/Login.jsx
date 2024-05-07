import React,{useState,useEffect} from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status,setStatus]= useState("");

  const navigate = useNavigate();

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

    try {
      const response = await axios.post(
        "http://localhost:3800/adminlogin",
        formData
      );
    
      localStorage.setItem("token", response.data.token);
     localStorage.setItem("adminloggedIn","true")
      setResult(response.data.message);
      setStatus(response.status)
      if(response.status === 200){
        navigate('/admindashboard/overview');

      }
     

      
    } catch (error) {
      
      setResult(error.response.data);
      setStatus(error.response.status)
       
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };


   
  return (
    <>
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




    </>
  )
}
