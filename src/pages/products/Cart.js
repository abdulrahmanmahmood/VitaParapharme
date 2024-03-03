import React from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import {  useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLanguage , selectLanguage , selectTranslations } from "../../rtk/slices/Translate-slice";
import logo from '../../images/Vita Logo2.png' ;
import { FaTrash } from "react-icons/fa";
import { setSearchTerm } from "../../rtk/slices/Search-slice";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { FaPlus , FaMinus } from "react-icons/fa";
import axios from "axios";
import { Modal  } from "react-bootstrap";
import './cart.css';
import WhatsAppIcon from "../../components/Whatsapp";
import email from "../../images/Email icon.png"
import address from "../../images/Location icon.png";
import phone from "../../images/phone icon.png";
import Footer from "../../components/Footer";
import { baseUrl } from "../../rtk/slices/Product-slice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  //const cart = useSelector(state => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantity, setQuantity] = useState(1);

  const cartProducts = useSelector((state) => state.cart);

  const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState('');
const [itemToDelete, setItemToDelete] = useState(null);
const [wishlist, setWishlist] = useState([]);

const handleCloseModal = () => setShowModal(false);



const handleDeleteFromCart = (productId) => {
  setModalMessage("Are you sure you want to delete this item from the cart?");
  setShowModal(true);
  setItemToDelete(productId);
};

