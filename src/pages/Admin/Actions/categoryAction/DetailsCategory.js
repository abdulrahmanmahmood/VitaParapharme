import { useEffect, useState } from "react";
import myImg from '../../../../images/pharmacy2.jpg';
import './actionCategory.css';

function DetailsCategory() {

 return(
    <div className="product-details-container">
    <div className="product-image">
      <img src={myImg} alt="Product" />
    </div>
    <div className="product-info">
    <h2>Product Name</h2>
      <h2>category</h2>
      <p>Description of the product goes here Description of the product goes hereDescription of the product goes here Description of the product goes here Description of the product goes here Description of the product goes here.</p>
    </div>
  </div>
 )
}

export default DetailsCategory;