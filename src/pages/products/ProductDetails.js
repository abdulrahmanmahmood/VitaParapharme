import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaPlus , FaMinus } from "react-icons/fa";
import logo from '../../images/Vita Logo2.png' ;
import { Link } from "react-router-dom";
import StarRating from "../rate/StarRating";
import ReviewDialog from "./ReviewDialog";
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavHeader from "../../components/NavHeader";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal , Button } from 'react-bootstrap';
import axios from "axios";
import { selectLanguage , selectTranslations} from "../../rtk/slices/Translate-slice";
import { Editor } from '@tinymce/tinymce-react';
import './ProductDetails.css';
import { baseUrl } from "../../rtk/slices/Product-slice";

function ProductDetails() {
  const navigate = useNavigate();
  const bearerToken = useSelector(selectToken);
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isUserLoggedIn = useSelector(selectToken) !== null;
  const language = useSelector(selectLanguage);
  const myapikey = "6kmsn4k5wmyibtzgdvtwd8yjp07gsvlcn6ffmiqkwkxub6fn";
  const [productDetailsHTML, setProductDetailsHTML] = useState('');
  const [aboutProductHTML, setAboutProductHTML] = useState('');
  const translations = useSelector(selectTranslations);
  const rating = selectedProduct && selectedProduct.rate;

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}/public/product/${productId}`, {
          headers: {
            
            'Accept-Language': language,
          },
        });
        const data = await response.json();
        setProductDetails(data.data.product);
        setSelectedProduct(data.data.product); 
        console.log('data is', data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  
 

  const [totalPrice, setTotalPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };
 

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const handleCloseModal = () => setShowModal(false);
  
  const dispatch = useDispatch();

  const handleAddToCart = async (productId, product) => {
    if (!isUserLoggedIn) {
      setModalMessage('please sign in first');
      setShowModal(true);
      return;
    }
  
    const cartItem = {
      productId: productId,
      quantity: quantity, 
    };

    try {
      const response = await axios.put(
        `${baseUrl}/user/cart/update`,
        cartItem,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
        }
      );
  
      setModalMessage('product added to cart');
      setShowModal(true);
      console.log('Product added to cart:', response.data);
  
    } 
  
     catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };


  const handleDetailsClick = (selectedProduct) => {
        
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };
const [detailsOpen, setDetailsOpen] = useState(false);





const [masterImage, setMasterImage] = useState(null);
const [smallImages, setSmallImages] = useState([]);
useEffect(() => {
  if (productDetails) {
    setMasterImage(productDetails.pictures[0]);
    setSmallImages(productDetails.pictures.slice(0));
  }
}, [productDetails]);

const handleImageClick = (src) => {
  setMasterImage(src);
};


useEffect(() => {
  if (productDetails) {
    setProductDetailsHTML(productDetails.productDetails);
    setAboutProductHTML(productDetails.aboutProduct);

    console.log('Product Details HTML:', productDetails.productDetails);
  }
}, [productDetails]);


  return (
    <div className="detailsPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
       
        handleProductClick={handleProductClick}
      />

        <div className="green-containerr">
          
          <div className="header-container flexContent">
            <div className="detailsflex">

            <div className="detailsflexabout">
            <div  className="flexnamerate">
                <div className="">
                  <h2>
                  {productDetails && productDetails.name}
                  
                  </h2>
                </div>
                
                <div className="ratenum">
  {selectedProduct && selectedProduct.rating !== undefined ? (
    <>
      <StarRating
        initialRating={selectedProduct.rating}
        isClickable={false}
      /> 
      <h5 style={{marginTop: '10px'}}>({selectedProduct.reviews})</h5>
    </>
  ) : (
    <p>Loading...</p>
  )}
</div>
                <div >
  {productDetails && productDetails.discount ? (
    <>
      <h2 className="discounted-price">{`$${productDetails.afterDiscount}`}</h2>
      <div style={{color:'white'}} className="old-price">{`$${productDetails.price}`}</div>
    </>
  ) : (
    <h2>{`$${productDetails && productDetails.price}`}</h2>
  )}
</div>

               
              </div>
              {/*<h1 style={{marginTop:'15px'}}>{translations[language]?.aboutpro} </h1>*/}
              <p style={{width: '100%' , wordWrap: 'break-word'}}>
              <div
    className="product-details-content"
    dangerouslySetInnerHTML={{ __html: aboutProductHTML }}
  />

              </p>
              
            </div>
            <div className="detailsfleximg">
        <div className="detailsIMG">
          <div className="master-img">
            {masterImage && <img src={masterImage} alt="Master" />}
          </div>
          <div className="small-images-container">
  {smallImages.map((smallImg, index) => (
    <div key={index} className="small-img" onClick={() => handleImageClick(smallImg)}>
      <img src={smallImg} alt={`Small ${index}`} />
    </div>
  ))}
</div>
        </div>

        <div className="detailsINFO">
              {/*<h1>{translations[language]?.productdet} </h1>*/}
              <p>
              <div
    className="product-details-content"
    dangerouslySetInnerHTML={{ __html: productDetailsHTML }}
  />
              </p>
            </div>
        </div>

            </div>
          </div>
          <div className="productFooter">
            <div className="header-container flexFooter">
              <div className="review">
                <button onClick={() => handleDetailsClick()}>Review</button>
              </div>
              <div className="middlefooter">
              
                
                <div >
                  
                  {productDetails ? ( 
             <h1>   {productDetails.price * quantity} $ </h1>
      ) : (
        <p>Loading...</p>
      )}
                  
                </div>
                <div className="counter">
                  <button style={{backgroundColor:'transparent' , color : 'white'}} onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button style={{backgroundColor:'transparent' , color : 'white'}} onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="review cart">
                <button onClick={() => handleAddToCart(productDetails.productId, productDetails)}>Add to Cart</button>
              </div>
            </div>
          </div>
          
        </div>
    
        <ReviewDialog
      isOpen={detailsOpen}
      onCancel={handleCancelDetails}
      productId={productId} 
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductDetails;

