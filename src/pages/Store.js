import React from "react";
import "./stylehome.css";
import logo from "../images/Vita Logo2.png";
import product from "../images/product.png";
import { FaSearch } from "react-icons/fa";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Slider from "./slider/Slider";
import StarRating from "./rate/StarRating";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setProducts } from "../rtk/slices/Product-slice";
//import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
//import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from "./products/DetailsDialog";
import { addToCart } from "../rtk/slices/Cart-slice";
import { CiStar } from "react-icons/ci";
import NavHeader from "../components/NavHeader";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import SidebarUser from "../components/SidebarUser";
import {
  addToWishlist,
  removeFromWishlist,
} from "../rtk/slices/Wishlist-slice";
import { clearWishlist } from "../rtk/slices/Wishlist-slice";
import loginimg from "../images/loginIcon.png";
import logoutimg from "../images/logouticon.png";
import cartimg from "../images/Cart.png";
import { selectToken } from "../rtk/slices/Auth-slice";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import "./store.css";
import WhatsAppIcon from "../components/Whatsapp";
import Dropdown from "react-bootstrap/Dropdown";
import Footer from "../components/Footer";
import { baseUrl } from "../rtk/slices/Product-slice";

function Store() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const userId = useSelector((state) => state.auth.id);
  const bearerToken = useSelector(selectToken);

  const products = useSelector((state) => state.products.products);

  const [ratingFilter, setRatingFilter] = useState(0);

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, max: value }));
  };

  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    fetchUserFavourite();
    fetchMianCategory();
    fetchSubCategory();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const handleAddToFavorites = async (productId) => {
    try {
      if (isProductInWishlist(productId)) {
        await handleDeleteFromWishlist(productId);
      } else {
        await axios.put(
          `${baseUrl}/user/wishlist/add/${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              "Accept-Language": language,
            },
          }
        );
        await fetchUserFavourite();
      }
    } catch (error) {
      console.error("Error updating product in wishlist: ", error.message);
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
      const language = "en";
      const response = await axios.get(`${baseUrl}/user/wishlist/my`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
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
        const categoryIdFromUrl = queryParams.get("category");
        if (categoryIdFromUrl) {
          // Fetch products based on the category ID from the URL
          await handleCategoryFilter(parseInt(categoryIdFromUrl));
        } else {
          // Fetch all products if no category ID is provided in the URL
          dispatch(fetchProducts());
        }
        checkLoggedInStatus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  const checkLoggedInStatus = () => {
    const userToken = localStorage.getItem("token");
    setIsLoggedIn(!!userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  const rating = product.rate;

  /*const handleRatingChange = (newRating) => {
    setRatingFilter((prevRating) => (prevRating === newRating ? 0 : newRating));
  };*/

  const handleRatingChange = (newRating) => {
    setRatingFilter((prevRating) => (prevRating === newRating ? 0 : newRating));
  };

  const handleAddToCart = async (productId, product) => {
    if (!isLoggedIn) {
      alert("Please sign in to add to cart.");
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

      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const detailsBtn = () => {
    if (!isLoggedIn) {
      alert("Please sign in to view details.");
      return;
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /*const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };*/

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  /* const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
     
    navigate(`/store?category=${categoryId}`); 
    dispatch(fetchProducts(categoryId));
  };*/

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryFilter = async (categoryId) => {
    try {
      let url;
      if (categoryId === null) {
        // If categoryId is null, fetch all products
        url = `${baseUrl}/public/product/all`;
        setSelectedCategoryId(null); // Set selectedCategoryId to null
      } else {
        url = `${baseUrl}/public/category/${categoryId}`;
        setSelectedCategoryId(categoryId);
      }

      const response = await fetch(url, {
        headers: {
          "Accept-Language": language,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch(setProducts(data.data.products));
      } else {
        console.error("Error fetching products by category:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleSaleButtonClick = () => {
    const saleProducts = products.filter((product) => product.discount);
    dispatch(setProducts(saleProducts));
  };

  const handleAllButtonClick = () => {
    dispatch(fetchProducts());
  };

  /*const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    //const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
    const matchesPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;
    
    const matchesRating = ratingFilter
      ? product.rating >= ratingFilter && product.rating < ratingFilter + 1
      : true;
    return matchesSearch  && matchesPriceRange && matchesRating ;
  });*/

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    fetchCategories();
  }, [language]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromUrl = queryParams.get("search") || "";
  const categoryIdFromUrl = queryParams.get("category");

  /*useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
        checkLoggedInStatus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setSearchTerm(searchTermFromUrl);

    const categoryIdFromUrl = queryParams.get('category');
  setSelectedCategoryId(categoryIdFromUrl ? parseInt(categoryIdFromUrl) : null);
  }, [language, searchTermFromUrl]);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts(categoryIdFromUrl));
        checkLoggedInStatus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setSearchTerm(searchTermFromUrl);
  }, [language, searchTermFromUrl, categoryIdFromUrl]);

  // ...

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Update the URL when the search term changes
    navigate(`/store?search=${term}`);
  };

  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [selectedCategoryIdTwo, setSelectedCategoryIdTwo] = useState(null);

  const handleSelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    handleCategoryFilter(categoryId);
  };

  /* const handleSelectTwo  = (categoryId) => {
    setSelectedCategoryIdTwo(categoryId);
    navigate(`/store?category=${categoryId}`);
  };*/

  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  /*const handleSearchSubmit = () => {
    
    const productsInSelectedCategory = filteredProducts.filter(product => product.categoryId === selectedCategoryId);
  
    
    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : '';
    const productsMatchingSearch = productsInSelectedCategory.filter(product => {
      const productNameLowerCase = product.name ? product.name.toLowerCase() : '';
      return productNameLowerCase.includes(searchTermLowerCase);
    });
  
    if (selectedCategoryId !== null && productsMatchingSearch.length === 0) {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(resetErrorMessage, 3000);
    } else {
      navigate(`/store?search=${searchTerm}${selectedCategoryId !== null ? `&category=${selectedCategoryId}` : ''}`);
    }
  };*/
  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true);
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [userRating, setUserRating] = useState(0);

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
  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/public/category/all`, {
        headers: {
          "Accept-Language": language,
        },
      });
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
    <div className="page-container">
      {/* Header Container */}
      <NavHeader
        userId={userId}
        //filteredProductss={filteredProducts}
        handleProductClick={handleProductClick}
      />

      {/* Green Container */}
      <div className="bg-[#F8F8F8] mt-[100px]">
        <div className="home-containerr testtt">
          <WhatsAppIcon />


          <div className="store-flex">
            {!loading && selectedMainCat === 0 && selectedSubCat === 0 && (
              <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 lg:gap-4 w-[95%] lg:w-[90%] ">
                {products.map((product) => {
                  const matchesSearch = product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                  const matchesPriceRange =
                    product.price >= priceRange.min &&
                    product.price <= priceRange.max;
                  const matchesRating = ratingFilter
                    ? Math.floor(product.rating) === ratingFilter
                    : true;
                  const matchesCategory =
                    !categoryIdFromUrl ||
                    product.categoryId === parseInt(categoryIdFromUrl);

                  if (
                    matchesRating &&
                    matchesPriceRange &&
                    matchesSearch &&
                    matchesCategory
                  ) {
                    return (
                      <div
                        style={{}}
                        className="relative w-[330px] h-[420px] lg:w-[270px] lg:h-[420px] mx-auto mt-5 bg-white p-2 rounded-2xl text-center "
                        key={product.id}
                      >
                        <div className="">
                          <div className="flex flex-col absolute right-4 top-4 gap-2">
                            <div className="w-10 h-10 bg-white border-1 border-solid border-gray-300 text-black shadow-2xl items-center p-2.5 overflow-hidden text-center  rounded-full">
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
                    );
                  } else {
                    return null; // or any other fallback UI if needed
                  }
                })}
              </div>
            )}



            <div className="storeside">
              <p></p>
              <div>
                <div style={{ marginBottom: "30px" }}>
                  <h5 style={{ color: "black" }}>
                    {translations[language]?.rating}
                  </h5>
                  <StarRating
                    initialRating={ratingFilter}
                    onRatingChange={handleRatingChange}
                    isClickable={true}
                  />
                </div>
                <div style={{ marginBottom: "30px" }}>
                  <h5 style={{ color: "black" }}>
                    {translations[language]?.price} : {priceRange.max}
                  </h5>
                  <div className="range-slider">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange.max}
                      onChange={handlePriceRangeChange}
                    />
                  </div>
                </div>

                <h5 style={{ marginTop: "10px" }}>sale products</h5>

                <div className="filterCatdiv">
                  <div className="rateFilter">
                    <button
                      color="primary"
                      onClick={handleSaleButtonClick}
                      className="filterbycat"
                    >
                      Sale Products
                    </button>

                    <button
                      color="primary"
                      onClick={handleAllButtonClick}
                      className="filterbycat"
                    >
                      All Products
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="marks"></div>
        </div>

        <Footer />
      </div>
      <DetailsDialog
        isOpen={detailsOpen}
        onCancel={handleCancelDetails}
        product={selectedProduct}
        rating={rating}
      />
    </div>
  );
}

export default Store;
