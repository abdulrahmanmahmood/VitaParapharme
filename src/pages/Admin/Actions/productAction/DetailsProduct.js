import { useEffect, useState } from "react";
import myImg from '../../../../images/pharmacy2.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import './actionproduct.css';

function DetailsProduct() {

  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, Poster: file });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    axios
      .get(`https://mostafaben.bsite.net/api/Products/${params.productId}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

 return(
    <div className="product-details-container">
    <div className="product-image">
    {product.poster && (
  <img
    src={`data:image/png;base64,${product.poster}`}
    alt="Product poster"
   
    onError={(e) => console.error('Error loading image:', e)}
  />)}

    </div>
    <div className="product-info">
    <h2>{product.title}</h2>
      <h2>price : {product.price} $</h2>
      <h2>{product.description}</h2>
      <h2>category : {product.categoryId}</h2>
      <h2>rate : {product.rate}</h2>
    </div>
  </div>
 )
}

export default DetailsProduct;