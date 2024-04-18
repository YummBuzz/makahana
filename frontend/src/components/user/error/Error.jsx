import React from "react";
import './Error.css'
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <>
      <div className="mn-err d-flex justify-content-center align-items-center flex-column">
      <h1>OOPS! Something went wrong.</h1>
      <p class="zoom-area">
        <b>ERROR</b> 404 Page{" "}
      </p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <Link to=""
          class="more-link"
        >
          Visit the Home Page
        </Link>
      </div>
      </div>
    </>
  );
}
