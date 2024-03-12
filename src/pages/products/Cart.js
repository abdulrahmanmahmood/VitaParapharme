import React from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import logo from "../../images/Vita Logo2.png";
import { FaTrash } from "react-icons/fa";
import { setSearchTerm } from "../../rtk/slices/Search-slice";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { FaHeart } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./cart.css";
import WhatsAppIcon from "../../components/Whatsapp";
import email from "../../images/Email icon.png";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(1);

  const cartProducts = useSelector((state) => state.cart);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );
      console.log("Cart quantity updated successfully.");
    } catch (error) {
      console.error("Error updating cart quantity:", error.message);
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

  const [cart, setCart] = useState([]);

  const [promoCode, setPromoCode] = useState("");
  const bearerToken = useSelector(selectToken);
  const [numItems, setNumItems] = useState(0);
  const [confirmDisabled, setConfirmDisabled] = useState(true); // State to control the disabled status of the confirm button

  const fetchUserCart = async () => {
    try {
      const response = await axios.get(`${baseUrl}/user/cart/my`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });

      const cartData = response.data.data;

      if (cartData && cartData.cart) {
        setCart(cartData.cart.cartItems || []);
        calculateTotalPrice(cartData.cart.cartItems);
        console.log("Success fetch carts", cartData.cart.cartItems);
      } else {
        console.error(
          "Error fetching user cart: Unexpected response structure"
        );
      }
      console.log("success fetch carts", response.data.data.cart.cartItems);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      await axios.delete(`${baseUrl}/user/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      await fetchUserCart();
      console.log("success delete from cart ", productId);
    } catch (error) {
      console.error("Error deleting product from cart:", error);
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
      await axios.delete(`${baseUrl}/user/wishlist/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
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
        console.log(
          "Success fetch wishlist",
          favouriteData.wishlist.wishlistItems
        );
      } else {
        console.error(
          "Error fetching user favourite: Unexpected response structure"
        );
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
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
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      console.log("Product added to cart:", response.data);
      await fetchUserCart();
      setQuantity(quantity);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleConfirmClick = () => {
    // Handle the confirm click only if the checkbox is checked
    if (isCheckboxChecked) {
      navigate("/order/confirm");
    }
  };

  // Set the confirm button disabled state based on the checkbox state
  const confirmButtonDisabled = !isCheckboxChecked;

  return (
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
          {cart.length === 0 ? (
            <div className="text-center mt-[30%] ">
              <p>
                {translations[language]?.CartEmpty}{" "}
                <Link to="/store">{translations[language]?.here}</Link>.
              </p>
            </div>
          ) : (
            <div className="mt-[200px] w-[95%] lg:w-[90%] mx-auto ">
              <div className="flex flex-col lg:flex-row  justify-between">
                <div className="">
                  {cart?.map((product) => (
                    <div
                      className="w-full lg:w-110 h-30 bg-white border-1 border-solid border-gray-300 text-black shadow-2xl items-center p-3 text-center  rounded-[50px] mx-auto my-3 "
                      key={product.productId}
                    >
                      <div className="flex flex-col lg:flex-row gap-3  ">
                        <div className="flex flex-row relative w-full lg:w-[280px] h-[190px] ">
                          <div className="bg-[#3EBF87] w-[150px] h-[150px] rounded-full mx-auto" />
                          <Image
                            src={product.pictureUrl}
                            alt="Product poster"
                            className="right-20 absolute lg:right-14  rounded-full w-[140px] h-[120px] top-[5%] object-contain"
                          />
                        </div>
                        <div className="w-full lg:w-[50%] text-center pt-3 ">
                          <div className="text-center uppercase text-[#3EBF87] font-bold">
                            <h4>{product.productName}</h4>
                          </div>

                          <h5 className="text-center lg:text-left ml-2 my-3 text-[#696767] text-3xl font-bold leaading-9 font-inter ">
                            {product.productPrice}
                            {translations[language]?.currency}
                          </h5>
                          <h5 className="text-[#696767] text-center lg:text-left my-2">
                            {translations[language]?.quantity} :{" "}
                            {product.quantity}
                          </h5>

                          <div className="flex flex-row w-[30%] mx-auto  lg:w-[95%]  justify-between text-left mt-2 p-2 lg:ml-2 ">
                            <button
                              className="bg-[#3EBF87] text-white p-1 rounded "
                              onClick={() => handleDecrement(product.productId)}
                            >
                              <FaMinus />
                            </button>
                            <span>{product.quantity}</span>
                            <button
                              className="bg-[#3EBF87] text-white p-1 rounded "
                              style={{
                                color: "white",
                              }}
                              onClick={() => handleIncrement(product.productId)}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                        <div className="absolute lg:static right-2">
                          <div className="">
                            <FaTrash
                              className="text-[#B3B8B8] text-2xl  my-3"
                              onClick={() =>
                                handleDeleteFromCart(product.productId)
                              }
                            />
                          </div>
                          <div className=" mr-2  absolute">
                            <FaHeart
                              style={{
                                color: isProductInWishlist(product.productId)
                                  ? "red"
                                  : "#3EBF87",
                              }}
                              onClick={() =>
                                handleAddToFavorites(product.productId)
                              }
                              className="text-xl "
                            />
                          </div>

                          {/*<button onClick={() => console.log("Selected products:", selectedProducts)}>
                    Checkout
  </button>*/}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" w-[100%] lg:w-[35%]  h-[400px] bg-white items-center relative mt-[15px] mr-[15px] shadow-md rounded-tr-[100px] rounded-bl-[100px] p-2">
                  <h4 className="m-3 text-[#3ebf87]">
                    {translations[language]?.totalprice}:
                  </h4>
                  <h4 className="text-center text-[#3ebf87]">
                    {totalPrice.toFixed(2)} {translations[language]?.currency}
                  </h4>

                  <h5 className="text-[#3ebf87] font-bold mt-3">
                    {translations[language]?.paiement}
                  </h5>
                  <p className="text-[#3ebf87]   ">
                    {translations[language]?.personal}
                    <span className="text-xlg font-bold text-[#3ebf87]">
                      <Link
                        to="/privacy-policy"
                        className="text-2xlg font-bold text-[#5e9ff9] no-underline m-1"
                      >
                        {translations[language]?.privacypolicy}
                      </Link>
                    </span>
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      onChange={handleCheckboxChange}
                      checked={isCheckboxChecked}
                    />

                    <label
                      htmlFor="agreeTerms"
                      className="ml-2 text-[#3ebf87] font-bold"
                    >
                      {translations[language]?.agree}{" "}
                      <Link
                        to="/terms"
                        className="text-xlg font-bold text-[#5e9ff9] no-underline"
                      >
                        {translations[language]?.termsand}{" "}
                      </Link>{" "}
                      {translations[language]?.and}{" "}
                      <Link
                        to="/terms"
                        className="text-xlg font-bold text-[#5e9ff9] no-underline"
                      >
                        {translations[language]?.privacypolicy}{" "}
                      </Link>
                    </label>
                  </div>

                  <button
                    className="uppercase absolute text-2xl  bg-[#3ebf87] text-white w-50 h-10 rounded-3xl right-10 bottom-6"
                    onClick={handleConfirmClick}
                    disabled={confirmButtonDisabled}
                  >
                    {translations[language]?.confirm}
                  </button>
                </div>
              </div>
            </div>
          )}
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
