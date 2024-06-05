import React from 'react'
import { Link } from 'react-router-dom'



export default function Products() {
  return (
    <>
    <div className="ad-container">
    <div className="hd-content d-flex justify-content-between align-items-center">
        <h1 >Product List</h1>
        <div className="d-block text-center card-footer">
                  
                 <Link to='/admindashboard/addproduct'> <button className="btn-wide btn btn-success">+ Add Product</button></Link>
                </div>
        </div>
    </div>
   
    
    </>
  )
}
