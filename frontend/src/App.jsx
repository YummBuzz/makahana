// bootstrap  imports
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useEffect, useState } from "react";
import Activitytracker from "./components/Activitytracker";

// components imports

const Home = lazy(() => import("./components/user/home/Home"));
const About = lazy(() => import("./components/user/about/About"));
const Contact = lazy(() => import("./components/user/contact/Contact"));
const Error = lazy(() => import("./components/user/error/Error"));
const Login = lazy(() => import("./components/user/auth/Login"));
const Register= lazy(()=>import('./components/user/auth/Register'))
const Forget= lazy(()=> import('./components/user/auth/Forgetpassword'))
const Reset =lazy(()=>import('./components/user/auth/Resetpassword'))
// const Footer = lazy(()=> import('./components/user/footer/Footer'));
// const Navbar = lazy(()=> import('./components/Navbar/Navbar'));

// admin components import
const Adminlogin = lazy(() => import("./components/admin/Auth/Login"));
const Admindashboard = lazy(() =>
  import("./components/admin/sections/Dashboard")
);

function App() {

  const isAdminLoggedIn = window.localStorage.getItem("adminloggedIn");

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/" || !isAdminLoggedIn) {
      window.localStorage.clear();
    }

    const fetchUserId = () => {
      const storedUserId = localStorage.getItem("admin");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    fetchUserId(); // Initial fetch
    const intervalId = setInterval(fetchUserId, 5000); // Check for userId every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  });

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          {/* {adminPath || isAdminLoggedIn ? null : <Navbar />} */}

          <Routes>
            <Route path="" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
            <Route path="login" element={<Login />} />
            <Route path="adminpanel" element={<Adminlogin />} />
            <Route path="admindashboard/*" element={<Admindashboard />} />
            <Route path="register" element={<Register/>}/>
            <Route path="forget-password" element={<Forget/>}/>
            <Route path="reset-password" element={<Reset/>}/>
          </Routes>
          {/* <Footer/> */}
          <Activitytracker userId={userId} />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
