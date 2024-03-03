import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addToWishlist, removeFromWishlist } from '../rtk/slices/Product-slice';
import { Button, Container, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../rtk/slices/Auth-slice';
import { Link } from 'react-router-dom';
import StarRating from './rate/StarRating';
import { FaEye } from 'react-icons/fa';
import DetailsDialog from './products/DetailsDialog';
import axios from 'axios';
import { FaWhatsapp } from 'react-icons/fa';
import WhatsAppIcon from '../components/Whatsapp';
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { setLanguage , selectTranslations , selectLanguage} from '../rtk/slices/Translate-slice';
import Footer from '../components/Footer';
import { baseUrl } from '../rtk/slices/Product-slice';


function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleDetailsClick = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setDetailsOpen(true);
  };
  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  const [wishlist, setWishlist] = useState([]);

  const bearerToken = useSelector(selectToken);

  const rating = selectedProduct ? selectedProduct.rate : 0;


  const fetchUserFavourite = async () => {
    try {
      
  
      const response = await axios.get(
        `${baseUrl}/user/wishlist/my`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      const favouriteData = response.data.data; 
      
      if (favouriteData && favouriteData.wishlist) {
        setWishlist(favouriteData.wishlist.wishlistItems || []); 
        console.log('Success fetch wishlist', favouriteData.wishlist.wishlistItems);
      } else {
        console.error('Error fetching user favourite: Unexpected response structure');
      }
      console.log('success fetch wishlost' , response.data.data.wishlist.wishlistItems);
    
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  const handleDeleteFromWishlist = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/user/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });
      await fetchUserFavourite();
      console.log('success delete from wishlist ' , productId);
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId, product) => {
   
  
    const cartItem = {
      productId: productId,
      quantity: 1, 
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
  
      console.log('Product added to cart:', response.data);
  
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  useEffect(() => {
   
    fetchUserFavourite();
  }, []);

  return (
    <div className="wishlistContainer">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      
      <Container style={{ marginTop: '50px' }}>
      <div className=" testtt">
      <WhatsAppIcon />


          <div className="card-store">
        {wishlist.map((product) => (
          <div className="cards " key={product.productId}>
            <div className="card-body">
            <div className="card-icons">
           
            <FaHeart 
            onClick={() => handleDeleteFromWishlist(product.productId)}
            style={{ color: 'red'}} />
          

           <FaEye className="cart-iconPro"
                 onClick={() => handleDetailsClick(product)}
               /> 
                              

              </div>
              <div className="card-imgstore" >
              
              <Link to={`/home/product/${product.productId}`}>
          <img src={product.pictureUrl} alt="Product poster" />
        </Link>
                  
              </div>
              <div className='card-info card-infoStore'>
                <h2>{product.productName}</h2>
                
                <div className='rate'>
                
               <StarRating
                           initialRating={product.rating}
                          isClickable={false}
                        /> 
  
                </div>
                <div className="price">
          {product.discount && (
            <div className="discounted-price">{`$${product.afterDiscount}`}</div>
          )}
          {product.discount && <div className="old-price">{`$${product.productPrice}`}</div>}
          {!product.discount && <div className="price">{`$${product.productPrice}`}</div>}
        </div>
              </div>
              <button
  className="proBtn"
  onClick={() => handleAddToCart(product.productId, product)}
>
  add to cart
</button>
              
             
            </div>
          </div>
        ))}
          </div>
          </div>

      </Container>
      <Footer />
      <DetailsDialog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
          product={selectedProduct}
          rating = {rating}
       />
    </div>
   
  );
}

export default Wishlist;


