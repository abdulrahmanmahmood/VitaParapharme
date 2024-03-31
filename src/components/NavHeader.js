import React, { useLayoutEffect, useRef } from "react";
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
import { Dropdown } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import { NewBaseUrl, fetchProducts } from "../rtk/slices/Product-slice";
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
import $ from "jquery";
import { formatDate } from "../pages/MyOrders";

function NavHeader({ userId, handleProductClick, cartunmber }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const [allCategories, setAllCategories] = useState([]);
  const translations = useSelector(selectTranslations);
  const allProducts = useSelector((state) => state.products);
  const bearerToken = useSelector(selectToken);

  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState(null);

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
      if(userToken){
        console.log("tokennn is ", userToken);
        setIsLoggedIn(true);

      }

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
    fetchMainSubCategories();
  }, [language]);

  

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");

  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const filteredProducts = products?.filter((product) => {
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

  const handleSearchSubmit = () => {
    const productsInSelectedCategory = filteredProducts?.filter(
      (product) => product.categoryId === selectedCategoryId
    );

    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : "";
    const productsMatchingSearch = productsInSelectedCategory?.filter(
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

  const handleSelectSubCategory = (categoryId) => {
    navigate(`/store?category=${categoryId}`);
  };
  const handleSelectMainCategory = (categoryId) => {
    navigate(`/store?Maincategory=${categoryId}`);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const notificationRef = useRef(null);
  const categoriesRef = useRef(null);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const closeSidebar = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setShowSidebar(false);
    }
  };
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showtheDropDown, setShowtheDropDown] = useState(false);
  const [showMopDropDown, setshowmopDropDown] = useState(false);

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
    // setNotifications([])
  };
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${NewBaseUrl}/profile/notifications`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });
      setNotifications(response.data.data.notifications);
      const unreadCount = response.data.data.notifications.filter(
        (notification) => !notification.read
      ).length;
      console.log("unreadCount", unreadCount);
      setUnreadNotificationsCount(unreadCount);
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
    const closeCategories = (e) => {
      if (categoriesRef.current && !categoriesRef.current?.contains(e.target)) {
        setShowtheDropDown(false);
      }
    };

    document.addEventListener("mousedown", closeCategories);

    return () => {
      document.removeEventListener("mousedown", closeCategories);
    };
  }, []);

  useEffect(() => {
    const closeSidebarOnOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeSidebarOnOutsideClick);
    };
  }, []);

  const direction = useSelector((state) => state.translation.direction);

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

  useEffect(() => {
    fetchMianCategory();
    setMainCategoryText(
      translations[language]?.main || translations["en"]?.main
    );
    setSubCategoryText(translations[language]?.sub || translations["en"]?.sub);
  }, [language, translations]);

  const fetchMainSubCategories = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/main-sub/category/all`,
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );
      console.log(
        "success in fetching All sub and main Categories ",
        response.data.data
      );
      setAllCategories(response.data.data.mainCategories);
    } catch (error) {
      console.log("error in fetching main Category", error);
    }
  };

  const fetchMianCategory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/public/main/category/all`, {
        headers: {
          "Accept-Language": language,
        },
      });
      console.log("success in fetching All Categories  ", response.data.data);
      setMainCategory(response.data.data.mainCategories);
    } catch (error) {
      console.log("error infetching All Categories ", error);
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

  const handleSubCatSelect = async (id, name) => {
    console.log("Selected Sub Category id:", id);
    fetchProductsBySubCat(id);
    setSelectedSubCat(id);
    setSubCategoryText(name);
    navigate(`/store?category=${id}`);
  };
  const [nestedListId, setNestedListId] = useState(0);

  const hanldeNotificationClick = (notification) => {
    switch (notification.typeId) {
      case 4:
        navigate(`/order?orderId=${notification.identifier}`);
        break;
      case 3:
        navigate(`/home/product/${notification.identifier}`);
      case 2:
        navigate(`/home/product/${notification.identifier}`);
        break;
      case 1:
        navigate("/cart");
        break;
      default:
      // Handle other cases if needed
    }

    axios
      .put(
        `${NewBaseUrl}/profile/read-notification/${notification.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Accept-Language": language,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("Notification marked as read:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.log("Error marking notification as read:", error);
      });
  };
  return (
    <div className="fixed z-50 w-full bg-white ">
      <div className={`flexLanguage  ${direction === "rtl" ? "rtl" : "ltr"}`}>
        <div className="languageInnav rightAlign ">
          <select
            className="bg-[#61DAA2] border border-white border-opacity-50 outline-none text-white flex items-center mr-28 ml-20"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="fr">Française</option>
            <option value="ar">لغه عربيه</option>
          </select>
        </div>
      </div>
      <Navbar collapseOnSelect expand="xl" className="lg:w-full">
        <div className="w-full ">
          <div className="flex flex-col  ">
            <div className="flex flex-row items-center w-[100%]  lg:w-[95%] mx-auto  h-[70px] ">
              <div className=" rounded items-start ">
                <div className="hidden lg:flex flex-1  flex-row justify-between">
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => handleSelect(parseInt(e.target.value))}
                    className="flex-1 bg-[#61DAA2] w-[70px] lg:w-[150px] rounded-lg h-5 lg:h-7 text-white text-xs  lg:text-lg"
                  >
                    <option value={null} className="text-center">
                      {translations[language]?.all}
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                        className="text-center border"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex  flex-row items-baseline mx-auto text-center ml-2 lg:-ml-[20px] text-xs lg:text-lg lg:w-25 lg:p-1">
                    <form onSubmit={handleSearchSubmit} className="m-0 p-0 ">
                      <input
                        type="text"
                        placeholder="Search Product"
                        value={searchTerm}
                        onChange={handleSearchChangeInternal}
                        className="lg:mx-1 lg:px-3 lg:w-[20px] w-[10px]  "
                      />
                    </form>
                    <div>
                      <FaSearch
                        className="w-2 lg:w-4 "
                        onClick={handleSearchSubmit}
                      />
                    </div>
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

              <div className=" items-baseline  text-center  lg:mx-auto lg:ml-[18%] ml-[10px] mr-auto lg:h-13 w-[60px] h-[60px] lg:w-[20%]  ">
                <img
                  src={logo}
                  alt="Logo"
                  className=" items-baseline lg:items-center my-auto text-center w-[60px] h-[60px] lg:w-[100px] lg:h-13 flex-1 mx-auto  object-fill"
                />
              </div>

              <div className="flex flex-row items-baseline mx-auto text-center mt-[16px] w-[30%] lg:hidden text-xs">
                <input
                  type="text"
                  placeholder="Search Product"
                  value={searchTerm}
                  onChange={handleSearchChangeInternal}
                  className=" w-[20px]  "
                />
                <div>
                  <FaSearch className="w-4  " onClick={handleSearchSubmit} />
                </div>
              </div>

              <div className="  lg:block lg:items-end ">
                <div className="">
                  {!isLoggedIn && (
                    <div className="lg:w-[100px] w-[50px] lg:h-[40px] h-[20px] rounded-md flex   flex-row items-center  bg-[#61DAA2] lg:p1 overflow-hidden lg:rounded-2xl ">
                      <div>
                        {" "}
                        <img
                          src={loginimg}
                          alt="user"
                          className="lg:w-[40px] w-[20px] lg:h-[15px] h-[8px] object-contain  lg:mx-auto"
                        />{" "}
                      </div>
                      <div>
                        <Link
                          to="/authentication"
                          className="text-center text-[12px] lg:text-xl text-white no-underline my-auto lg:font-bold"
                        >
                          Login
                        </Link>{" "}
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-line flex-row text-linelogout ">
                  {isLoggedIn && (
                    <>
                      <button
                        onClick={handleNotificationsClick}
                        className="relative overflow-visible cursor-pointer"
                      >
                        <IoIosNotificationsOutline className="lg:text-[40px] lg:mr-[15px] cursor-pointer text-[25px]  mr-[5px] mt-[7px]" />
                        {unreadNotificationsCount > 0 ? (
                          <div className=" top-2 left-2 w-2 h-3 rounded-full  text-center items-center bg-red-400  absolute"></div>
                        ) : null}
                      </button>

                      <div
                        className="notification-dropdown-container w-[150px] lg:w-[200px] bg-red-500"
                        ref={notificationRef}
                      >
                        {showNotifications && (
                          <div
                            className={`flexLanguage  ${
                              direction === "rtl" ? "rtl" : "ltr"
                            }`}
                          >
                            <div className="notification-dropdown  -mr-20 my-5 w-[200px] lg:w-[300px] bg-white items-center text-center overflow-auto">
                              {notifications.map((notification) => (
                                <div
                                  className={`notification-item  cursor-pointer   ${
                                    notification.read == true
                                      ? "bg-white text-gray-400 hover:text-green-700"
                                      : " hover:text-green-700"
                                  }`}
                                  key={notification.id}
                                  onClick={() =>
                                    hanldeNotificationClick(notification)
                                  }
                                >
                                  <div className="text-[10px] lg:text-[13px]">
                                    {notification.message}
                                  </div>
                                  <div className="text-[8px] lg:text-[10px]">
                                    {formatDate(notification.time)}
                                  </div>
                                </div>
                              ))}
                              <div className="items-center mx-auto text-center"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Link to="/cart" className="cart-link">
                        <img
                          className="lg:w-[30px] lg:h-[30px] lg:mr-[10px] w-[20px] h-[20px] mr-[5px]"
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
                            className="lg:w-[40px] lg:h-[40px] w-[20px] h-[20px] "
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

            <div className="">
              <div className="mx-auto items-center text-center w-full ">
                <div className=" mx-auto ">
                  <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="w-20 my-3"
                  />
                  <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="w-full"
                  >
                    <div className="w-full">
                      <div className="  text-center items-center  mx-auto flex flex-col   lg:flex-row lg:content-between my-2 lg:my-0 gap-5 w-full  ">
                        <Link
                          to="/"
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
                          className="hidden lg:block items-center mx-auto text-black font-bold text-xl"
                          style={{ textDecoration: "none" }}
                          onMouseEnter={() => setShowtheDropDown(true)}
                        >
                          {translations[language]?.categories}
                        </Link>

                        <div>
                          <Link
                            className="block lg:hidden items-center mx-auto text-black font-bold text-xl "
                            style={{ textDecoration: "none" }}
                            onClick={() => setshowmopDropDown(!showMopDropDown)}
                          >
                            {translations[language]?.categories}
                          </Link>

                          {showMopDropDown && (
                            <div
                              className={` text-center  w-[30%] text-[12px] shadow-lg border-2 border-gray-200 mx-auto ${
                                showMopDropDown ? "fixed" : "hidden"
                              } `}
                            >
                              <div className="w-[95%] mt-3 text-[12px] bg-white rounded-xl mx-auto">
                                {allCategories?.map((category) => (
                                  <div key={category.name}>
                                    {category.subCategories.length > 0 ? (
                                      <div className="">
                                        <div
                                          className={`font-semibold text-center text-[12px] flex flex-row px-3 cursor-default  ${
                                            nestedListId === category.categoryId
                                              ? "bg-[#3EBF87]"
                                              : ""
                                          }`}
                                          onClick={() => {
                                            setNestedListId(
                                              category.categoryId
                                            );
                                          }}
                                        >
                                          {category.name}{" "}
                                          <RiArrowDropDownLine className="transform items-end  ml-auto my-auto text-3xl -rotate-90" />
                                        </div>
                                        {nestedListId ===
                                          category.categoryId && (
                                          <div className="fixed bg-white text-[10px]  border ml-[25%] w-[40%] rounded">
                                            <ul className="list-none text-left  px-2 py-1 text-[12px] w-[100%]  pb-1 pt-2 ">
                                              {category.subCategories.map(
                                                (subCategory) => (
                                                  <li
                                                    key={subCategory.name}
                                                    className="hover:bg-[#3EBF87] px-1 my-2 mx-auto rounded cursor-default"
                                                    onClick={() =>
                                                      handleSelectSubCategory(
                                                        subCategory.categoryId,
                                                        subCategory.name
                                                      )
                                                    }
                                                  >
                                                    {subCategory.name}
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <p
                                        className={`font-semibold text-center text-[12px] p-1 m-1 cursor-default ${
                                          nestedListId === category.categoryId
                                            ? "bg-[#3EBF87]"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          setNestedListId(category.categoryId);
                                          handleSelectMainCategory(
                                            category.mainCategoryId,
                                            category.name
                                          );
                                        }}
                                        onMouseEnter={() =>
                                          setNestedListId(category.categoryId)
                                        }
                                      >
                                        {category.name}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
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
              {/* {showtheDropDown && (
                <div className="left-1/2 fixed w-40 bg-white">
                  <div className="relative">
                    {allCategories?.map((category) => (
                      <div key={category.name}>
                        {category.subCategories &&
                        category.subCategories.length > 0 ? (
                          <div>
                            <select id="" className="">
                              <option value="">{category.name}</option>
                              {category.subCategories.map((item) => (
                                <option
                                  key={item.categoryId}
                                  value={item.categoryId}
                                >
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <p className="font-semibold px-4">{category.name}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {showtheDropDown && (
                <div
                  className={` w-[30%] ${
                    showtheDropDown ? "fixed" : "hidden"
                  } ${direction === "rtl" ? "right-1/2" : "left-1/2 "}`}
                  ref={categoriesRef}
                  onMouseLeave={() => setShowtheDropDown(false)}
                >
                  <div className="w-[50%]  bg-white rounded-xl">
                    {allCategories?.map((category) => (
                      <div key={category.name}>
                        {category.subCategories.length > 0 ? (
                          <div className="">
                            <div
                              className={`font-semibold text-center text-xl flex flex-row px-4 cursor-default  ${
                                nestedListId === category.categoryId
                                  ? "bg-[#3EBF87]"
                                  : ""
                              }`}
                              onClick={() => {
                                setNestedListId(category.categoryId);
                                handleSelectMainCategory(
                                  category.categoryId,
                                  category.name
                                );
                              }}
                              onMouseEnter={() =>
                                setNestedListId(category.categoryId)
                              }
                            >
                              {category.name}{" "}
                              <RiArrowDropDownLine
                                className={`transform items-end ml-auto my-auto text-3xl ${
                                  direction === "rtl"
                                    ? "rotate-90"
                                    : "-rotate-90"
                                }`}
                              />{" "}
                            </div>
                            {nestedListId === category.categoryId && (
                              <div
                                className={`fixed bg-white border  -mt-5 rounded-xl
                             ${direction === "rtl" ? "mr-[15%]" : "ml-[15%] "}
                             
                             
                             `}
                                onMouseLeave={() => setNestedListId(-1)}
                              >
                                <ul className="list-none text-left p-2 w-full ">
                                  {category.subCategories.map((subCategory) => (
                                    <li
                                      key={subCategory.name}
                                      className="hover:bg-[#3EBF87] p-2 rounded cursor-default"
                                      onClick={() =>
                                        handleSelectSubCategory(
                                          subCategory.categoryId,
                                          subCategory.name
                                        )
                                      }
                                    >
                                      {subCategory.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p
                            className={`font-semibold text-center text-xl p-1 m-1 cursor-default ${
                              nestedListId === category.categoryId
                                ? "bg-[#3EBF87]"
                                : ""
                            }`}
                            onClick={() => {
                              setNestedListId(category.categoryId);
                              handleSelectMainCategory(
                                category.mainCategoryId,
                                category.name
                              );
                            }}
                            onMouseEnter={() =>
                              setNestedListId(category.categoryId)
                            }
                          >
                            {category.name}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div ref={sidebarRef}>
          <SidebarUser
            isOpen={showSidebar}
            onClose={toggleSidebar}
            handleLogout={handleLogout}
          />
        </div>
      </Navbar>
    </div>
  );
}

export default NavHeader;
