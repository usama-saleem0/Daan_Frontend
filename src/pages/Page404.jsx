import React, { useState } from "react";
import Page404gif from '../../src/assets/giphy.gif'
import StarsCanvas from "../canva/Stars";
import { Link } from "react-router-dom";
const Page404 = () => {

  return (
    <>
    <section className="Page404-sec">
      <div className="main-Page404-box">
        <div className="Page404-tital">
          <p>Ongeschreven Leven</p>
          <h3>We have a problem</h3>
          <h2>404</h2>
          <h3>Page Not Found</h3>
          <Link to="/" style={{ textDecoration: "none" }}>
         
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
  <path d="M0.325817 9.2196L9.41557 0.31951C9.62581 0.113495 9.90645 0 10.2057 0C10.5049 0 10.7856 0.113495 10.9958 0.31951L11.6652 0.974789C12.1008 1.40178 12.1008 2.09576 11.6652 2.52209L4.03233 9.99585L11.6737 17.4779C11.8839 17.6839 12 17.9586 12 18.2514C12 18.5446 11.8839 18.8192 11.6737 19.0254L11.0043 19.6805C10.7939 19.8865 10.5134 20 10.2142 20C9.91492 20 9.63428 19.8865 9.42404 19.6805L0.325817 10.7723C0.115084 10.5656 -0.000660896 10.2897 2.86102e-06 9.99634C-0.000660896 9.70187 0.115084 9.4261 0.325817 9.2196Z" fill="black"/>
</svg>
          Back To Home

          </button>
          </Link>
        </div>

        <div className="Page404-gif">
          <img src={Page404gif} alt="" />
        </div>
      </div>
      <div className="canva-box">
<StarsCanvas/>

</div>
    </section>

    </>
  );
};

export default Page404;
