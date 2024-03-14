import React from "react";

import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import logo from "../.././images/Vita Logo2.png";
import lotion from "../.././images/lotion.png";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import StarRating from "../rate/StarRating";
import { selectToken } from "../../rtk/slices/Auth-slice";
import { selectEmail } from "../../rtk/slices/Auth-slice";
import { Modal, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import "./review.css";
import { baseUrl } from "../../rtk/slices/Product-slice";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoSendOutline } from "react-icons/io5";

const ReviewDialog = ({ isOpen, onCancel, productId, productDetails }) => {
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const bearerToken = useSelector(selectToken);
  const bearerEmail = useSelector(selectEmail);
  const isUserLoggedIn = useSelector(selectToken) !== null;

  const [userData, setUserData] = useState(null);

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
  });
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");

  const [quantity, setQuantity] = useState(1);

  const handleCloseModal = () => setShowModal(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup")) {
      onCancel();
    }
  };

  const handleViewProductClick = () => {
    onCancel();
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/public/review/product/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      setReviews(response.data.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (isOpen && productId) {
      fetchReviews();
      fetchUserData();
    }
  }, [isOpen, productId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the comment and rating are provided
    if (formData.comment.trim() === "" || rating === 0) {
      setModalMessage("Please provide both text and stars for the review.");
      setShowModal(true);
      return;
    }

    const apiUrl = `${baseUrl}/user/review/new`;
    const requestBody = {
      productId: productId,
      comment: formData.comment,
      rating: rating,
    };

    try {
      if (!isUserLoggedIn) {
        setModalMessage("Please sign in first");
        setShowModal(true);
        return;
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Review submitted successfully");
        fetchReviews();
        setFormData({
          comment: "",
        });
        setRating(0);
      } else {
        console.error("Failed to submit review:", responseData);
      }
    } catch (error) {
      console.error("Error while submitting review:", error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });
      setUserData(response.data.data.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (reviewId, comment, rating) => {
    console.log("Current rating:", rating);
    setEditingReviewId(reviewId);
    setUpdatedComment(comment);
    setRating(rating);
  };

  const handleSaveClick = async (reviewId) => {
    try {
      const apiUrl = `${baseUrl}/user/review/update/${reviewId}`;
      const requestBody = {
        comment: updatedComment,
        rating: rating,
      };
      const response = await axios.put(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });

      console.log("Review submitted successfully");
      setEditingReviewId(null);
      fetchReviews();
    } catch (error) {
      console.error("Error while updating review:", error);
    }
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      const apiUrl = `${baseUrl}/user/review/delete/${reviewId}`;

      const response = await axios.delete(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Accept-Language": language,
        },
      });

      console.log("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      console.error("Error while deleting review:", error.message);
    }
  };

  const extractFirstLetter = (email) => {
    return email.charAt(0).toUpperCase();
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
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

  return (
    <div className={`review ${isOpen ? "open" : ""}`}>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-[95%] overflow-y-scroll pb-5 bg-black bg-opacity-50 flex justify-center items-center  mt-40 border-t-2 "
          onClick={handleOverlayClick}
        >
          <div className="w-full h-full bg-white  overflow-y-auto rounded-lg shadow-md pb-5 ">
            <div className="">
              <div className="header-container">
                <div>
                  <div className=" mt-4  w-full ">
                    <div className="px-4 py-2 ">
                      <div className="flex flex-row border-2 rounded-2xl shadow-md md:flex-row md:items-center justify-between">
                        <button
                          className="bg-[#61DAA2] lg:h-16 lg:w-[250px] w-20 my-auto text-[12px] h-8 rounded-full   text-white lg:text-2xl  lg:font-bold lg:mb-2   lg:mr-10 lg:mt-1"
                          onClick={handleViewProductClick}
                        >
                          {translations[language]?.view}
                        </button>

                        <div className=" flex items-center lg:mb-2 mb-0">
                          <div className="text-[#696767] lg:mr-4">
                            {productDetails ? (
                              <h1 className="text-[14px] lg:text-2xl ">
                                {productDetails.discount && (
                                  <h1>
                                    {productDetails.afterDiscount * quantity} $
                                  </h1>
                                )}
                                {!productDetails.discount && (
                                  <h1>
                                    {(productDetails.price ||
                                      productDetails.productPrice) *
                                      quantity}{" "}
                                    $
                                  </h1>
                                )}
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
                          className="bg-[#61DAA2] lg:h-14 lg:w-40 w-20 text-[12px] h-8 my-auto rounded-full   text-white lg:text-2xl  lg:font-bold lg:mb-2   lg:mr-10 lg:mt-1"
                          onClick={() =>
                            handleAddToCart(
                              productDetails.productId,
                              productDetails
                            )
                          }
                        >
                          {translations[language]?.addtocart}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  {reviews.map((review, index) => (
                    <div
                      className="bg-white/90 py-2 px-4 mb-3 mx-auto rounded-2xl border-2 border-grey w-[80%]  h-[120px] shadow-md"
                      key={index}
                    >
                      <div className="flex flex-row items-center justify-between ">
                        <div>
                          <img
                            className="w-10 h-10 rounded-full mr-2 ml-2"
                            src={`https://ui-avatars.com/api/?name=${extractFirstLetter(
                              review.email
                            )}&background=random`}
                            alt="User Avatar"
                          />
                        </div>
                        <div className="flex flex-col  w-full">
                          <p className="ml-2 text-lg flex flex-start text-black">
                            {review.email}
                          </p>
                          <div className="w-full">
                            {editingReviewId === review.reviewId ? (
                              <div className="w-36">
                                <StarRating
                                  initialRating={rating}
                                  onRatingChange={(newRating) =>
                                    setRating(newRating)
                                  }
                                  isClickable={true}
                                />
                              </div>
                            ) : (
                              <div className="w-36">
                                <StarRating
                                  initialRating={review.rating}
                                  isClickable={false}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {userData && userData.email === review.email && (
                          <div>
                            <div>
                              <MdDeleteOutline
                                className="text-gray-600"
                                style={{ fontSize: "1.5rem" }}
                                onClick={() =>
                                  handleDeleteClick(review.reviewId)
                                }
                              />
                            </div>
                            {editingReviewId === review.reviewId ? (
                              <div>
                                <button
                                  className="text-blue-500"
                                  onClick={() =>
                                    handleSaveClick(review.reviewId)
                                  }
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div>
                                <CiEdit
                                  className="text-gray-600"
                                  style={{ fontSize: "1.5rem" }}
                                  onClick={() =>
                                    handleEditClick(
                                      review.reviewId,
                                      review.comment,
                                      review.rating
                                    )
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {editingReviewId === review.reviewId ? (
                        <input
                          type="text"
                          value={updatedComment}
                          onChange={(e) => setUpdatedComment(e.target.value)}
                        />
                      ) : (
                        <h5 className="text-black text-lg flex flex-start ">
                          {review.comment}
                        </h5>
                      )}
                    </div>
                  ))}
                </div>

                <div className="w-full mb-10">
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mt-4 w-full flex flex-col md:flex-row md:justify-between relative max-w-[800px]">
                      <div className="md:w-[50%] relative">
                        <label className="w-full relative">
                          <textarea
                            placeholder={translations[language]?.write}
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-10"
                          />
                        </label>
                      </div>

                      <div className="mt-4 md:mt-0  md:inset-y-0 md:right-0 md:w-[30%]">
                        <StarRating
                          initialRating={rating}
                          onRatingChange={(newRating) => setRating(newRating)}
                          isClickable={true}
                        />
                      </div>
                      <div>
                        <button
                          className="bg-[#61DAA2] lg:h-10 lg:w-15 w-15 h-8 rounded-[15px]  text-white lg:text-xl  cursor-pointer lg:mb-2 mb-1  lg:ml-10 lg:mt-1 mt-4 md:mt-0 px-2"
                          type="submit"
                        >
                          {translations[language]?.submit}
                        </button>
                        {/*<button className=" lg:h-10 lg:w-15 w-15 h-8 rounded-[15px]  text-white lg:text-xl   lg:mb-2 mb-1  lg:ml-10 lg:mt-1 mt-4 md:mt-0 px-2" type="submit">
      <IoSendOutline className="w-6 h-6 text-[#61DAA2]" />
    </button>*/}
                      </div>
                    </div>
                  </form>
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
    </div>
  );
};

export default ReviewDialog;
