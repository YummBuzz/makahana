import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import cartSlice, { addToCart } from "../../../Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import Scrollbutton from "../scrollToTop/Scrollbutton";




export default function Productdetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
//   const [selectedPrice, setSelectedPrice] = useState(null);
const navigate = useNavigate();
  const fetchdata = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/randomproducts`
    );
    // console.log(response);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["randomproducts"],
    queryFn: () => fetchdata(),
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery(
    ["products/:id", id],
    async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/products/${id}`
      );
      // console.log(response.data)
      return response.data;
    },
    {
      enabled: !!id, // Ensures query is enabled only when id is truthy
    }
  );
  

  // size selecting
  const handleSizeSelect = async(size) => {
    console.log(size)

    setSelectedSize(size);
    if (size && id) {
     
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/productbysize`,
          { size, productId: id } // Send the current product ID and selected size
        );
        
   
        const pid =response.data[0]._id
        navigate(`/productdetail/${pid}`);
      } catch (error) {
        console.error("Error fetching product details by size:", error);
      }
    }

  
  };

//   //   get price for size selector
//   useEffect(() => {
//     if (selectedSize) {
//       const selectedPrice = productsData.prices.find(
//         (price) => price.size === selectedSize
//       );
//     //   console.log(selectedPrice.price);
//       if (selectedPrice) {
//         setSelectedPrice(selectedPrice.price);
//       }
//     }
//   }, [selectedSize, selectedPrice]);

  //   increase quantity

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    // Ensure quantity doesn't go below 0
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // cart

  
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // alert("hello")
      const productAdd = {
        ...product,
        quantity: quantity,
       
      };

      dispatch(addToCart(productAdd));

   
  };
  
  


  return (
    <>
      <Navbar pdScroll={0} />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Scrollbutton />

      {/* <!--product-detail-section1--> */}

      {productsLoading ? (
        <>
          {" "}
          <h1>Loading....</h1>{" "}
        </>
      ) : (
        <>

          {" "}
          <div className="product-detail-section1 margin-div " key={productsData._id}>
            <div className="container">
              <div className="row g-4">
                <div className="col-12 col-lg-6 product-detail-slider">
                  <div id="carouselExample" className="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="detail-img-wrapper">
                          <div className="detail-img-container">
                            <img src={productsData.imgFront} />
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="detail-img-wrapper">
                          <div className="detail-img-container">
                            <img src={productsData.imgBack} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

                <div className="col-12 col-lg-6 product-detail-content">
                  <div className="product-detail-name">
                    <p style={{ textTransform: "capitalize" }}>
                      {productsData.brand}
                    </p>
                    <h2>{productsData.title}</h2>
                  </div>
                  <p className="detail-product-price">
                    <span> Rs </span>{" "}
                  {productsData.price}
                  </p>
                  <p className="detail-product-short-description">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Iure autem nihil culpa ea libero consequuntur adipisci sequi
                    velit delectus, voluptatibus ab ipsam commodi maiores. Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Non sunt
                    illum dolorem? Voluptatibus, iusto illum.
                  </p>

                  <div className="product-note">
                    <p>
                      <strong> Note :</strong> Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Blanditiis, facere. Quis
                      mollitia nam odit ullam consequuntur facere, labore
                      incidunt sequi adipisci.
                    </p>
                  </div>

                  <div className="product-size-quantity-btn">
                    <div className="product-size">
                      <p>
                        Size:<span> {
                          selectedSize == "" ? <>{productsData.size}</> :<>{selectedSize}</>
                          }</span>
                      </p>
                      <div className="product-size-inputs">
                        {productsData.sizes.map((size) => (
                          <div className="size-input" key={size._id}>
                            <input
                              type="radio"
                              name="size"
                              id={size}
                              // checked
                              onClick={() => handleSizeSelect(size)}
                            />
                            <label htmlFor="27g"> {size}</label>
                          </div>
                  ))} 
                   
                      </div>
                    </div>

                    <div className="product-quantity">
                      <p>
                        Quantity:<span> {quantity}</span>
                      </p>
                      <div className="product-quantity-btn">
                        <button type="button" onClick={decreaseQuantity}>
                          -
                        </button>
                        <span> {quantity}</span>
                        <button type="button" onClick={increaseQuantity}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="product-btns">
                    <button
                      onClick={() => handleAddToCart(productsData)}
                      className="link"
                      style={{border:"none"}}
                    >
                      {" "}
                      Add To Cart{" "}
                    </button>
                    <Link
                      to="/checkout"
                      onClick={() => handleAddToCart(productsData)}
                      className="link"
                    >
                      {" "}
                      Buy It Now{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-section2 margin-div">
            <div className="container product-description-container">
              <div className="row description-container2">
                <div className="col-12 description-head">
                  <h2>Description</h2>
                </div>
                <div className="col-12 product-description">
                  <ul>
                    <li>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Esse nesciunt, ut beatae dolores at minus, consectetur
                      quae exercitationem repellendus eligendi.
                    </li>
                    <li>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Accusamus cum facere eum sit quidem illum amet quod qui
                      beatae non tempore eveniet iste aut, nostrum ad
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cupiditate,
                    </li>
                    <li>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aliquid quo provident autem mollitia tempore vero
                      laboriosam et quaerat animi architecto
                    </li>
                  </ul>
                </div>

                <div className="col-12 product-manufacture-detail">
                  <ul>
                    <li>Country Of Origin : India</li>
                    <li>
                      MRP (Inc. of all taxes) : 400.00 each 180g Jar (10 N x 18g
                      each in Jar)
                    </li>
                    <li>Shelf Life : 6 Months</li>
                    <li>
                      Ingredients : Wet dates, Cashewnut kernels, Almond
                      kernels, Pistachio kernels, Honey, Desi ghee
                    </li>
                    <li>
                      Processed, Packed & Marketed by : Connedit Business
                      Solutions Pvt. Ltd. Khasra No. 17/2/2 & 3, 51/1/2 Kaji
                      Palasiya, Indore Madhya Pradesh - 452001 
                    </li>
                  </ul>
                </div>
                <div className="col-12">
                  <div className="row product-qualities-logos">
                    <div className="col-12 col-md-6 col-lg-2">
                      <img src="/prodcut-qualities/1.png" />
                    </div>

                    <div className="col-12 col-md-6 col-lg-2">
                      <img src="/prodcut-qualities/2.png" />
                    </div>

                    <div className="col-12 col-md-6 col-lg-2">
                      <img src="/prodcut-qualities/3.png" />
                    </div>

                    <div className="col-12 col-md-6 col-lg-2">
                      <img src="/prodcut-qualities/4.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-section3 margin-div">
            <div className="container">
              <div className="row">
                <div className="col-12 product-detail-section3-head">
                  <h2>You Might Also Like</h2>
                </div>
                <div className="col-12" style={{height:"450px"}}>
                  {/* <!-- Swiper --> */}

                  {isError && <>Error in fetch products.....</>}

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
                        slidesPerView: 3,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="swiper mySwiper recommend-product-slider"
                    style={{height:"100%"}}
                  >
                    {isLoading ? (
                      <>
                        <h1>loading...</h1>
                      </>
                    ) : (
                      <>
                        {data.map((data) => (
                          <SwiperSlide key={data._id}>
                            <div className="swiper-slide">
                              <div className="product-card">
                                <div className="product-main-img-container">
                                  <div className="product-img-container">
                                    <Link to={`/productdetail/${data._id}`}>
                                      <img
                                        src={data.imgFront}
                                        alt={data.title}
                                      />
                                      <img
                                        src={data.imgBack}
                                        alt={data.title}
                                      />
                                    </Link>
                                  </div>
                                </div>

                                <div className="product-card-detail">
                                  <div style={{ width: "100%" }}>
                                    <span
                                      className="product-brand"
                                      style={{ textTransform: "capitalize" }}
                                    >
                                      {" "}
                                      {data.brand}
                                    </span>
                                    <h5 style={{ minHeight: "60px" }}>
                                      <a href="#!">{data.title}</a>
                                    </h5>
                                  </div>
                                  <div className="price-cart d-flex flex-column gap-2 justify-content-start gap-3">
                                  <div className="d-flex justify-content-between">
                                <p>
                                  <span> </span> {data.size}
                                </p>
                                <p>
                                  <span> Rs </span> {data.price}
                                </p>
                              </div>
                                    <button type="button" onClick={() => handleAddToCart(data)}>Add To Cart</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </>
                    )}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
      <Footer />
    </>
  );
}
