import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";


export default function About() {
  return (
   <>
   <Navbar pdScroll={0}/>
   <div className="about-page-section1 margin-div mt-5">
      <div className="container">
        <div className="row about-page-content">
          <div className="col-12 about-page-head">
            <h2>About <span> Us </span></h2>
          </div>
          <div className="col-12 col-lg-9">
            <p>
            Welcome to Wagini and Yumbuzz, where we bring you the joy of snacking with our delicious makhana treats! Our mission is to create snacks that are tasty and healthy. Makhana, also known as fox nuts, is a powerhouse of nutrition. It's rich in protein, low in calories, and packed with antioxidants, making it a perfect snack for everyone, from busy professionals to fitness enthusiasts.
            </p>
          </div>

          <div className="col-12 col-lg-9">
            <p>
            At Wagini and Yumbuzz, we believe in quality. That's why we carefully select the best makhana and prepare it with love and attention. Our snacks come in a variety of exciting flavors that cater to all taste preferences. Whether you crave something spicy or sweet, we have a delicious option.
            </p>
          </div>
          <div className="col-12">
            <img src="/banners/makhana-bg.jpg" className="img-fluid" />
          </div>
          <div className="col-12 col-lg-9 about-tag">
            <p>
            We are committed to providing you with a guilt-free snacking experience. Our makhana snacks are free from artificial additives and preservatives, ensuring you enjoy only the best nature has to offer. With Wagini and Yumbuzz, you can indulge in a delightful snack without compromising your health goals.
<br />
Join us in celebrating the joy of healthy snacking! Explore our delicious offerings and find out why Wagini and Yumbuzz are the go-to brands for makhana lovers everywhere. Indulge in a guilt-free treat that nourishes your body and delights your taste buds!
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   
   
   </>
  )
}
