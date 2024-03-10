import React, { useEffect, useState } from "react";
import "./stylehome.css";

import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import Slider from "./slider/Slider";
import StarRating from "./rate/StarRating";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Shipe from "../images/Shipe.png";

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import {
  fetchProducts,
  selectProducts,
  selectProductIds,
} from "../rtk/slices/Product-slice";
//import {  removeFromWishlist } from '../rtk/slices/Wishlist-slice';
//import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from "./products/DetailsDialog";
import { addToCart, deleteFromCart } from "../rtk/slices/Cart-slice";
//import { clearWishlist } from '../rtk/slices/Wishlist-slice';
import { clearCart } from "../rtk/slices/Cart-slice";
import { logoutAction, setAuthData } from "../rtk/slices/Auth-slice"; // Assuming your auth slice includes setAuthData
import NavHeader from "../components/NavHeader";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { jwtDecode } from "jwt-decode";
//import { loadWishlistFromStorage } from '../rtk/slices/Wishlist-slice';
import { setSearchTerm } from "../rtk/slices/Search-slice";
import { selectUserId } from "../rtk/slices/User-slice";
//import { addToWishlist } from '../rtk/slices/Wishlist-slice';
import {
  addToWishlist,
  removeFromWishlist,
} from "../rtk/slices/Wishlist-slice";
import { clearWishlist } from "../rtk/slices/Wishlist-slice";
import HorizontalScroll from "../components/Carousel";
import { selectToken } from "../rtk/slices/Auth-slice";
import { Modal, Button } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppIcon from "../components/Whatsapp";
import Dropdown from "react-bootstrap/Dropdown";
import Advertesment from "../components/Advertesment";
import Footer from "../components/Footer";
import { baseUrl } from "../rtk/slices/Product-slice";

