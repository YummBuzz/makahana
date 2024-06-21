import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import Scrollbutton from '../scrollToTop/Scrollbutton'


export default function Contact() {
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
              <h4>Address</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                minus dignissimos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. At minus dignissimos.
              </p>
            </div>
            <div>
              <h4>Contact Information</h4>
              <p>
                <a href="#!" className="contact-link">
                  <i className="ph-fill ph-navigation-arrow"></i>
                  <span>
                    Rishab Global industries Pvt Ltd.,New Delhi – 110005</span
                  >
                </a>
              </p>

              <p>
                <a href="#!" className="contact-link">
                  <i className="ph-bold ph-phone"></i>
                  <span> 011+95829266</span>
                </a>
              </p>
              <p>
                <a href="#!" className="contact-link">
                  <i className="ph-bold ph-envelope-simple"></i>
                  <span> waginimakhana@gmail.com</span>
                </a>
              </p>
            </div>
            <div>
              <p><strong> Hii there </strong></p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                cum ullam pariatur unde voluptate accusamus aperiam, aut
                recusandae, deleniti officia, nulla obcaecati autem? Corporis
                ipsa soluta maiores, officia beatae explicabo?
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <form className="contact-form">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
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
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Contact Number"
              />
            </div>
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
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
