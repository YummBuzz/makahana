import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function Message() {
    const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/allmessage`)
      .then((response) => {
        setData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <div className="user-container">
        <h1>All Message</h1>

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Message</strong>
                </div>
                <div className="table-responsive" >
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone </th>
                        <th className='w-40 overflow-scroll'>Message </th>
                        {/* <th>Id</th>
                        <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data) => (
                        <tr key={data._id}>
                          <td>{data.name.toUpperCase()}</td>
                          <td>{data.email}</td>
                         
                          <td>{data.contact}</td>
                          <td className="overflow-scroll" style={{width:"200px"}}>{data.message}</td>
                          
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
