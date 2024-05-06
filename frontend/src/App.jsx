

// bootstrap  imports
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense,lazy } from "react";
import { useEffect } from "react";

// components imports

const Home = lazy(() => import('./components/user/home/Home'));
const About = lazy(()=> import('./components/user/about/About'));
const Contact = lazy(()=> import('./components/user/contact/Contact'));
const Error = lazy(()=> import('./components/user/error/Error'));
const Login = lazy(()=> import('./components/user/auth/Login'));
const Footer = lazy(()=> import('./components/user/footer/Footer'));
const Navbar = lazy(()=> import('./components/Navbar/Navbar'));



// admin components import
const Admin = lazy( ()=>import('./components/admin/Admin'))

function App() {
  const adminPath = window.location.pathname === '/adminpanel';
 
  const isAdminLoggedIn = window.localStorage.getItem("adminloggedIn");


  useEffect(() => {
      
    if (window.location.pathname === '/' || !isAdminLoggedIn) {
      
      window.localStorage.clear();
    }

 
}, []);
  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        {adminPath || isAdminLoggedIn ? null : <Navbar />}
        <Routes>
        
				

          <Route path="" element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="*" element={<Error/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="adminpanel" element={<Admin/>}/>
          
        </Routes>
        <Footer/>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
