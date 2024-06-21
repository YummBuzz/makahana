import React from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Paymentsuccess() {
  const [seachQuery] = useSearchParams();
  const referenceNum = seachQuery.get("reference");
  const paymentStatus = seachQuery.get("payment");

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success">
            <i class="ph ph-check-fat"></i>
              <h2> Your payment was successful </h2>
              <p>Reference No: <span style={{color:"#f26223"}}>{referenceNum}</span></p>
        <p>Payment Id: <span style={{color:"#f26223"}}>{paymentStatus}</span></p>
              <p>
                {" "}
                Thank you for your payment.
              </p>
              <Link to='/'>Home</Link>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}