function Home() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);
  const [isUserLoggedInState, setIsUserLoggedInState] = useState(isLoggedIn);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const userId = useSelector((state) => state.auth.id);
  const bearerToken = useSelector(selectToken);
  const isUserLoggedIn = useSelector(selectToken) !== null;
  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const [mainCategory, setMainCategory] = useState([]);
  const [selectedMainCat, setSelectedMainCat] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState(0);
  const [productsWithMainCat, setProductsWithMainCat] = useState([]);
  const [productsWithSubCat, setProductsWithSubCat] = useState([]);
  const [mainCategoryText, setMainCategoryText] = useState(
    translations[language]?.main
  );
  const [subCategoryText, setSubCategoryText] = useState(
    translations[language]?.sub
  );

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };
  const direction = useSelector((state) => state.translation.direction);

  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    fetchUserFavourite();
    console.log("CART", cart);
    fetchMianCategory();
    setMainCategoryText(
      translations[language]?.main || translations["en"]?.main
    );
    setSubCategoryText(translations[language]?.sub || translations["en"]?.sub);
  }, [language, translations]);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const getCart = () => {};

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const handleAddToFavorites = async (productId) => {
    try {
      if (!isUserLoggedIn) {
        setModalMessage("please sign in first");
        setShowModal(true);
        return;
      }
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

  const handleAddToCart = async (productId, product) => {
    if (!isUserLoggedIn) {
      setModalMessage("please sign in first");
      setShowModal(true);
      return;
    }

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
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      setModalMessage("product added to cart");
      setShowModal(true);
      console.log("Product added to cart:", response.data);
      dispatch(addToCart(productId));
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
  };

  const [favoriteStatus, setFavoriteStatus] = useState(
    JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {}
  );

  const saveFavoritesToLocalStorage = (userId, favorites) => {
    const userFavorites =
      JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {};
    localStorage.setItem(
      `favorites_${userId}`,
      JSON.stringify({ ...userFavorites, ...favorites })
    );
  };

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {};
    setFavoriteStatus(savedFavorites);
  }, [userId]);

  const handleDetailsClick = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const rating = selectedProduct ? selectedProduct.rate : 0;

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };
  const fetchMianCategory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/public/main/category/all`, {
        headers: {
          "Accept-Language": language,
        },
      });
      console.log("success in fetching main Categoryies ", response.data.data);
      setMainCategory(response.data.data.mainCategories);
    } catch (error) {
      console.log("error in fetching main Category", error);
    }
  };
  const fetchSubCategory = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/main/category/${id}`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      console.log(
        "success in fetching Sub Categoryies ",
        response.data.data.categories
      );
      setSubCategory(response.data.data.categories);
    } catch (error) {
      console.log("error in fetching Sub Category", error);
    }
  };
  const fetchProductsByMainCat = async (MC) => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/product/main/category/${MC}`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      console.log(
        "success in fetching Products with Main Category ",
        response.data.data
      );
      setProductsWithMainCat(response.data.data.products);
    } catch (error) {
      console.log("error in fetching Products with Main Category", error);
    }
  };
  const fetchProductsBySubCat = async (MC) => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/product/category/${MC}`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      console.log(
        "success in fetching Products with Sub Category ",
        response.data.data
      );
      setProductsWithSubCat(response.data.data.products);
    } catch (error) {
      console.log("error in fetching Products with Sub Category", error);
    }
  };
  const handleMainCatSelect = (id, name) => {
    console.log("Selected main Category id:", id);
    fetchProductsByMainCat(id);
    fetchSubCategory(id);
    setSelectedMainCat(id);
    setMainCategoryText(name);
  };
  const handleSubCatSelect = (id, name) => {
    console.log("Selected Sub Category id:", id);
    fetchProductsBySubCat(id);
    setSelectedSubCat(id);
    setSubCategoryText(name);
  };
  const handleDeleteFilters = () => {
    setSelectedMainCat(0);
    setSelectedSubCat(0);
    setSubCategoryText("Sub Category");
    setMainCategoryText(translations[language]?.main);
  };

  return (
    <div className="     w-full">
      <div className="page-container ">
        <NavHeader
          userId={userId}
          searchTermm={searchTerm}
          handleSearchChange={handleSearchChange}
          //filteredProductss={filteredProducts}
          handleProductClick={handleProductClick}
        />

        <div className="green-containerr mt-[80px]">
          <div className="home-containerr testtt">
            <WhatsAppIcon />
            <Slider />

            <div
              className="lg:titleProduct text-center p-2 mx-auto w-[90%] h-[150px] my-10"
              style={{
                backgroundImage: `url(${Shipe})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className="text-2xl mt-4 font-bold">
                {translations[language]?.magasin}
              </h1>
              <h2 className="text-xl">{translations[language]?.learnmore}</h2>
            </div>
            {loading && (
              <div
                className="loading-spinner"
                style={{ width: "50px", height: "50px", marginTop: "10px" }}
              ></div>
            )}

            {!loading && selectedMainCat === 0 && selectedSubCat === 0 && (
              <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 ">
                {products.map((product) => (
                  <div
                    style={{}}
                    className="relative w-[350px] h-[420px] lg:w-[370px] lg:h-[420px] mx-auto mt-5 bg-white p-2 rounded-2xl text-center "
                    key={product.id}
                  >
                    <div className="">
                      <div className="flex flex-col absolute right-4 top-4 gap-2">
                        <div className="w-10 h-10 bg-white border-1 border-solid border-gray-300 text-black shadow-2xl items-center p-2.5 overflow-hidden text-center  rounded-full">
                          {" "}
                          <FaHeart
                            onClick={() =>
                              handleAddToFavorites(product.productId)
                            }
                            style={{
                              color: isProductInWishlist(product.productId)
                                ? "red"
                                : "#3EBF87",
                            }}
                            className="text-center  text-xl"
                          />
                        </div>
                        <div className="w-10 h-10 bg-white border-1 border-solid border-gray-300 text-black shadow-2xl items-center p-2  overflow-hidden text-center  rounded-full">
                          <FaEye
                            onClick={() => handleDetailsClick(product)}
                            className="text-[#3EBF87]   text-2xl text-center    "
                          />
                        </div>
                      </div>

                      <div className="w-[70%] h-[70%] text-center items-center mx-auto  my-3">
                        <Link to={`/home/product/${product.productId}`}>
                          <img
                            src={product.pictures[0]}
                            alt="Product poster"
                            className="object-fill  w-[200px] h-[200px] mx-auto my-auto "
                          />
                        </Link>
                      </div>
                      <div className=" ">
                        <h2 className="text-[#3EBF87] tex-[20px] line-clamp-1">
                          {product.name}
                        </h2>

                        <div className="w-[40%] ml-5 flex flex-row">
                          <StarRating
                            initialRating={product.rating}
                            isClickable={false}
                          />
                          <h5>({product.reviews})</h5>
                        </div>
                        <div className="flex flex-row justify-between w-[98%] mx-auto text-[#696767]">
                          {product.discount && (
                            <div className="mx-3 text-xl my-1">
                              {product.afterDiscount} $
                            </div>
                          )}
                          {product.discount && (
                            <div className="line-through text-gray-400 mx-3 text-xl my-1">
                              {product.price} $
                            </div>
                          )}
                          {!product.discount && (
                            <div className=" mx-3 text-xl my-1">
                              {product.price} $
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        className="p-3 w-[60%] h-15 ml-auto bg-[#61DAA2] text-white rounded-2xl"
                        onClick={() =>
                          handleAddToCart(product.productId, product)
                        }
                      >
                        add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="w-fulll items-center text-center">
              <button
                className="bg-[#61DAA2] lg:w-25 lg:h-25 items-center text-center mx-auto mt-10 p-5 text-white text-2xl font-bold rounded-3xl"
                onClick={() => navigate("/store")}
              >
                {translations[language]?.showMore}
              </button>
            </div>
            <div
              className="lg:titleProduct text-center p-2 mx-auto lg:w-[60%] lg:h-[150px] w-full  my-20"
              style={{
                backgroundImage: `url(${Shipe})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className="font-bold my-3 text-3xl">
                {translations[language]?.popular}
              </h1>
              <h2 className="font-bold my-3 text-2xl">
                {translations[language]?.featured}
              </h2>
            </div>
            <Advertesment cursor={"grabbing"} />
          </div>

          <Footer />
        </div>
        <DetailsDialog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
          product={selectedProduct}
          rating={rating}
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
      <div className="text-center text-[#70CCDA] ">
        Copyright © 2023 ET VITAPARA | Propulsé par ET VITAPARA
      </div>
    </div>
  );
}

export default Home;
