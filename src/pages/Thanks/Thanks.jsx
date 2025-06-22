import React from "react";
import "./Thanks.css";

function Thanks() {
  return (
    <header className="bg-image-thanks">
      <div className="bg-opacity-thanks py-5 d-flex align-items-center">
        <div className="container px-4 px-lg-5 my-5 ">
          <div className="text-start text-white">
            <h1 className="display-2 fw-bolder">Cheers!</h1>
            <p className="display-5 fs-3">You will receive your order shortly</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Thanks;
