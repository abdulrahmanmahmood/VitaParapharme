import React from 'react';

import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import logo from '../.././images/Vita Logo2.png' ;
import lotion from '../.././images/lotion.png';
import { setLanguage ,selectLanguage ,selectTranslations} from '../../rtk/slices/Translate-slice';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react';
import StarRating from '../rate/StarRating';
import { selectToken } from '../../rtk/slices/Auth-slice';
import { selectEmail } from '../../rtk/slices/Auth-slice';
import { Modal , Button } from 'react-bootstrap';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import './review.css';
import { baseUrl } from '../../rtk/slices/Product-slice';


  const ReviewDialog = ({ isOpen, onCancel, productId }) => {
    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);
    const dispatch = useDispatch();
    const bearerToken = useSelector(selectToken);
    const bearerEmail = useSelector(selectEmail);
    const isUserLoggedIn = useSelector(selectToken) !== null;
  
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
      comment: '',
    });
    const [rating, setRating] = useState(0);
    const [editingReviewId, setEditingReviewId] = useState(null); 
    const [updatedComment, setUpdatedComment] = useState('');
  
    const handleCloseModal = () => setShowModal(false);
  
    

    const handleOverlayClick = (e) => {
      if (e.target.classList.contains('popup')) {
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
              
              'Content-Type': 'application/json',
              'Accept-Language': language,
            },
          }
        );
  
        setReviews(response.data.data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
  
    useEffect(() => {
      if (isOpen && productId) {
        fetchReviews();
       
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
      const apiUrl = `${baseUrl}/user/review/new`;
      const requestBody = {
        productId: productId,
        comment: formData.comment,
        rating: rating,
      };
  
      try {
        if (!isUserLoggedIn) {
          setModalMessage('please sign in first');
          setShowModal(true);
          return;
        }
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
          body: JSON.stringify(requestBody),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          console.log('Review submitted successfully');
          fetchReviews();
          setFormData({
            comment: '',
          });
          setRating(0);
        } else {
          console.error('Failed to submit review:', responseData);
        }
      } catch (error) {
        console.error('Error while submitting review:', error.message);
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
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
            'Accept-Language': language,
          },
        });
    
          console.log('Review submitted successfully');
          setEditingReviewId(null);
          fetchReviews();
         
  
        
      } catch (error) {
        console.error('Error while updating review:', error);
      }
    };
    

    const handleDeleteClick = async (reviewId) => {
      try {
        const apiUrl = `${baseUrl}/user/review/delete/${reviewId}`;
        
        const response = await axios.delete(apiUrl, {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Accept-Language': language,
          },
        });
  
          console.log('Review deleted successfully');
          fetchReviews(); 
      } catch (error) {
        console.error('Error while deleting review:', error.message);
      }
    };

    
  const extractFirstLetter = (email) => {
      return email.charAt(0).toUpperCase();
  };
  
  
    return (
      <div className=''>
        {isOpen && (
          <div className="popup fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-50 shadow-md flex flex-col justify-center items-center p-4 w-full max-w-md sm:max-w-lg md:max-w-xl " onClick={handleOverlayClick} >
            <div className=" w-full h-full bg-[#3EBF87] rounded-lg  shadow-lg p-4">
          
              <div  className="">
                <div className=''>
                
                  {reviews.map((review, index) => (
  <div className='bg-white py-2 px-2 mb-3 rounded-lg border border-grey shadow-md' key={index} >
   <div className='flex flex-row items-center justify-between'>
  <div>
    <img className="w-10 h-10 rounded-full mr-2" src={`https://ui-avatars.com/api/?name=${extractFirstLetter(review.email)}&background=random`} alt="User Avatar" />   
  </div>
  <div className='flex flex-col w-full'>
    <p className='ml-2 text-lg flex flex-start text-black'>{review.email}</p> 
    <div className='w-full'>
      {editingReviewId === review.reviewId ? (
        <div className='w-36'>
          <StarRating
            initialRating={rating} 
            onRatingChange={(newRating) => setRating(newRating)} 
            isClickable={true}
          />
        </div>
      ) : (
        <div className='w-36'>
          <StarRating
            initialRating={review.rating} 
            isClickable={false} 
          />
        </div>
      )}
    </div>
  </div>
  <div>
    <MdDeleteOutline className="text-gray-600" style={{fontSize:'1.5rem'}} onClick={() => handleDeleteClick(review.reviewId)} />
  </div>
  {editingReviewId === review.reviewId ? (
    <div>
      <button className="text-blue-500" onClick={() => handleSaveClick(review.reviewId)}>Save</button>
    </div>
  ) : (
    <div>
      <CiEdit className="text-gray-600" style={{fontSize:'1.5rem'}} onClick={() => handleEditClick(review.reviewId, review.comment , review.rating)} />
    </div>
  )}
</div>

    {editingReviewId === review.reviewId ? (
      <input type="text" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} />
    ) : (
      <h5 className='text-black text-lg flex flex-start ml-[8%]'>{review.comment}</h5>
    )}

  </div>
))}


                </div>
                <div className='w-full'>
  <form className='w-full' onSubmit={handleSubmit}>
    <div className='mt-4 w-full flex flex-col md:flex-row md:justify-between relative'>
      <div className='md:w-[70%]'>
        <label className='w-full'>
          <textarea
            placeholder='Write Your Review'
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className='border border-gray-300 rounded-lg px-3 py-2 w-full'
          />
        </label>
      </div>
      <div className='mt-4 md:mt-0 md:absolute md:inset-y-0 md:right-0 md:w-[30%]'>
        <StarRating
          initialRating={rating}
          onRatingChange={(newRating) => setRating(newRating)}
          isClickable={true}
        />
      </div>
    </div>
    <button className="bg-white h-12 w-full md:w-20 rounded-lg text-black font-bold mt-3" type="submit">{translations[language]?.submit}</button>
  </form>
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