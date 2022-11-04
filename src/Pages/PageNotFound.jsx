import React from "react";
import Sadface from "../assets/Image/Sad face.jpg";

function PageNotFound() {
  return (
    <div>
        <img src={Sadface} alt="sad face" className="sad-face"/>
      <h1>Opps <br></br>Page Not Found</h1>
    </div>
  );
}

export default PageNotFound;