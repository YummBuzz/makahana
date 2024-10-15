import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import { useQuery } from "react-query";
import axios from "axios";
import Scrollbutton from "../scrollToTop/Scrollbutton";
import cartSlice, { addToCart } from "../../../Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const { brand } = useParams();
  const [selectedBrand, setSelectedBrand] = useState(brand);
  const [sort, setSort] = useState("");
  const [banner1Img, setBanner1Img] = useState(false);
  const [banner2Img, setBanner2Img] = useState(false);
  const [classTag, setClassTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize] = useState(6); // Number of items per page

  const fetchdata = async (brand) => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/products`,
      {
        params: {
          brand: selectedBrand,
          sort: sort,
          page: currentPage, // Include current page in params
          pageSize: pageSize, // Include page size in params
        },
      }
    );

    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["products", selectedBrand, sort, currentPage],
    queryFn: () => fetchdata(selectedBrand, sort, currentPage),
  });

  useEffect(() => {
    if (selectedBrand === "Yumm Buzz") {
      setBanner1Img(true);
      setBanner2Img(false);
    } else if (selectedBrand === "wagini") {
      setBanner1Img(false);
      setClassTag("active");
      setBanner2Img(true);
    } else if (selectedBrand === "all") {
      setBanner1Img(true);
      setBanner2Img(true);
    } else {
      setBanner1Img(false);
      setBanner2Img(false);
    }
  }, [selectedBrand]);
  // for brand filter button on laptop
  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setCurrentPage(1); // Reset page to 1 when changing brand
    refetch();
  };
  // for sort filter button
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1); // Reset page to 1 when changing brand
    refetch();
  };

  // for mobile select button brand filter
  const handleLinkClick = (e) => {
    setSelectedBrand(e);
  };

  // cart

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const productAdd = {
      ...product,
    };

    dispatch(addToCart(productAdd));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  return (
    <>
      <Navbar brand={selectedBrand}  pdScroll={0}/>
      <Scrollbutton />
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide shop-section1 margin-div"
        data-bs-ride="carousel false"
      >
        <div className="carousel-inner w-100 h-100 ">
          {banner1Img && (
            <>
              <div className="carousel-item active">
                <img
                  src="/banners/banner1-desk.jpg"
                  className="d-none d-md-block"
                />
                <img
                  src="/banners/banner1-mob.jpg"
                  className="d-block d-md-none"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/banners/banner2-desk.jpg"
                  className="d-none d-md-block"
                />
                <img
                  src="/banners/banner2-mob.jpg"
                  className="d-block d-md-none"
                />
              </div>
            </>
          ) }
          {banner2Img && (
            <div className={`${classTag} carousel-item `}>
              <img
                src="/banners/banner3-desk.jpg"
                className="d-none d-md-block"
              />
              <img
                src="/banners/banner3-mob.jpg"
                className="d-block d-md-none"
              />
            </div>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
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
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* <!--section2--> */}
      <div className="section2-shop margin-div">
        <div className="container">
          <div className="row m-0">
            <div className="col-12 mb-4 d-block d-xl-none">
              <div className="filter-buttons">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shop By Store
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleLinkClick("Yumm Buzz")}
                      >
                        Yumm Buzz
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleLinkClick("wagini")}
                      >
                        Wagini
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => handleLinkClick("all")}
                      >
                        All Products
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Best Sellers
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Alphabetically A to Z
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Alphabetically Z to A
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Low to High{" "}
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#">
                        High to Low{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-3 d-none d-xl-block">
              <div className="shop-inputs-container">
                {/* <!--shop by store--> */}
                <div className="shop-by-store">
                  <div className="shop-head">
                    <h4>shop by store</h4>
                  </div>
                  <div className="shop-by-store-inputs">
                    <div className="shop-inputs">
                      <input
                        type="radio"
                        id="yumm-buzz"
                        value="Yumm Buzz"
                        name="category"
                        onChange={handleBrandChange}
                      />
                      <label htmlFor="yumm-buzz"> Yumm Buzz</label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        id="wagini"
                        value="wagini"
                        name="category"
                        onChange={handleBrandChange}
                      />
                      <label htmlFor="wagini"> Wagini</label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        id="all-products"
                        value="all"
                        name="category"
                        onChange={handleBrandChange}
                      />
                      <label htmlFor="all-products"> All Products</label>
                    </div>
                  </div>
                </div>

                {/* <!--sort by--> */}
                <div className="shop-sort-by">
                  <div className="sort-head">
                    <h4>Sort By</h4>
                  </div>

                  <div className="sort-inputs">
                    <div className="shop-inputs">
                      <input
                        type="radio"
                        name="sort"
                        value=""
                        id="best-sellers"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="best-sellers"> Best Sellers</label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        name="sort"
                        value="aToZ"
                        id="a-z"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="a-z">Alphabetically A to Z</label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        name="sort"
                        value="zToA"
                        id="z-a"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="z-a"> Alphabetically Z to A </label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        name="sort"
                        value="lowToHigh"
                        id="low-high"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="low-high"> Prize Low to High </label>
                    </div>

                    <div className="shop-inputs">
                      <input
                        type="radio"
                        name="sort"
                        value="highToLow"
                        id="high-low"
                        onChange={handleSortChange}
                      />
                      <label htmlFor="high-low"> Prize High to Low </label>
                    </div>
                  </div>
                </div>

                {/* <!--shop-store-slider--> */}
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide shop-store-slider"
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
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      {/* <a href="#!"> */}
                      <img
                        src="/banners/banner3-mob.jpg"
                        className="d-block w-100 img-fluid"
                      />
                      {/* </a> */}
                    </div>
                    <div className="carousel-item">
                      {/* <a href="#!"> */}
                      <img
                        src="/banners/banner2-mob.jpg"
                        className="d-block w-100"
                      />
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--products-shop-container--> */}
            <div className="col-12 col-xl-9 product-shop-container">
              <div className="row g-5">
                { isError ? (
                  <h1>Error fetching data.</h1>
                ) : (
                  <>
                    {data &&
                      data.products.map((product) => (
                        <div
                          className="col-12 col-md-6 col-xl-4"
                          key={product._id}
                        >
                          <div className="product-card">
                            <div className="product-main-img-container">
                              <div className="product-img-container">
                                <Link to={`/productdetail/${product._id}`}>
                                  <img
                                    src={product.imgFront}
                                    alt={product.title}
                                  />
                                  <img
                                    src={product.imgBack}
                                    alt={product.title}
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
                                  {product.brand}
                                </span>
                                <h5 style={{ minHeight: "60px" }}>
                                  <Link to={`/productdetail/${product._id}`}>
                                    {product.title}
                                  </Link>
                                </h5>
                              </div>
                              <div className="price-cart d-flex flex-column gap-2 justify-content-start gap-3">
                                <div className="d-flex justify-content-between">
                                  <p>
                                    <span>Size: </span> {product.size}
                                  </p>
                                  <p>
                                    <span>Price: Rs </span> {product.price}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  Add To Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </div>

            {/* Pagination */}
            <div style={{ marginTop: "20px" }}>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : isError ? (
                <h1>Error fetching data.</h1>
              ) : (
                <>
                  {data && data.totalPages > 1 && (
                    <nav className="pagination-container">
                      <ul className="pagination justify-content-center ">
                        <li
                          className={`page-item ${
                            currentPage === 1 && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">&laquo;</span>
                          </button>
                        </li>
                        {[...Array(data.totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 && "active"
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === data.totalPages && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-label="Next"
                          >
                            <span aria-hidden="true">&raquo;</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <!--section3--> */}
      <div className="section3-shop margin-div">
        <div className="container">
          <div className="row about-product">
            <div className="col-12 col-lg-9">
              <h4>Enjoy the Healthy Crunch of Nutritious Makhana?</h4>
              <p>
                Discover the goodness and crunch of Makhana, your guilt-free
                snack choice. Packed with nutrients and free from fat, added
                preservatives, and cholesterol, it's a treat for both taste buds
                and health. Unlike fried snacks, Makhana is roasted to
                perfection, retaining its natural crunch and goodness. With its
                low-calorie content and high nutritional value, Makhana makes
                for a smart snack option, ideal for those craving something
                delicious yet nutritious. Enjoy the satisfaction of munching on
                Makhana anytime, knowing you're making a healthy choice that
                supports your well-being. Treat yourself to the goodness of
                Makhana and indulge in a snack that cares for you.
              </p>
              <p>
                Enjoy the satisfaction of munching on Makhana anytime, knowing
                you're making a healthy choice that supports your well-being.
                Treat yourself to the goodness of Makhana and indulge in a snack
                that cares for you.
              </p>
            </div>
          </div>
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

      <Footer />
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
    </>
  );
}
