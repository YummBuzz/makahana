import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Adminlist() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    // console.log(import.meta.env.VITE_APP_API_URL)
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/getalladmin`)
   

      .then((response) => {
        setData(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (e) => {
    setId(e);

    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/deleteadmin/${id}`).then((response) => {
      if (response.status === 200) {
        alert(response.data);
        console.log(response.data)
        setData(data.filter((data) => data._id !== id));
      }
      
       
     
     
    })
    .catch((error) => {
        // console.error(error);
        alert(error.response.data);
      });

    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="ad-container">
        <div className="hd-content d-flex justify-content-between">
          <h1>All Admin</h1>
          <div className="d-block text-center card-footer" style={{width:"280px"}}>
            <Link to="/admindashboard/accesspannel" >
              {" "}
              <button className="btn-wide btn btn-success" style={{width:"100%"}}>
                {" "}
                + Add New Admin
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="main-card mb-3 card">
              <div className="table-responsive">
                <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">Id</th>
                      <th>Name</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Last Logged In</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data) => (
                      <tr key={data._id}>
                        <td className="text-center text-muted">{data._id}</td>
                        <td>
                          <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left mr-3">
                                <div className="widget-content-left"></div>
                              </div>
                              <div className="widget-content-left flex2">
                                <div className="widget-heading">
                                  {data.username}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">{data.accesslevel}</td>
                        <td className="text-center">
                          {new Date(data.loginTime).toLocaleString()}
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            id="PopoverCustomT-1"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleDelete(data._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block", position: "absolute" }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Are you sure you want to delete ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDelete}>
                Close
              </Button>
              <Button variant="primary" onClick={confirmDelete}>
                Save changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
    </>
  );
}
