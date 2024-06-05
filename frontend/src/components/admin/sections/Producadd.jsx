import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Producadd() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setStatus(100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/adminregister`,
        formData
      );

      setResult(response.data);
      setStatus(response.status);
    } catch (error) {
      setResult(error.response.data);
      setStatus(error.response.status);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes
    }
  };

  return (
    <>
      <div className="ad-container">
        <div className="hd-content d-flex justify-content-between align-items-center">
          <div className="d-block text-center card-footer">
            <Link to="/admindashboard/products">
              {" "}
              <button className="btn-wide btn btn-success">
                {" "}
                &#8592; Back
              </button>
            </Link>
          </div>
          {/* <h1>Add Product</h1> */}
        </div>
        
        <div  style={{width:"100%"}}>
          <form onSubmit={handleSubmit} className="d-flex justify-content-evenly flex-wrap flex-row">
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="esku" className="form-label">
                Esku:
              </label>
              <input
                type="text"
                placeholder=" esku*:"
                value={formData.esku}
                name="esku"
                onChange={handleChange}
                required
                className="form-control"
                id="esku"
              />
            </div>

            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="cat" className="form-label">
                Cat:
              </label>
              <input
                type="text"
                placeholder="Cat*:"
                value={formData.cat}
                name="cat"
                onChange={handleChange}
                required
                className="form-control"
                id="cat"
              />
            </div> */}
            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="art_no" className="form-label">
                Art No:
              </label>
              <input
                type="text"
                placeholder="Art No*:"
                value={formData.art_no}
                name="art_no"
                onChange={handleChange}
                required
                className="form-control"
                id="art_no"
              />
            </div>
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="color" className="form-label">
                Color:
              </label>
              <input
                type="text"
                placeholder="Color*:"
                value={formData.color}
                name="color"
                onChange={handleChange}
                required
                className="form-control"
                id="color"
              />
            </div> */}
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                placeholder="title*:"
                value={formData.title}
                name="title"
                onChange={handleChange}
                required
                className="form-control"
                id="title"
              />
            </div>
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="long_desc" className="form-label">
                Long_desc:
              </label>
              <input
                type="text"
                placeholder="long_desc*:"
                value={formData.long_desc}
                name="long_desc"
                onChange={handleChange}
                required
                className="form-control"
                id="long_desc"
              />
            </div>
            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="material" className="form-label">
                Material:
              </label>
              <input
                type="text"
                placeholder="material*:"
                value={formData.material}
                name="material"
                onChange={handleChange}
                required
                className="form-control"
                id="material"
              />
            </div> */}
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="ribbon" className="form-label">
                Ribbon:
              </label>
              <input
                type="text"
                placeholder="ribbon*:"
                value={formData.ribbon}
                name="ribbon"
                onChange={handleChange}
                required
                className="form-control"
                id="ribbon"
              />
            </div>
            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="collection" className="form-label">
                Collection:
              </label>
              <input
                type="text"
                placeholder="collection*:"
                value={formData.collection}
                name="collection"
                onChange={handleChange}
                required
                className="form-control"
                id="collection"
              />
            </div> */}
            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="sleeve" className="form-label">
                Sleeve:
              </label>
              <input
                type="text"
                placeholder="sleeve*:"
                value={formData.sleeve}
                name="sleeve"
                onChange={handleChange}
                required
                className="form-control"
                id="sleeve"
              />
            </div>
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="pocket" className="form-label">
                Pocket:
              </label>
              <input
                type="text"
                placeholder="pocket*:"
                value={formData.pocket}
                name="pocket"
                onChange={handleChange}
                required
                className="form-control"
                id="pocket"
              />
            </div> */}
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="mop" className="form-label">
                Mop:
              </label>
              <input
                type="text"
                placeholder="mop*:"
                value={formData.mop}
                name="mop"
                onChange={handleChange}
                required
                className="form-control"
                id="mop"
              />
            </div>
            <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="mrp" className="form-label">
                Mrp:
              </label>
              <input
                type="text"
                placeholder="mrp*:"
                value={formData.mrp}
                name="mrp"
                onChange={handleChange}
                required
                className="form-control"
                id="mrp"
              />
            </div>
            {/* <div className="mb-3" style={{width:"40%"}}>
              <label htmlFor="type" className="form-label">
                Type:
              </label>
              <input
                type="text"
                placeholder="type*:"
                value={formData.type}
                name="type"
                onChange={handleChange}
                required
                className="form-control"
                id="type"
              />
            </div> */}

            <button
            style={{width:"87%"}}
              type="submit"
              disabled={
                loading ||
                !formData.username ||
                !formData.password ||
                !formData.accesslevel
              }
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>

          <div className="mt-3">
            {status === 200 && <Alert variant="success">{result}</Alert>}
            {status === 400 || status == 401 ? (
              <Alert variant="danger">{result}</Alert>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
