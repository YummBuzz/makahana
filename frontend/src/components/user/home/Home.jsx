import React, { useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import Scrollbutton from "../scrollToTop/Scrollbutton";
export default function Home() {
  const [hoveredDiv, setHoveredDiv] = useState(null);
  const handleMouseEnter = (e) => {
    setHoveredDiv(e);
   

  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };
  let logo = null;

  if (hoveredDiv === "YummBuzz") {
    logo = '/logos/yummbuzz-logo.png';
  } else if (hoveredDiv === "wagini") {
    logo = '/logos/wagini-logo.png';
  }


  
  

  
  return (
    <>
      <Navbar logo={logo }  />
<Scrollbutton/>


      {/* <!--section1--> */}
      <div className="section1" >
        <div className="yummbuzz-section sections" onMouseEnter={() => handleMouseEnter("YummBuzz")}
        onMouseLeave={handleMouseLeave}>
          <div className="arrow">
            <i className="ph-bold ph-caret-left"></i>
          </div> 
          {/* <!--yumm content-container--> */}
          <div className="section-content-container">
            {/* <!--yumm content--> */}
            <div className="section-content">
              <div className="section-head">
                <h1>Enjoy the Crunch,</h1>
                <h1>Embrace the Health</h1>
              </div>
              <div className="section-para">
                <p>
                  Yummbuzz offers Makhana in six exciting flavors: classNameic
                  Salted, Spicy Pudina, Lime and Pepper, Cream and Onion, Sweet
                  and Spicy Honey, and Peri-Peri. Enjoy our nutrient-rich snack
                  in 27g and 60g packs for guilt-free, on-the-go goodness.
                </p>
              </div>
              <div className="section-btn">
                <button className="button">
                <Link to="/products/Yumm Buzz"  >Visit Store </Link>
                  <i className="ph-bold ph-arrow-up-right"></i>
                </button>
              </div>
            </div>

            {/* <!--yumm image--> */}
            <div className="section-image">
              <img
                src="/yummbuzz-products/new/yumm-pack.png"
                alt="YumMBuzz Product"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="wagini-section sections" onMouseEnter={() => handleMouseEnter("wagini")}
        onMouseLeave={handleMouseLeave}>
          <div className="arrow">
            <i className="ph-bold ph-caret-right"></i>
          </div>
          {/* <!--yumm content-container--> */}
          <div className="section-content-container">
            {/* <!--yumm content--> */}
            <div className="section-content">
              <div className="section-head">
                <h1>Savor the Crunch,</h1>
                <h1>Relish the Health</h1>
              </div>
              <div className="section-para">
                <p>
                  Introducing Wagini Makhana, the ultimate healthy snack. Simply
                  processed for a crunchy texture and loaded with nutrients,
                  it's available in 100g and 200g packs. Enjoy anytime,
                  anywhere, guilt-free!
                </p>
              </div>
              <div className="section-btn">
                <button className="button">
                  <Link to="/products/wagini" >Visit Store </Link>
                  {/* <a href="#!"> Visit Store </a>s */}
                  <i className="ph-bold ph-arrow-up-right"></i>
                </button>
              </div>
            </div>

            {/* <!--yumm image--> */}
            <div className="section-image">
              <img src="/wagini/wagini-pack.png" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      {/* <!--section1 end--> */}

      {/* <!--section2--> */}
      <div className="section2">
        <div className="container">
          <div className="row service-row g-4 g-lg-0 text-align-center">
            <div className="col-12 col-lg-3 serv">
              <img src="/services/s1.png" className="img-fluid" />
              <h4>Wide Products Range</h4>
            </div>

            <div className="col-12 col-lg-3 serv">
              <img src="/services/s2.png" className="img-fluid" />
              <h4>Highest Quality Products</h4>
            </div>

            <div className="col-12 col-lg-3 serv">
              <img src="/services/s3.png" className="img-fluid" />
              <h4>100% Natural & Organic</h4>
            </div>

            <div className="col-12 col-lg-3 serv">
              <img src="/services/s4.png" className="img-fluid" />
              <h4>On-Time Delivery</h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!--section2 end--> */}

      {/* <!--section3--> */}
      <div className="section3 margin-div">
        <div className="section3-taglines">
          <div className="container">
            <div className="row tagline-content g-4 g-lg-0">
              <div className="col-12 col-lg-6 border-tagline">
                <p>
                  Water Lily Pops - popped and flavored Your Indian popcorn made
                  from the seeds of an aquatic plant
                </p>
              </div>
              <div className="col-12 col-lg-6">
                <p>
                  From the fields of India, harvested by hand ❤️ Your crispy and
                  light snack for in between!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section3-about">
          <div className="container">
            <div className="row section3-about-content">
              <div className="col-12 section3-about-head">
                <h2>Who We Are ?</h2>
              </div>
              <div className="col-12 col-lg-10 section3-about-para">
                <p>
                  We're the makers of Wagini and Yummbuzz, your go-to brands for
                  delicious Makhana snacks. We are passionate about creating
                  top-notch Makhana snacks and started with a clear goal: to
                  make yummy, healthy snacks accessible to everyone. By
                  carefully selecting and preparing our ingredients, we have
                  crafted a variety of exciting flavors like classNameic Salted,
                  Spicy Pudina, Lime and Pepper, Cream and Onion, Sweet and
                  Spicy Honey, and Peri-Peri. Our commitment to quality means we
                  use only the best ingredients, ensuring every crunchy bite is
                  packed with nutrients and flavor. Whether you're looking for a
                  guilt-free snack on the go or something to satisfy your
                  cravings at home, Wagini and Yummbuzz have got you covered.
                </p>
                <p>
                  Join us on our journey as we continue to innovate and create
                  tasty snacks that people everywhere love. With Wagini and
                  Yummbuzz, you can enjoy the perfect blend of taste and health
                  in every bite.
                </p>
              </div>
              <div className="col-12 section3-about-btn">
                <button className="button">
                <Link to="/about"> About Us </Link>
          
                  <i className="ph-bold ph-arrow-up-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--section3 end--> */}

      {/* <!--section4--> */}
      <div className="section4 margin-div">
        <div className="container">
          <div className="row section4-headings">
            <div className="col-12 section4-head">
              <h2>Shop By Category</h2>
            </div>
            <div className="col-12 col-lg-7 section4-subhead">
              <p>
                Check out our Makhana snacks from Yummbuzz and Wagini. We have
                lots of yummy flavors and sizes to choose from. Whether you like
                traditional or adventurous tastes, pick your favorite brand and
                enjoy guilt-free snacking with our high-quality snacks.
              </p>
            </div>
          </div>

          {/* <!--section4-boxes--> */}
          <div className="row m-0">
            <div className="col-12 col-lg-6 box-container">
              <div className="row box-1">
                <div className="col-12 col-lg-7 box-1-content">
                  <h4>Yumm Buzz</h4>
                  <p>
                    Try Yummbuzz, the ultimate Makhana . Available in two
                    convenient sizes – 27g and 60g – and boasting six delicious
                    flavors.
                  </p>
                  <button className="button">
                    <Link to="/products/Yumm Buzz">
                    Visit Store 
                    </Link>
                  
                    <i className="ph-bold ph-arrow-right"></i>
                  </button>
                </div>
                <div className="col-12 col-lg-5 box-1-img">
                  <img
                    src="/yummbuzz-products/new/yumm-pack2.png"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* <!--wagini-box--> */}
            <div className="col-12 col-lg-6 box-container wagini-box">
              <div className="row box-1">
                <div className="col-12 col-lg-7 box-1-content">
                  <h4>Wagini</h4>
                  <p>
                    Try Wagini Makhana , your premium choice for simply
                    processed Makhana. Available in two sizes – 100g and 200g .
                  </p>
                  <button className="button">
                  <Link to="/products/wagini">
                    Visit Store 
                    </Link>
                   
                    <i className="ph-bold ph-arrow-right"></i>
                  </button>
                </div>
                <div className="col-12 col-lg-5 box-1-img">
                  <img src="/wagini/wagini-new.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--seciton4 end--> */}

      {/* <!--section5--> */}
      <div className="section5 margin-div">
        <div className="container-fluid h-100 w-100">
          <div className="row h-100 d-flex align-items-center justify-content-center ">
            <div className="col-12 col-lg-7 section5-slider-container ">
              <div
                id="carouselExampleIndicators"
                className="carousel slide h-100"
               
                data-bs-ride="carousel false"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                </div>
                <div className="carousel-inner h-100 w-100">
                  <div className="carousel-item active h-100">
                    <div className="slider-content-container">
                      <div className="slider-content">
                        <h4>
                          Elevate Your Snack Game with Nutrient-Packed Makhana.
                        </h4>
                        <p>
                          Boost your snacking with nutrient-packed Makhana – a
                          delicious, healthy alternative that's crunchy, light,
                          and rich in essential vitamins and minerals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item h-100">
                    <div className="slider-content-container">
                      <div className="slider-content">
                        <h4>
                          Power Up Your Routine with Deliciously Healthy
                          Makhana.
                        </h4>
                        <p>
                          Power up your routine with deliciously healthy Makhana
                          – a guilt-free, crunchy snack that's packed with
                          nutrients to keep you energized and satisfied.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item h-100">
                    <div className="slider-content-container">
                      <div className="slider-content">
                        <h4>
                          Boost Your Energy with the Ultimate Makhana Crunch.
                        </h4>
                        <p>
                          Boost your energy with the ultimate Makhana crunch – a
                          uniquely delicious snack that's packed with protein,
                          low in calories, and perfect for fueling your day with
                          healthy, satisfying bites.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item h-100">
                    <div className="slider-content-container">
                      <div className="slider-content">
                        <h4>
                          Nourish Your Body and Soul with Tasty Makhana Snacks.
                        </h4>
                        <p>
                          Nourish your body and soul with tasty Makhana snacks –
                          uniquely crunchy and rich in antioxidants, these
                          delightful bites offer a perfect blend of flavor and
                          health in every handful.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--section5 end--> */}

      {/* <!--section6--> */}
      <div className="section6 margin-div">
        <div className="container">
          <div className="row section6-headings">
            <div className="col-12 section6-head">
              <h2>Our Customer Feedback</h2>
            </div>
            <div className="col-12 col-lg-7 section6-subhead">
              <p>Don’t take our word for it. Trust our customers</p>
            </div>
          </div>

          <div className="row section6-testimonials">
            <div className="col-12">
              {/* <!-- Swiper --> */}

              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                modules={[Pagination, Autoplay]}
                className=" swiper mySwiper testimonial-swiper"
              >
                <SwiperSlide className="text-center">
                  <div className="swiper-slide swiper-slide-testimonials">
                    <div className="testimonial-content">
                      <i className="ph ph-user-circle"></i>
                      <div className="rating-stars">
                        <i className="ph-fill ph-star"></i>
                        <i className="ph-fill ph-star"></i>
                        <i className="ph-fill ph-star"></i>
                        <i className="ph-fill ph-star"></i>
                        <i className="ph-fill ph-star"></i>
                      </div>
                      <h4>Rahul Sharma</h4>
                      <p>
                        Yummbuzz Makhana is my new favorite snack! The classNameic
                        Salted flavor is lightly salted, crunchy, and
                        satisfying—a guilt-free treat perfect for afternoon tea
                        or a quick snack. Great taste and healthy ingredients
                        make it a pantry must-have!
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="text-center">
                <div className="swiper-slide swiper-slide-testimonials">
                  <div className="testimonial-content">
                    <i className="ph ph-user-circle"></i>
                    <div className="rating-stars">
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                    </div>
                    <h4>Rohit Shukla</h4>
                    <p>
                      I love Yummbuzz Makhana! The classNameic Salted flavor is
                      perfectly seasoned and incredibly crunchy. It's my go-to
                      snack for a quick, guilt-free bite during a busy day.
                      Enjoying something healthy and tasty is the best part.
                      Must try!
                    </p>
                  </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="text-center">
                <div className="swiper-slide swiper-slide-testimonials">
                  <div className="testimonial-content">
                    <i className="ph ph-user-circle"></i>
                    <div className="rating-stars">
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                    </div>
                    <h4>Jitender Kumar</h4>
                    <p>
                      Loved It ! Each bite is packed with flavor and crunch, and
                      it's so satisfying to know that it's also good for me.
                      Wagini Makhana has become a staple in my snack cupboard.
                      Absolutely fantastic.
                    </p>
                  </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="text-center">
                <div className="swiper-slide swiper-slide-testimonials">
                  <div className="testimonial-content">
                    <i className="ph ph-user-circle"></i>
                    <div className="rating-stars">
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                    </div>
                    <h4>Shubham Tyagi</h4>
                    <p>
                      I love Yummbuzz Makhana! The Lime and Pepper flavor is my
                      favorite. The tangy lime and subtle pepper heat are
                      perfect—refreshing, crunchy, and incredibly moreish. It's
                      hard to believe something this delicious can also be
                      healthy.
                    </p>
                  </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="text-center testimonial-swiper">
                <div className="swiper-slide swiper-slide-testimonials">
                  {" "}
                  <div className="testimonial-content">
                    <i className="ph ph-user-circle"></i>
                    <div className="rating-stars">
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                    </div>
                    <h4>Sahil Sharma</h4>
                    <p>
                      Each snack is packed with crunch and flavor, making them
                      perfect for any time of the day. It's great to have a
                      snack that's both delicious and good for you. I can't get
                      enough of these Makhana snacks. Highly recommend trying
                      all the flavors.
                    </p>
                  </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="text-center">
                <div className="swiper-slide swiper-slide-testimonials">
                  <div className="testimonial-content">
                    <i className="ph ph-user-circle"></i>
                    <div className="rating-stars">
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                      <i className="ph-fill ph-star"></i>
                    </div>
                    <h4>Rohit Shukla</h4>
                    <p>
                      Yummbuzz offers a variety of Makhana flavors, and Lime and
                      Pepper is my favorite. The citrusy zest with a hint of
                      pepper is refreshing and unique, feeling indulgent yet
                      healthy.
                    </p>
                  </div>
                  </div>
                </SwiperSlide>
               
              </Swiper>

              
            </div>
          </div>
        </div>
      </div>
      {/* <!--section6-end--> */}
      <Footer/>
    </>
  );
}
