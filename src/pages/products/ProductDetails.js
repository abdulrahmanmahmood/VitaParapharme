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

  const [quantity, setQuantity] = useState(1);
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
    <div className="flex flex-col h-screen relative bg-white/90 ">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="w-full h-[90%] mt-[180px] ">
        <div className="block lg:hidden text-center items-center mx-auto w-[24%] my-3 ">
          <div className="flex flex-row lg:mx-3 text-center items-center">
            <StarRating
              initialRating={selectedProduct?.rating}
              isClickable={false}
              className="lg:mx-3 text-center"
            />
            <h5 className=" text-[#696767] mt-4 text-center ">
              ({selectedProduct?.reviews})
            </h5>
          </div>
        </div>

        <div className="  bg-white/90 mb-20">
          <div className=" relative   h-[100%] my-auto ">
            <div className="flex flex-col lg:flex-row justify-between  w-[100%] my-auto ">
              <div className=" w-[90%] lg:w-[50%] flex flex-col items-center h-[90%] my-auto">
                {masterImage && (
                  <div className="hidden  lg:flex flex-row w-[350px] my-auto  h-[350px] bg-gray-400 rounded-full">
                    <div className="items-center" />
                    <img
                      className=" w-[220px] h-[200px] object-contain lg:ml-[6%] absolute lg:mt-[4%] "
                      src={masterImage}
                      alt="Master"
                    />
                  </div>
                )}

                <img
                  className="lg:hidden w-[220px] h-[200px] object-contain mx-auto items-center "
                  src={masterImage}
                  alt="Master"
                />
                <div className="flex justify-center mt-1">
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

              <div className="ml-6 w-[90%] lg:w-[50%] mr-8 text-center  h-[100%] mt-5">
                <h2 className="text-black lg:font-bold text-3xl">
                  {productDetails && productDetails.name}
                </h2>

                <h1 className="text-xl text-black text-center my-3 lg:font-bold">
                  {translations[language]?.aboutpro}{" "}
                </h1>
                <p className=" ">
                  {productDetails && productDetails.description}
                </p>

                <h1 className="text-xl text-black text-center my-3 lg:font-bold ">
                  {translations[language]?.productdet}{" "}
                </h1>
                <p>{productDetails && productDetails.about}</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-1 border-gray-300 shadow-3xl shadow-slate-400 rounded-t-full  absolute w-full bottom-0  ">
          <div className="px-4 py-2 ">
            <div className="flex flex-row  md:flex-row md:items-center justify-between">
              <button
                className="bg-[#61DAA2] lg:h-14 lg:w-40 w-20 h-8 rounded-full text-[12px]  text-white lg:text-2xl  lg:font-bold lg:mb-2 mb-1  lg:ml-10 lg:mt-1"
                onClick={() => handleDetailsClick()}
              >
                Review
              </button>
              <div className=" flex items-center lg:mb-2 mb-0">
                <div className="hidden lg:block">
                  <div className="flex flex-row lg:mx-3">
                    <StarRating
                      initialRating={selectedProduct?.rating}
                      isClickable={false}
                      className="lg:mx-3"
                    />
                    <h5 className=" text-[#696767] mt-4">
                      ({selectedProduct?.reviews})
                    </h5>
                  </div>
                </div>

                <div className="text-[#696767] lg:mr-4">
                  {productDetails ? (
                    <h1 className="text-[14px] lg:text-2xl ">
                      {productDetails.price * quantity} $
                    </h1>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
                <div className="flex  items-center">
                  <button
                    className="bg-[#3EBF87] text-white ml-2  border-1 border-[#3EBF87] p-1"
                    onClick={handleDecrement}
                  >
                    <FaMinus />
                  </button>
                  <span className="md:text-lg md:font-bold  mx-3 text-2xl text-black">
                    {quantity}
                  </span>
                  <button
                    className=" bg-[#3EBF87] text-white ml-2  border-1 border-[#3EBF87] p-1 "
                    onClick={handleIncrement}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className="bg-[#61DAA2] lg:h-14 lg:w-40 w-20 text-[12px] h-8 rounded-full mb-1  text-white lg:text-2xl  lg:font-bold lg:mb-2   lg:mr-10 lg:mt-1"
                onClick={() =>
                  handleAddToCart(productDetails.productId, productDetails)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
  
          <ReviewDialog
            isOpen={detailsOpen}
            onCancel={()=>setDetailsOpen(false)}
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
    </div>
  );
}

export default ProductDetails;
