/*import React from 'react';

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
          `http://195.35.28.106:8080/api/v1/public/review/product/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
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
      const apiUrl = 'http://195.35.28.106:8080/api/v1/user/review/new';
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
        const apiUrl = `http://195.35.28.106:8080/api/v1/user/review/update/${reviewId}`;
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
        console.error('Error while updating review:', error.message);
      }
    };
    

    const handleDeleteClick = async (reviewId) => {
      try {
        const apiUrl = `http://195.35.28.106:8080/api/v1/user/review/delete/${reviewId}`;
        
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

    
  
    return (
      <div className='review'>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
              <div  className="grey-container">
                <div className='header-container'>
                  <div >
                    <button style={{backgroundColor: '#3EBF87' , color: 'white' , marginTop:  '3em'}} onClick={handleViewProductClick}>View Product</button>
                  </div>
                  {reviews.map((review, index) => (
  <div key={index} className='flexReview'>
    <div className='onereview'>
      <div style={{marginRight: '15px'}}><FaUser style={{ fontSize: '50px' }} /></div>
      <div className='infoComment' style={{ marginLeft: '5px' }}>
        <div> 
          <h5>{review.email}</h5> 
        </div>
        <div className='stars'>
          
          {editingReviewId === review.reviewId ? (
        <>
          <div>
          <StarRating
            initialRating={rating} 
            onRatingChange={(newRating) => setRating(newRating)} 
            isClickable={true}
          />
          </div>
        </>
      ) : (
        <div>
          <StarRating
            initialRating={review.rating} 
            isClickable={false} 
          />
        </div>
      )}
        </div>
      </div>
      <div style={{marginRight:'5px'}}>
      <MdDeleteOutline style={{fontSize:'25px'}} onClick={() => handleDeleteClick(review.reviewId)} />
      </div>
      {editingReviewId === review.reviewId ? (
        <>
          <div>
            <button onClick={() => handleSaveClick(review.reviewId)}>Save</button>
          </div>
        </>
      ) : (
        <div>
          <CiEdit style={{fontSize:'25px'}} onClick={() => handleEditClick(review.reviewId, review.comment , review.rating)} />
        </div>
      )}
    </div>
    {editingReviewId === review.reviewId ? (
      <input type="text" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} />
    ) : (
      <p className='reviewcomment'>{review.comment}</p>
    )}

  </div>
))}


                </div>
                <div className='commentdiv'>
                  <form onSubmit={handleSubmit}>
                    <div className='flexReviewRate'>
                      <div className='reviewdiv'>
                        <label>
                          <textarea
                            placeholder='Write Your Review'
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div className='stars'>
                        <StarRating
                          initialRating={rating}
                          onRatingChange={(newRating) => setRating(newRating)}
                          isClickable={true}
                        />
                      </div>
                    </div>
                    <button style={{backgroundColor: '#3EBF87' , color: 'white'}} type="submit">Submit</button>
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
  
 

export default ReviewDialog;*/





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
              'Authorization': `Bearer ${bearerToken}`,
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

    
  
    return (
      <div className='review'>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
              <div  className="grey-container">
                <div className='header-container'>
                  <div >
                    <button style={{backgroundColor: '#3EBF87' , color: 'white' , marginTop:  '3em'}} onClick={handleViewProductClick}>View Product</button>
                  </div>
                  {reviews.map((review, index) => (
  <div key={index} className='flexReview'>
    <div className='onereview'>
      <div style={{marginRight: '15px'}}><FaUser style={{ fontSize: '50px' }} /></div>
      <div className='infoComment' style={{ marginLeft: '5px' }}>
        <div> 
          <h5>{review.email}</h5> 
        </div>
        <div className='stars'>
          
          {editingReviewId === review.reviewId ? (
        <>
          <div>
          <StarRating
            initialRating={rating} 
            onRatingChange={(newRating) => setRating(newRating)} 
            isClickable={true}
          />
          </div>
        </>
      ) : (
        <div>
          <StarRating
            initialRating={review.rating} 
            isClickable={false} 
          />
        </div>
      )}
        </div>
      </div>
      <div style={{marginRight:'5px'}}>
      <MdDeleteOutline style={{fontSize:'25px'}} onClick={() => handleDeleteClick(review.reviewId)} />
      </div>
      {editingReviewId === review.reviewId ? (
        <>
          <div>
            <button onClick={() => handleSaveClick(review.reviewId)}>Save</button>
          </div>
        </>
      ) : (
        <div>
          <CiEdit style={{fontSize:'25px'}} onClick={() => handleEditClick(review.reviewId, review.comment , review.rating)} />
        </div>
      )}
    </div>
    {editingReviewId === review.reviewId ? (
      <input type="text" value={updatedComment} onChange={(e) => setUpdatedComment(e.target.value)} />
    ) : (
      <p className='reviewcomment'>{review.comment}</p>
    )}

  </div>
))}


                </div>
                <div className='commentdiv'>
                  <form onSubmit={handleSubmit}>
                    <div className='flexReviewRate'>
                      <div className='reviewdiv'>
                        <label>
                          <textarea
                            placeholder='Write Your Review'
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            style={{
                              border: '1px solid rgb(187, 174, 174)',
                              borderRadius: '5px', 
                              padding: '5px', 
                              width: '100%', 
                            }}
                          />
                        </label>
                      </div>
                      <div className='stars'>
                        <StarRating
                          initialRating={rating}
                          onRatingChange={(newRating) => setRating(newRating)}
                          isClickable={true}
                        />
                      </div>
                    </div>
                    <button style={{backgroundColor: '#3EBF87' , color: 'white'}} type="submit">Submit</button>
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