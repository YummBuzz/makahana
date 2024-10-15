import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import Scrollbutton from '../scrollToTop/Scrollbutton'
import axios from 'axios'



export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/message`, formData);
        alert(response.data);
        setFormData({ name: '', email: '', contact: '', message: '' });
    } catch (error) {
        alert('Error saving contact');
    }
};
  return (
    <>
    <Navbar pdScroll={0}/>
    <Scrollbutton/>
    {/* <!--contact-us page--> */}
    <div className="contact-us-section1 container margin-div">
      <div className="row m-0 g-4">
        <div className="col-12 contact-head">
          <h2>Contact <span> Us </span></h2>
        </div>

        <div className="col-12 col-lg-6">
          <div className="contact-content">
            <div>
              {/* <h4>Address</h4> */}
              <p>
              For any inquiries or assistance regarding our delicious makhana, please reach out to us. We're here to help! Contact us for prompt support at YummBuzz.
              </p>
            </div>
            <div>
              <h4>Contact Information</h4>
              <p>
                <a href="#!" className="contact-link">
                  <i className="ph-fill ph-navigation-arrow"></i>
                  <span>
                  PECUMER  1202, Vijaya building, Connaught place ,New Delhi, 110001</span
                  >
                </a>
              </p>

              <p>
                <a href="tel:8986927873" className="contact-link">
                  <i className="ph-bold ph-phone"></i>
                  <span> 8986927873</span>
                </a>
              </p>
              <p>
                <a href="mailto:indiafarmspolicy@gmail.com" className="contact-link">
                  <i className="ph-bold ph-envelope-simple"></i>
                  <span> indiafarmspolicy@gmail.com</span>
                </a>
              </p>
            </div>
            <div>
              <p><strong> Hii there </strong></p>
              <p>
              At YummBuzz, we are dedicated to providing exceptional support and ensuring our customers are always satisfied. Whether you have questions, feedback, or require assistance, we're here to help every step of the way. Your satisfaction is our top priority, and we look forward to hearing from you!
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name} onChange={handleChange}
                id="formGroupExampleInput"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="E-mail"
                name="email"
                value={formData.email} onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Contact Number"
                name="contact"
                value={formData.contact} onChange={handleChange}
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                name='message'
                value={formData.message} onChange={handleChange}
                style={{height: "100px"}}
              ></textarea>
              <label htmlFor="floatingTextarea2">Comments</label>
            </div>
            <div>
              <button type="submit" className="text-dark">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>

    
    </>
)}
