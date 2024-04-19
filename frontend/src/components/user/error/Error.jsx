import React from "react";
import './Error.css'
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <div className="mn-err d-flex justify-content-center align-items-center flex-column">
      <h1>OOPS! Something went wrong.</h1>
      <p className="zoom-area">
        <b>ERROR</b> 404 Page!{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to=""
          className="more-link"
        >
          Visit the Home Page
        </Link>
      </div>
      </div>
    </>
  );
}
