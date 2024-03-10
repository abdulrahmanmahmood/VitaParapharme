import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import logo from "../../images/Vita Logo2.png";
import { Link } from "react-router-dom";
import StarRating from "../rate/StarRating";
import ReviewDialog from "./ReviewDialog";
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavHeader from "../../components/NavHeader";
import { useNavigate } from "react-router-dom";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import {
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { Editor } from "@tinymce/tinymce-react";
import "./ProductDetails.css";
import { baseUrl } from "../../rtk/slices/Product-slice";

function ProductDetails() {
  const navigate = useNavigate();
  const bearerToken = useSelector(selectToken);
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isUserLoggedIn = useSelector(selectToken) !== null;
  const language = useSelector(selectLanguage);
  const myapikey = "6kmsn4k5wmyibtzgdvtwd8yjp07gsvlcn6ffmiqkwkxub6fn";
  const [productDetailsHTML, setProductDetailsHTML] = useState("");
  const [aboutProductHTML, setAboutProductHTML] = useState("");
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
            "Accept-Language": language,
          },
        });
        const data = await response.json();
        setProductDetails(data.data.product);
        setSelectedProduct(data.data.product);
        console.log("data is", data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
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
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const dispatch = useDispatch();

  const handleAddToCart = async (productId, product) => {
    if (!isUserLoggedIn) {
      setModalMessage("please sign in first");
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
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      setModalMessage("product added to cart");
      setShowModal(true);
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
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

      console.log("Product Details HTML:", productDetails.productDetails);
    }
  }, [productDetails]);

  return (
    <div className="detailsPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="bg-gray-50 bottom-0 overflow-y-hidden">
        <div className="mb-20 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5 sm:px-2 flex flex-row mt-12">
          <div className="flex flex-col">
            <div className="">
              <div className="flex flex-row justify-between bg-[#3EBF87] rounded-lg p-2 mt-32">
                <div className="mt-2">
                  <h2 className="text-white">
                    {productDetails && productDetails.name}
                  </h2>
                </div>

                <div className="flex flex-row">
                  {selectedProduct && selectedProduct.rating !== undefined ? (
                    <>
                      <StarRating
                        initialRating={selectedProduct.rating}
                        isClickable={false}
                      />
                      <h5 className="text-white mt-4">
                        ({selectedProduct.reviews})
                      </h5>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div>
                  {productDetails && productDetails.discount ? (
                    <div className="">
                      <h2 className="text-white">{`$${productDetails.afterDiscount}`}</h2>
                      <div className="text-lg line-through text-white">{`$${productDetails.price}`}</div>
                    </div>
                  ) : (
                    <h2 className="text-white">{`$${
                      productDetails && productDetails.price
                    }`}</h2>
                  )}
                </div>
              </div>
              <h1 className="text-md text-black mt-[10px]">
                {translations[language]?.aboutpro}{" "}
              </h1>
              <p className=" text-md font-bold w-full overflow-wrap break-word text-left text-black">
                {productDetails && productDetails.description}
              </p>
            </div>
            <div className="flex flex-row justify-between  w-[100%]">
              <div className="  w-[50%] flex flex-col items-center">
                <div className="max-w-screen-md">
                  {masterImage && (
                    <img
                      className="w-48 h-48 object-contain"
                      src={masterImage}
                      alt="Master"
                    />
                  )}
                </div>
                <div className="flex justify-center mt-5">
                  {smallImages.map((smallImg, index) => (
                    <div
                      key={index}
                      className="mx-2 cursor-pointer max-w-xs h-auto"
                      onClick={() => handleImageClick(smallImg)}
                    >
                      <img src={smallImg} alt={`Small ${index}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="ml-6 w-[50%] mt-12">
                <h1 className="text-lg text-black">
                  {translations[language]?.productdet}{" "}
                </h1>
                <p>{productDetails && productDetails.about}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#3EBF87] rounded-t-full overflow-hidden">
          <div className="px-4 py-2 ">
            <div className="flex flex-row  md:flex-row md:items-center justify-between">
              <button
                className="bg-white h-12 w-20 rounded-lg text-black font-bold mb-2 md:mb-0 mr-2 mt-3"
                onClick={() => handleDetailsClick()}
              >
                Review
              </button>
              <div className="flex items-center mb-2 md:mb-0">
                <div className="text-white md:mr-4">
                  {productDetails ? (
                    <h1 className=" ">{productDetails.price * quantity} $</h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    className="text-white md:mr-2"
                    onClick={handleDecrement}
                  >
                    <FaMinus />
                  </button>
                  <span className="md:text-lg md:font-bold   text-white">
                    {quantity}
                  </span>
                  <button className="text-white ml-2" onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className="bg-white h-12 w-24 rounded-lg text-black font-bold ml-1 mt-3"
                onClick={() =>
                  handleAddToCart(productDetails.productId, productDetails)
                }
              >
                Add to Cart
              </button>
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
