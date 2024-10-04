import React from 'react'
import { Link } from 'react-router-dom'


export default function Footer() {
  
  return (
    <>
    
    <div className="footer">
      <div className="container">
        <div className="row d-flex g-2 g-lg-0 ">
          <div className="col-12 col-lg-3 ">
            <div className="footer-head  ">
              <h4> Get In Touch</h4>
            </div>
            <div className="footer-links ">
              <p>
                <a href="" className="contact-link">
                  <i className="ph-fill ph-navigation-arrow"></i>
                  <span>
                  1202, 12th floor, Barkhamba road, Connaught Place, Delhi-110001</span
                  >
                </a>
              </p>

              <p>
                <a href="tel:8986927873" className="contact-link">
                  <i className="ph-bold ph-phone"></i>
                  <span> +91 8986927873</span>
                </a>
              </p>
              <p>
                <a href="mailto:sales@wagini.com" className="contact-link">
                  <i className="ph-bold ph-envelope-simple"></i>
                  <span> sales@wagini.com</span>
                </a>
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="footer-head">
              <h4> Quick Links</h4>
            </div>
            <div className="footer-links">
              <p><Link to="/"> home </Link></p>
              <p><Link to="/about"> About Us</Link></p>
              <p><Link to="/products/all"> Shop </Link></p>
              <p><Link to='/'> Blogs</Link></p>
              <p><Link to="/contact"> Contact Us </Link></p>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="footer-head">
              <h4>  Terms & Conditions</h4>
            </div>
            <div className="footer-links">
              <p><Link to="/privacy-policy"> Privacy Policy </Link></p>
              <p><Link to="/"> Return Policy</Link></p>
              <p><Link to="/terms&conditions"> Terms & Conditions </Link></p>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="footer-head">
              <h4> Our Category</h4>
            </div>
            <div className="footer-links">
              <p><Link to="/products/wagini"> Wagini </Link></p>
              <p><Link to="/products/Yumm Buzz"> Yumm Buzz</Link></p>
              <p><Link to='/products/all'> Shop Now </Link></p>
            </div>
          </div>
        </div>
        <div className="row my-4">
          <div className="col-12 footer-social-icons ">
            <a href="#!"> <i className="ph-bold ph-facebook-logo"></i> </a>
            <a href="#!"> <i className="ph-bold ph-instagram-logo"></i></a>
            <a href="#!"> <i className="ph-bold ph-twitter-logo"></i></a>
            <a href="mailto:sales@wagini.com"><i className="ph-bold ph-envelope-simple"></i></a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 copyright">
            <p>Copyright@2024: All rights reserved</p>
          </div>
        </div>
      </div>
    </div>
    
   
    </>
  )
}
