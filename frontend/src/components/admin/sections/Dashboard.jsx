import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Adminnavbar from './adminNavbar/Adminnavbar'
import Overview from './Overview'
import Products from './Products'
import Orders from './Orders'


export default function Dashboard() {

  return (
   <>
   <h1>Dashboard</h1>
   <Adminnavbar/>

   <Routes>

      <Route path='/overview' element={<Overview/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/orders' element={<Orders/>}/>
   </Routes>
   </>
  )
}