const handleDeleteConfirmation = async () => {
  await handleDeleteItem(itemToDelete);
  setShowModal(false);
};

  
const handleIncrement = async (productId) => {
  setCart((prevCart) => {
    return prevCart.map((item) => {
      if (item.productId === productId) {
        const updatedQuantity = item.quantity + 1;
        const updatedPrice = totalPrice + item.productPrice; // Update total price
        setTotalPrice(updatedPrice); // Update total price state
        updateCartQuantity(productId, updatedQuantity); // Call function to update cart quantity
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
  });
};

const handleDecrement = async (productId) => {
  setCart((prevCart) => {
    return prevCart.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        const updatedQuantity = item.quantity - 1;
        const updatedPrice = totalPrice - item.productPrice; // Update total price
        setTotalPrice(updatedPrice); // Update total price state
        updateCartQuantity(productId, updatedQuantity); // Call function to update cart quantity
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
  });
};

const updateCartQuantity = async (productId, quantity) => {
  try {
    await axios.put(
      `${baseUrl}/user/cart/update`,
      { productId, quantity },
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
      }
    );
    console.log('Cart quantity updated successfully.');
  } catch (error) {
    console.error('Error updating cart quantity:', error.message);
  }
};


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

 /* const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );*/

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  /*const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);


  

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };*/
  

  const handleConfirmClick = () => {
    navigate('/order/confirm');
    
  };

  const [cart, setCart] = useState([]);

  const [promoCode, setPromoCode] = useState('');
  const bearerToken = useSelector(selectToken);
  const [numItems, setNumItems] = useState(0);

  const fetchUserCart = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/cart/my`, {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });

      const cartData = response.data.data;

      if (cartData && cartData.cart) {
        setCart(cartData.cart.cartItems || []);
        calculateTotalPrice(cartData.cart.cartItems);
        console.log('Success fetch carts', cartData.cart.cartItems);
      } else {
        console.error('Error fetching user cart: Unexpected response structure');
      }
      console.log('success fetch carts', response.data.data.cart.cartItems);
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };
  
  const handleDeleteItem = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/user/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Accept-Language': language,
        },
      });
      await fetchUserCart();
      console.log('success delete from cart ', productId);
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  const handleCancelDeletion = () => {
    setShowModal(false);
    setItemToDelete(null);
  };


  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.productPrice * item.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  };


  /*const handleAddToFavorites = async (productId) => {
    try {
      const response = await axios.put( 
        `http://195.35.28.106:8080/api/v1/user/wishlist/add/${productId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
        }
      );
      await handleDeleteFromCart(productId); 
      console.log('Response:', response.data); 
    } catch (error) {
      console.log('Error adding product to wishlist: ', error.message);
    }
  };*/

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };
  
  const handleAddToFavorites = async (productId) => {
    try {
      if (isProductInWishlist(productId)) {
        await handleDeleteFromWishlist(productId);
      } else {
        const response = await axios.put(
          `${baseUrl}/user/wishlist/add/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Content-Type": "application/json",
              "Accept-Language": language,
            },
          }
        );
        console.log("Response:", response.data); // Print the response data
        await fetchUserFavourite();
      }
    } catch (error) {
      console.log("Error adding product to wishlist: ", error);
    }
  };

  const handleDeleteFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `${baseUrl}/user/wishlist/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      );
      await fetchUserFavourite();
    } catch (error) {
      console.error("Error deleting product from wishlist:", error);
    }
  };

  const fetchUserFavourite = async () => {
  
    try {
      const response = await axios.get(`${baseUrl}/user/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });
  
      const favouriteData = response.data.data;
  
      if (favouriteData && favouriteData.wishlist) {
        setWishlist(favouriteData.wishlist.wishlistItems || []);
        console.log('Success fetch wishlist', favouriteData.wishlist.wishlistItems);
      } else {
        console.error('Error fetching user favourite: Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching user cart:', error);
    }
  };

  

  useEffect(() => {
    fetchUserCart();
    fetchUserFavourite();
  }, [language]);

  useEffect(() => {
    calculateTotalPrice(cart);
    if (cart.length > 0) {
      setQuantity(cart[0].quantity);
    }
  }, [cart]);
 

  const [updatedCart, setUpdatedCart] = useState([]);

  const handleSave = async (productId, product) => {
    
    const cartItem = {
      productId: productId,
      quantity: product.quantity, 
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
      await fetchUserCart();
      setQuantity(quantity);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId) => {
    // Toggle the selection state of the product
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  
  return(
    <div>
       <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        //filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
        cartNumber={cart.length}
      />

      <div className="green-containerr cartGreen ">
      <div className=" testtt">
      <WhatsAppIcon />
        <div className="header-container mt-[100px]">
          <div className="flexContainerCart">
          
          <div className="flexcart">
          {cart?.map((product) => (<div className="productcart" key={product.productId}>
              <div className="flexOnecart">
                <div className="imgcart">
                <Image
                  src={product.pictureUrl}
                  alt="Product poster"
                  style={{ width: '150px', height: '150px' , objectFit: 'contain' }}
  />
                </div>
                <div className="infocartone">
                  <div  className="namecart" ><h4>{product.productName}</h4></div>
                  <h5>{product.productPrice}$</h5>
                  <h5>{translations[language]?.quantity} : {product.quantity}</h5>

                  <div className="countercart">
                  <button
    style={{ backgroundColor: '#3EBF87', color: 'white' }}
    onClick={() => handleDecrement(product.productId)}
  >
    <FaMinus />
  </button>
  <span>{product.quantity}</span>
  <button
    style={{ backgroundColor: '#3EBF87', color: 'white' }}
    onClick={() => handleIncrement(product.productId)}
  >
    <FaPlus />
  </button>
  
                </div>
                </div>
                <div className="infocarttwo">
                  <div className="namecart" >
                  
              <FaTrash style={{color: 'red' , fontSize:'20px'}} 
              onClick={() => handleDeleteFromCart(product.productId)}/>
                  </div>
                  <div className="namecart" >
                  
              <FaHeart 
              style={{ color: isProductInWishlist(product.productId) ? 'red' : '#3EBF87' }}
              onClick={() => handleAddToFavorites(product.productId)} />
                  </div>
                  
                  {/*<button onClick={() => console.log("Selected products:", selectedProducts)}>
                    Checkout
  </button>*/}

                  
                </div>
              </div>
            </div> ))}
          </div>
          <div className="total">
          <h4>{translations[language]?.totalprice} {totalPrice.toFixed(2)}</h4>
              
              <button className="confirmbtn" onClick={handleConfirmClick}>{translations[language]?.confirm}</button>
            </div>
            </div>
        </div>
      </div>
      <Footer />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDeletion}>
            No
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
}

export default Cart;




