import React, { useRef } from "react";
import logo from "../images/Vita Logo2.png";
import loginimg from "../images/loginIcon.png";
import logoutimg from "../images/logouticon.png";
import cartimg from "../images/Cart.png";
import product from "../images/product.png";
import { FaSearch } from "react-icons/fa";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import { fetchProducts } from "../rtk/slices/Product-slice";
import { setToken } from "../rtk/slices/Auth-slice";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "./navheader.css";
import SidebarUser from "./SidebarUser";
import { clearWishlist } from "../rtk/slices/Wishlist-slice";
import { IoIosNotificationsOutline } from "react-icons/io";
import { selectToken } from "../rtk/slices/Auth-slice";
import { baseUrl } from "../rtk/slices/Product-slice";

function NavHeader({ userId, handleProductClick, cartunmber }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const allProducts = useSelector((state) => state.products);
  const bearerToken = useSelector(selectToken);

  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryIdTwo, setSelectedCategoryIdTwo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const cart = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);
  const [numItems, setNumItems] = useState(0);

  const handleLogout = () => {
    dispatch(setToken(null));
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userToken = localStorage.getItem("token");
      setIsLoggedIn(!!userToken);

      console.log("tokennn is ", userToken);
      console.log("n of items", numItems);
      console.log("Cart length:", cart.length);
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/public/category/all`, {
          headers: {
            "Accept-Language": language,
          },
        });
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    checkLoggedInStatus();
    fetchCategories();
    fetchNotifications();
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");

  /*const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };*/

  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  /*const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (product.descreption?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
  
    return matchesSearch && matchesCategory;
  });*/

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId
      ? product.categoryId === selectedCategoryId
      : true;

    return matchesSearch && matchesCategory;
  });

  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true);
  };

  /* const handleSearchSubmit = () => {
    const productsInSelectedCategory = filteredProducts.filter(product => product.categoryId === selectedCategoryId);
  
    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : '';
    const productsMatchingSearch = productsInSelectedCategory.filter(product => {
      const productNameLowerCase = product.title ? product.title.toLowerCase() : '';
      return productNameLowerCase.includes(searchTermLowerCase);
    });
  
    if (selectedCategoryId !== null) {
      if (productsMatchingSearch.length === 0) {
        setShowErrorMessage(true);
        setProductExistsInCategory(false);
        setTimeout(() => {
          setShowErrorMessage(false);
          setProductExistsInCategory(true);
        }, 3000);
      } else {
        setShowErrorMessage(false);
        setProductExistsInCategory(true);
        navigate(`/store?search=${searchTerm}&category=${selectedCategoryId}`);
      }
    } else {
      // Handle the case where no category is selected
      setShowErrorMessage(false);
      setProductExistsInCategory(true);
      navigate(`/store?search=${searchTerm}`);
    }
  };*/

  const handleSearchSubmit = () => {
    const productsInSelectedCategory = filteredProducts.filter(
      (product) => product.categoryId === selectedCategoryId
    );

    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : "";
    const productsMatchingSearch = productsInSelectedCategory.filter(
      (product) => {
        const productNameLowerCase = product.name
          ? product.name.toLowerCase()
          : "";
        return productNameLowerCase.includes(searchTermLowerCase);
      }
    );

    if (selectedCategoryId !== null && productsMatchingSearch.length === 0) {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(resetErrorMessage, 3000);
    } else {
      navigate(
        `/store?search=${searchTerm}${
          selectedCategoryId !== null ? `&category=${selectedCategoryId}` : ""
        }`
      );
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [readed, setReaded] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    handleCategoryFilter(categoryId);
  };

  const handleSelectTwo = (categoryId) => {
    setSelectedCategoryIdTwo(categoryId);
    navigate(`/store?category=${categoryId}`);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const notificationRef = useRef(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidbar = () => {
    setShowSidebar(false);
  };

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    // setNotifications([])
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${baseUrl}/profile/notifications`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });
      setNotifications(response.data.data.notifications);
      console.log("success fetch notification in header", response.data.data);
    } catch (error) {
      console.error("Error fetching notifications: ", error);
    }
  };

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
      } else {
        console.error(
          "Error fetching user cart: Unexpected response structure"
        );
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [cart, language]);

  const handleReadNotifications = () => {
    setNotifications([]);
    console.log("readed");
    setReaded(true);
    setShowNotifications(!showNotifications);
  };
  useEffect(() => {
    const closeNotificationsOnOutsideClick = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", closeNotificationsOnOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeNotificationsOnOutsideClick
      );
    };
  }, []);

  useEffect(() => {
    // Event listener to close profile dropdown menu when clicking outside
    document.addEventListener("mousedown", closeSidbar);
    return () => {
      document.removeEventListener("click", closeSidbar);
    };
  }, []);

  const direction = useSelector((state) => state.translation.direction);

  return (
    <div className="fixed z-50 w-full bg-white ">
      <div className={`flexLanguage  ${direction === "rtl" ? "rtl" : "ltr"}`}>
        <div className="languageInnav rightAlign ">
          <select
            className="selectLang"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">Française</option>
            <option value="ar">لغه عربيه</option>
          </select>
        </div>
      </div>
      <Navbar collapseOnSelect expand="lg">
        <div className="w-full ">
          <div className="flex flex-col  ">
            <div className="flex flex-row items-center   w-[95%] mx-auto  ">
              <div className=" rounded items-start ">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => handleSelect(parseInt(e.target.value))}
                    className="bg-[#61DAA2] w-10 lg:w-12 rounded-lg h-5 lg:h-7 text-white text-xs  lg:text-lg"
                  >
                    <option value={null}>{translations[language]?.all}</option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex flex-row items-baseline mx-auto text-center w-20 text-xs lg:text-lg lg:w-auto">
                    <input
                      type="text"
                      placeholder="Search Product"
                      value={searchTerm}
                      onChange={handleSearchChangeInternal}
                      className="mx-1 lg:px-3 w-[20px]  "
                    />
                    <FaSearch
                      className="w-2 lg:w-4 "
                      onClick={handleSearchSubmit}
                    />
                  </div>
                  <div className="autocom-box">
                    {productExistsInCategory === false && (
                      <div className="error-message">
                        This product does not exist in the selected category.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mx-auto items-center w-13 h-13 ">
                <img
                  src={logo}
                  alt="Logo"
                  className=" items-center text-center  w-13 h-13 "
                />
              </div>

              <div
                onClick={handleNotificationsClick}
                className="block lg:hidden relative overflow-visible"
              >
                <IoIosNotificationsOutline className="noteicon" />
                {readed && notifications.length > 0 ? (
                  <div className=" top-2  w-10 h-10 rounded-full  text-center items-center text-red-800  absolute">
                    {notifications?.length}
                  </div>
                ) : null}
              </div>
              <div
                className=" notification-dropdown-container relative"
                ref={notificationRef}
              >
                {showNotifications && (
                  <div
                    className={`flexLanguage ${
                      direction === "rtl" ? "rtl" : "ltr"
                    }`}
                  >
                    <div className="lg:hidden border border-gray-300 lg:p-4 p-2 shadow-md fixed top-20 right-3 z-10 lg:-mr-20 my-5 lg:w-[100px]  outline-dotted bg-white items-center text-center text-sm ">
                      {notifications.map((notification) => (
                        <div
                          className="notification-item"
                          key={notification.id}
                        >
                          <div>{notification.message}</div>
                          <div>{notification.time}</div>
                        </div>
                      ))}
                      <div className="items-center mx-auto text-center">
                        <button
                          className="w-[80%]  items-center mx-auto text-center my-2 pt-1 rounded-md bg-slate-300 text-blue-600 h-9 "
                          onClick={handleReadNotifications}
                        >
                          Mark As Read
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden lg:block lg:items-end ">
                <div className="">
                  {!isLoggedIn && (
                    <div className="logindiv flexlogindiv ">
                      <div>
                        {" "}
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src={loginimg}
                          alt="user"
                        />{" "}
                      </div>
                      <div>
                        {" "}
                        <Link to="/authentication">Login</Link>{" "}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-line text-linelogout ">
                  {isLoggedIn && (
                    <>
                      <div
                        onClick={handleNotificationsClick}
                        className="relative overflow-visible"
                      >
                        <IoIosNotificationsOutline className="noteicon" />
                        {readed && notifications.length > 0 ? (
                          <div className=" top-2  w-10 h-10 rounded-full  text-center items-center text-red-800  absolute">
                            {notifications?.length}
                          </div>
                        ) : null}
                      </div>

                      <div
                        className="notification-dropdown-container "
                        ref={notificationRef}
                      >
                        {showNotifications && (
                          <div
                            className={`flexLanguage ${
                              direction === "rtl" ? "rtl" : "ltr"
                            }`}
                          >
                            <div className="notification-dropdown -mr-20 my-5 w-[150px] outline-dotted bg-white items-center text-center ">
                              {notifications.map((notification) => (
                                <div
                                  className="notification-item"
                                  key={notification.id}
                                >
                                  <div>{notification.message}</div>
                                  <div>{notification.time}</div>
                                </div>
                              ))}
                              <div className="items-center mx-auto text-center">
                                <button
                                  className="w-[80%]  items-center mx-auto text-center my-2 pt-1 rounded-md bg-slate-300 text-blue-600 h-9 "
                                  onClick={handleReadNotifications}
                                >
                                  Mark As Read
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Link to="/cart" className="cart-link">
                        <img
                          style={{
                            marginRight: "10px",
                            width: "30px",
                            height: "30px",
                          }}
                          src={cartimg}
                          alt="cart"
                        />
                        {cart.length > 0 && (
                          <div className="cart-items">{cart.length}</div>
                        )}
                      </Link>
                      <Link>
                        <div className="user-profile" onClick={toggleSidebar}>
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={logoutimg}
                            alt="user"
                          />
                        </div>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <>
              <div className="mx-auto items-center text-center w-full  ">
                <div className=" mx-auto outline-dotted">
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="w-full"
                  >
                    <div className="w-full">
                      <div className="  text-center items-center  mx-auto flex flex-col   lg:flex-row lg:content-between my-2 lg:my-0 gap-5 w-full ">
                        <Link to="/cart" className="block lg:hidden cart-link">
                          <img
                            style={{
                              marginRight: "10px",
                              width: "30px",
                              height: "30px",
                            }}
                            className="block lg:hidden"
                            src={cartimg}
                            alt="cart"
                          />
                          {cart.length > 0 && (
                            <div className="cart-items lg:hidden">
                              {cart.length}
                            </div>
                          )}
                        </Link>

                        <Link
                          to="/home"
                          className="items-center mx-auto  text-black font-bold text-xl  "
                          style={{ textDecoration: "none" }}
                        >
                          {translations[language]?.home}
                        </Link>
                        <Link
                          to="/store"
                          className="items-center mx-auto  text-black font-bold text-xl"
                          style={{ textDecoration: "none" }}
                        >
                          {translations[language]?.store}
                        </Link>
                        <Link
                          to="/blog"
                          className="items-center mx-auto  text-black font-bold text-xl  "
                          style={{ textDecoration: "none" }}
                        >
                          {translations[language]?.blog}
                        </Link>

                        <Link
                          to="/about"
                          className="items-center mx-auto  text-black font-bold text-xl "
                          style={{ textDecoration: "none" }}
                        >
                          {translations[language]?.about}
                        </Link>
                        <Link
                          to="/contact"
                          className="items-center mx-auto  text-black font-bold text-xl "
                          style={{ textDecoration: "none" }}
                        >
                          {translations[language]?.contact}
                        </Link>
                      </div>
                    </div>
                  </Navbar.Collapse>
                </div>
              </div>
            </>
          </div>
        </div>

        <SidebarUser
          isOpen={showSidebar}
          onClose={toggleSidebar}
          handleLogout={handleLogout}
        />
      </Navbar>
    </div>
  );
}

export default NavHeader;
