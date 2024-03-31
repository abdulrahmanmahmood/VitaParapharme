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
  const [addedToCart, setAddedToCart] = useState(false);
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
      setAddedToCart(true);
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

  const truncateDescription = (description) => {
    if (!description) return "";
    const lines = description.split("\n");
    const maxLines = 4;
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join("\n");
    } else {
      return description;
    }
  };
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const imageContainer = document.getElementById("image-container");
      const detailsContainer = document.getElementById("details-container");

      if (
        isOpen &&
        ((imageContainer && !imageContainer.contains(e.target)) ||
          (detailsContainer && !detailsContainer.contains(e.target)))
      ) {
        onCancel();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onCancel]);

  return (
    <>
      {isOpen && (
        <div className="fixed mt-[100px] left-0 w-full max-md:w-[80%]  h-full bg-black bg-opacity-50 flex justify-center items-center popup">
          <div className="flex justify-between bg-gradient-to-r from-green-400 to-green-300 px-5 py-2 rounded-lg shadow-lg w-full sm:w-[600px] h-[600px] max-md:w-[80%] max-md:h-[80vh] relative">
            <div className="flex flex-col items-center w-full">
              <div className="w-[50%] max-md:h-[27%] h-[30%] my-2  ">
                <Link to={`/home/product/${product.productId}`}>
                  <img
                    className="object-contain  w-[100%] max-md:w-[140px] max-md:h-[140px] h-[100%] mx-auto my-auto"
                    src={product.pictures[0]}
                    alt="Product poster"
                  />
                </Link>
              </div>
              <div className="max-md:h-[63%] h-[55%] lg:py-3 lg:my-3 bg-white rounded-t-3xl text-center sm:w-full">
                <h3 className="max-md:text-xl line-clamp-3">
                  {product.name || product.productName}
                </h3>
                <hr />
                <div className="overflow-hidden">
                  <div className="h-auto max-h-[4rem]  overflow-hidden">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: truncateDescription(
                          product.description || product.productDescription
                        ),
                      }}
                    />
                  </div>
                </div>

                <Link to={`/home/product/${product.productId}`}>
                  {translations[language]?.showMore}
                </Link>
                <div className="text-center mx-auto max-md:mt-3 mt-1 justify-around content-center">
                  <div className="max-md:inline-block">
                    <StarRating
                      initialRating={product.rating}
                      isClickable={false}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-around lg:mt-8 max-md:mt-3">
                  {product.discount && (
                    <h1>
                      {product.afterDiscount * quantity}{" "}
                      {translations[language]?.currency}
                    </h1>
                  )}
                  {!product.discount && (
                    <h1>
                      {(product.price || product.productPrice) * quantity}
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
                  <div className=" max-md:my-2">
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
