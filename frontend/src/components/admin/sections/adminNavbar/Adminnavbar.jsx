import React from 'react'
import { Link } from 'react-router-dom'

export default function Adminnavbar() {
  return (
    <>
    <Link to='/admindashboard/overview'>Overview</Link>
    <Link to='/admindashboard/products'>Products</Link>
    <Link to='/admindashboard/orders'>Orders</Link>
    
    </>
  )
}
