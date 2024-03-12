import React, { useState, useEffect } from "react";
import StarRating from "../rate/StarRating";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { baseUrl } from "../../rtk/slices/Product-slice";
import "./detailsDialog.css";
import { Link } from "react-router-dom";
import {
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";

const DetailsDialog = ({ isOpen, onCancel, product }) => {
  const dispatch = useDispatch();
  const bearerToken = useSelector(selectToken);
  const isUserLoggedIn = useSelector(selectToken) !== null;

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false); // State to track if item is added to cart
  const translations = useSelector(selectTranslations);
  const language = useSelector(selectLanguage);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleAddToCart = async (productId, product) => {
    if (!isUserLoggedIn) {
      setModalMessage("Please sign in first");
      setShowModal(true);
      return;
    }

    const cartItem = {
      productId: productId,
      quantity: quantity,
    };

    try {
      setModalMessage("product added to cart");

      const response = await axios
        .put(`${baseUrl}/user/cart/update`, cartItem, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
        })
        .then(setShowModal(true));

      console.log("Product added to cart:", response.data);
      setAddedToCart(true); // Set addedToCart to true when item is successfully added to cart
      setQuantity(1);
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && e.target.classList.contains("popup")) {
        onCancel();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onCancel]);
  useEffect(() => {
    setAddedToCart(false);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed mt-5 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center popup">
          <div className="flex justify-between bg-gradient-to-r from-green-500 to-green-400 p-5 rounded-lg shadow-lg w-full sm:w-[600px] h-[600px] relative">
            <div className="flex flex-col items-center w-full">
              <div className="w-[50%] h-[50%] my-3">
                <Link to={`/home/product/${product.productId}`}>
                  <img
                    className="object-fill  w-[100%] h-[100%] mx-auto my-auto"
                    src={product.pictures[0]}
                    alt="Product poster"
                  />
                </Link>
              </div>
              <div className="h-100 bg-white rounded-t-3xl text-center sm:w-full">
                <h1>{product.name || product.productName}</h1>
                <hr />
                <p className="text-xl text-[#3A7E89]">
                  {product.description || product.productDescription}
                </p>
                <div>
                  <StarRating
                    initialRating={product.rating}
                    isClickable={false}
                  />
                </div>
                <div className="flex flex-row justify-around mt-8">
                  {product.discount && (
                    <h1>
                      {product.afterDiscount * quantity}{" "}
                      {translations[language]?.currency}
                    </h1>
                  )}
                  {!product.discount && (
                    <h1>
                      {(product.price || product.productPrice) * quantity}{" "}
                      {translations[language]?.currency}
                    </h1>
                  )}
                  <div className="">
                    <button className="mx-4" onClick={handleDecrement}>
                      <FaMinus />
                    </button>
                    <span className="text-lg font-bold">{quantity}</span>
                    <button className="mx-4" onClick={handleIncrement}>
                      <FaPlus />
                    </button>
                  </div>
                  <div className="">
                    <button
                      className={`mb-1 h-12 w-28 rounded-lg text-white ml-2 ${
                        addedToCart ? "bg-gray-400" : "bg-[#3EBF87]"
                      }`}
                      onClick={() =>
                        addedToCart
                          ? null
                          : handleAddToCart(product.productId, product)
                      }
                    >
                      {addedToCart ? "Added" : "Add to Cart"}{" "}
                      {/* Conditional rendering of button text */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailsDialog;
