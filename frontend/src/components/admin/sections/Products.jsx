import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'




export default function Products() {
const[data,setData]=useState([])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/dataproducts`)
      .then((response) => {
        setData(response.data.products);
        console.log(response.data.products)
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <>
    <div className="user-container" style={{overflow:"scroll",height:"85vh"}}>
        <h1>All Products</h1>

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Products</strong>
                </div>
                <div className="table-responsive" >
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Size</th>
                        <th>Price </th>
                        <th>Brand </th>
                        <th>Tag </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data) => (
                        <tr key={data._id}>
                          <td>{data.title.toUpperCase()}</td>
                          <td>{data.size}</td>
                         
                          <td>{data.price}</td>
                          <td>{data.brand}</td>
                          <td>{data.tag}</td>
                         
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
   
    
    </>
  )
}
