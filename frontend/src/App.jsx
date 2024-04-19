
import Navbar from "./components/Navbar/Navbar";
// bootstrap  imports
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// components imports
import Home from "./components/user/home/Home";
import About from "./components/user/about/About";
import Contact from "./components/user/contact/Contact";
import Error from "./components/user/error/Error";
import Login from "./components/user/auth/Login";
import Footer from "./components/user/footer/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="*" element={<Error/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
